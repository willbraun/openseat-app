from django.urls import path
from events.views import get_events

app_name = 'events'

urlpatterns = [
    path('', get_events, name='my-events'),
]
