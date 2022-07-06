from django.urls import path
from events.views import get_home_events
from events.views import EventDetailApiView, MyEventsListCreateApiView, EventAddSelfApiView

app_name = 'events'

urlpatterns = [
    path('<int:pk>/edit-participants', EventAddSelfApiView.as_view(), name='edit-participants'),
    path('<int:pk>', EventDetailApiView.as_view(), name='event-detail'),
    path('mine', MyEventsListCreateApiView.as_view(), name='my-events'),
    path('', get_home_events, name='events'),
]
