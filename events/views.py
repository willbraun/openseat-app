import os
import requests
import urllib.parse
import json
from twilio.rest import Client
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics
from .models import Event
from events.serializers import EventParticipantsSerializer, EventSearchSerializer, NoAuthEventSearchSerializer, EventSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from events.permissions import IsCreator
from django.db.models import F, Count, Exists, Subquery, OuterRef
from datetime import date



def filter_events_by_distance(events, origin_zip, distance_in_miles):
    def event_to_address(event):
        return f'{event.address} {event.city}, {event.state} {event.zip_code}'
    
    addresses = list(map(event_to_address, events))
    destination_string = ('|').join(addresses)
    destination_string_encoded = urllib.parse.quote(destination_string)
    api_key = os.environ['GOOGLE_API_KEY']

    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?destinations={destination_string_encoded}&origins={origin_zip}&key={api_key}"

    response = requests.request("GET", url, headers={}, data={})
    response_dict = json.loads(response.text)
    elements = response_dict['rows'][0]['elements']

    METERS_PER_MILE = 1609.34

    results = []
    for (index, el) in enumerate(elements):
        try:
            if el['distance']['value'] < distance_in_miles * METERS_PER_MILE:
                events[index].distance = el['distance']['value'] / METERS_PER_MILE
                results.append(events[index])
        except:
            pass
        
    return results

def get_filtered_events(request):
    origin_zip = request.GET.get('origin_zip')
    radius = int(request.GET.get('radius'))
    
    import pdb; pdb.set_trace()
    events = (Event.objects
        .annotate(participant_count=Count('participants')).filter(participant_count__lt=F('seats'))
        .filter(date__gte=date.today()))

    return filter_events_by_distance(events, origin_zip, radius)


def send_text(recipient_number, message_body):
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    api_key = os.environ['TWILIO_API_KEY']
    api_secret = os.environ['TWILIO_API_SECRET']
    twilio_phone_number = os.environ['TWILIO_PHONE_NUMBER']
    client = Client(api_key, api_secret, account_sid)

    message = client.messages.create(
        to = recipient_number, 
        from_ = twilio_phone_number,
        body = message_body,
    )

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_home_events(request):
    events = get_filtered_events(request)
    if request.user.is_authenticated:
        results = EventSearchSerializer(events, many=True).data
    else:
        results = NoAuthEventSearchSerializer(events, many=True).data
    
    return Response(results)
        

class MyEventsListCreateApiView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = (IsCreator,)

    def get_queryset(self):
        return Event.objects.filter(creator=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):    
        serializer.save(creator=self.request.user, participants=[self.request.user])


class EventDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsCreator,)


class EventAddSelfApiView(generics.RetrieveUpdateAPIView):
    serializer_class = EventParticipantsSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        event_id = self.kwargs['pk']
        return Event.objects.filter(id=event_id)

    def perform_update(self, serializer):
        event_id = self.kwargs['pk']
        event = Event.objects.filter(id=event_id)[0]
        new_list = list(event.participants.all())
        if not self.request.user in new_list and len(new_list) < event.seats:
            new_list.append(self.request.user)
            serializer.save(participants=new_list)
            if len(event.creator.phone_number) > 0:
                message = f'✅ {self.request.user.first_name} {self.request.user.first_name} ({self.request.user.username}) has filled a seat on your event "{event.name}"! Seats filled: {len(new_list)}/{event.seats}.'
                send_text(event.creator.phone_number, message)



class EventRemoveSelfApiView(generics.RetrieveUpdateAPIView):
    serializer_class = EventParticipantsSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        event_id = self.kwargs['pk']
        return Event.objects.filter(id=event_id)

    def perform_update(self, serializer):
        event_id = self.kwargs['pk']
        event = Event.objects.filter(id=event_id)[0]
        new_list = list(event.participants.all())
        if self.request.user in new_list and self.request.user != event.creator:
            new_list.remove(self.request.user)
            serializer.save(participants=new_list)
            if len(event.creator.phone_number) > 0:
                message = f'{self.request.user.first_name} {self.request.user.first_name} ({self.request.user.username}) has given up their seat on your event "{event.name}". Seats filled: {len(new_list)}/{event.seats}.'
                send_text(event.creator.phone_number, message)