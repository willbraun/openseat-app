from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from .models import Event
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from .views import MySeatsFutureListApiView, MySeatsPastListApiView, MyEventsListCreateApiView, get_home_events, EventAddSelfApiView, EventRemoveSelfApiView, EventDetailApiView
import os

User = get_user_model()
client = Client()
factory = APIRequestFactory() 


# Create your tests here.
class EventListTestCases(TestCase):
    
    def test_get_discover_events_no_auth(self):
        response = client.get(reverse('api:events:events'), {'origin': '29615', 'radius': '50'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_discover_events_auth(self):
        request = factory.get('/api_v1/events/', {'origin': '29615', 'radius': '50'})
        user = User.objects.create(username='test_user')
        view = get_home_events
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_my_seats_future_auth(self):
        request = factory.get('/api_v1/my-seats/future/')
        user = User.objects.create(username='test_user')
        view = MySeatsFutureListApiView.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_my_seats_past_auth(self):
        request = factory.get('/api_v1/my-seats/past/')
        user = User.objects.create(username='test_user')
        view = MySeatsPastListApiView.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_my_event_auth(self):
        request = factory.get('/api_v1/events/mine/')
        user = User.objects.create(username='test_user')
        view = MySeatsPastListApiView.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class FillSeatsEventTestCases(TestCase):

    def setUp(self):
        creator = User.objects.create(username='test_creator')

        Event.objects.create(
            name='Fishing',
            description='Lets go fishing',
            seats=4,
            address='1234 testing lane',
            city='Greenville',
            state='SC',
            zip_code='12345',
            date='2100-01-01',
            time='12:00:00',
            creator=creator,
        )
    
    def test_add_self_no_auth(self):
        id = Event.objects.get(name='Fishing').id
        request = factory.put(f'/api_v1/{id}/add-self/')
        view = EventAddSelfApiView.as_view()
        response = view(request)
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_add_self_auth(self):
        user = User.objects.create(username='test_user')
        id = Event.objects.get(name='Fishing').id
        request = factory.put(f'/api_v1/{id}/add-self/')
        view = EventAddSelfApiView.as_view()
        force_authenticate(request, user=user)
        response = view(request, pk=id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_remove_self_no_auth(self):
        id = Event.objects.get(name='Fishing').id
        request = factory.put(f'/api_v1/{id}/remove-self/')
        view = EventRemoveSelfApiView.as_view()
        response = view(request)
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)

    def test_remove_self_auth(self):
        user = User.objects.create(username='test_user')
        id = Event.objects.get(name='Fishing').id
        request = factory.put(f'/api_v1/{id}/remove-self/')
        view = EventRemoveSelfApiView.as_view()
        force_authenticate(request, user=user)
        response = view(request, pk=id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)    


class EventCrudTestCases(TestCase):

    def setUp(self):
        creator = User.objects.create(username='test_creator')

        Event.objects.create(
            name='Go-karting',
            description='Lets go go-karting',
            seats=4,
            address='1234 testing lane',
            city='Greenville',
            state='SC',
            zip_code='12345',
            date='2100-01-01',
            time='12:00:00',
            creator=creator,
        )
    
    def test_create_event_auth(self):

        def temporary_image():
            import tempfile
            from PIL import Image

            image = Image.new('RGB', (100,100))
            tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
            image.save(tmp_file, 'jpeg')
            tmp_file.seek(0)
            return tmp_file

        user = User.objects.create(username='test_user')
        image = temporary_image()

        request = factory.post('/api_v1/events/mine/', ({
            'name': 'Dancing',
            'description': 'Lets go dancing',
            'seats': 4,
            'image': image,
            'address': '1234 testing lane',
            'city': 'Greenville',
            'state': 'SC',
            'zip_code': '12345',
            'date': '2100-01-01',
            'time': '12:00:00',
            }))

        view = MyEventsListCreateApiView.as_view()
        force_authenticate(request, user=user)
        response = view(request)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(user.id, response.data['creator']['id'])
        self.assertEqual(user.id, response.data['participants'][0]['id'])
        
        saved_location = f"media/events/images/{image.name.split('/')[-1]}"
        os.remove(saved_location)
        

    def test_read_event_auth(self):
        id = Event.objects.get(name='Go-karting').id
        creator = User.objects.get(username='test_creator')
        request = factory.get(f'/api_v1/events/{id}/')
        view = EventDetailApiView.as_view()
        force_authenticate(request, user=creator)
        response = view(request, pk=id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_event_auth(self):
        id = Event.objects.get(name='Go-karting').id
        creator = User.objects.get(username='test_creator')
        request = factory.patch(f'/api_v1/events/{id}/', {'name': 'Mario-karting'})
        view = EventDetailApiView.as_view()
        force_authenticate(request, user=creator)
        response = view(request, pk=id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_event_auth(self):
        id = Event.objects.get(name='Go-karting').id
        creator = User.objects.get(username='test_creator')
        request = factory.delete(f'/api_v1/events/{id}/')
        view = EventDetailApiView.as_view()
        force_authenticate(request, user=creator)
        response = view(request, pk=id)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

