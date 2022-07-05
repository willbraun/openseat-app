from django.urls import include, path

# from events.views import MyEventsListCreateApiView

app_name = 'api'

urlpatterns = [
    path('events/', include('events.urls', namespace='events')),
]