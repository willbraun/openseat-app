from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    creator_first = serializers.ReadOnlyField(source='creator.first_name')
    creator_last = serializers.ReadOnlyField(source='creator.last_name')
    creator_profile_pic = serializers.ReadOnlyField(source='creator.profile_pic')

    class Meta:
        model = Event
        fields = '__all__'


# Make read-only event serializer for non-logged in users, for View with AllowAny permissions