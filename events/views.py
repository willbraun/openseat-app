from django.shortcuts import render
from rest_framework import generics
from .models import Event
from events.serializers import EventSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from events.permissions import IsCreator
from django.db.models import F, Count
from datetime import date


# Create your views here.
class NoAuthEventsListView(generics.ListAPIView):
    # serializer_class = EventSerializer - scaled back to logged out view. Potentially scaled back filtering also.
    permission_classes = (AllowAny,)


class AuthEventsListApiView(generics.ListAPIView):
    # queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        test = Event.objects.all()

        events = (Event.objects
            .annotate(participant_count=Count('participants')).filter(participant_count__lt=F('seats'))
            .filter(date__gte=date.today()))
        return events
        


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
