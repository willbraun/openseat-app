from django.urls import path
from events.views import MyEventsListCreateApiView

app_name = 'events'

urlpatterns = [
    path('', MyEventsListCreateApiView.as_view(), name='my-events'),
]
