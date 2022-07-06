import pdb
from django.shortcuts import render
from rest_framework import generics
from .models import Event
from events.serializers import EventSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from events.permissions import IsCreator
from django.db.models import F, Count
from datetime import date
import os
import requests
import urllib.parse
import json


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


# Create your views here.
class NoAuthEventsListView(generics.ListAPIView):
    # serializer_class = EventSerializer - scaled back to logged out view. Potentially scaled back filtering also.
    permission_classes = (AllowAny,)


class AuthEventsListApiView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        origin_zip = self.request.GET.get('origin_zip')
        radius = int(self.request.GET.get('radius'))

        events = (Event.objects
            .annotate(participant_count=Count('participants')).filter(participant_count__lt=F('seats'))
            .filter(date__gte=date.today()))
        
        return filter_events_by_distance(events, origin_zip, radius)

        

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
