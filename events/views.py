from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import generics
from .models import Event
from events.serializers import EventSerializer
from rest_framework.response import Response


@api_view(['GET'])
def get_events(request):
    events = EventSerializer(Event.objects.filter(creator=request.user), many=True).data
    # for event in events:
    #     event.creator_profile_pic = event.creator.profile_pic

    return Response(events)

# # Create your views here.
# class MyEventsListCreateApiView(generics.ListCreateAPIView):
#     serializer_class = EventSerializer

#     def get_queryset(self):
#         events = Event.objects.filter(creator=self.request.user)
#         for event in events:
#             event.test = event.creator.profile_pic
#         return events

#     def perform_create(self, serializer):
#         serializer.save(creator=self.request.user)