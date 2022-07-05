from django.urls import include, path

app_name = 'api'

urlpatterns = [
    path('events/', include('events.urls', namespace='events')),
]