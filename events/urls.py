from django.urls import path
from events.views import get_home_events
from events.views import EventDetailApiView, MyEventsListCreateApiView, EventAddSelfApiView, EventRemoveSelfApiView, MySeatsFutureListApiView, MySeatsPastListApiView

app_name = 'events'

urlpatterns = [
    path('<int:pk>/add-self/', EventAddSelfApiView.as_view(), name='add-self'),
    path('<int:pk>/remove-self/',
         EventRemoveSelfApiView.as_view(), name='remove-self'),
    path('<int:pk>/', EventDetailApiView.as_view(), name='event-detail'),
    path('mine/', MyEventsListCreateApiView.as_view(), name='my-events'),
    path('my-seats/future/', MySeatsFutureListApiView.as_view(),
         name='my-seats-future'),
    path('my-seats/past/', MySeatsPastListApiView.as_view(), name='my-seats-past'),
    path('', get_home_events, name='events'),
]
