from django.urls import path
from events.views import EventDetailApiView, MyEventsListCreateApiView, AuthEventsListApiView

app_name = 'events'

urlpatterns = [
    path('<int:pk>', EventDetailApiView.as_view(), name='event-detail'),
    path('mine', MyEventsListCreateApiView.as_view(), name='my-events'),
    path('', AuthEventsListApiView.as_view(), name='events'),
]
