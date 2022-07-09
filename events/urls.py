from django.urls import path
from events.views import get_home_events
from events.views import EventDetailApiView, MyEventsListCreateApiView, EventAddSelfApiView, EventRemoveSelfApiView, MySeatsListApiView

app_name = 'events'

urlpatterns = [
    path('<int:pk>/add-self/', EventAddSelfApiView.as_view(), name='add-self'),
    path('<int:pk>/remove-self/', EventRemoveSelfApiView.as_view(), name='remove-self'),
    path('<int:pk>/', EventDetailApiView.as_view(), name='event-detail'),
    path('mine/', MyEventsListCreateApiView.as_view(), name='my-events'),
    path('my-seats/', MySeatsListApiView.as_view(), name='my-seats'),
    path('', get_home_events, name='events'),
]
