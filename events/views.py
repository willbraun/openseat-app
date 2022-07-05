from django.shortcuts import render
from rest_framework import generics
from .models import Event
from events.serializers import EventSerializer


# Create your views here.
class MyEventsListCreateApiView(generics.ListCreateAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.filter(creator=self.request.user)

    def perform_create(self, serializer):    
        serializer.save(creator=self.request.user, participants=[self.request.user])
        

# class UpdateDestroyApiView(generics.RetrieveUpdateDestroyAPIView)