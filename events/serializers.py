from rest_framework import serializers
from .models import Event

class EventSearchSerializer(serializers.ModelSerializer):
    creator_first = serializers.ReadOnlyField(source='creator.first_name')
    creator_last = serializers.ReadOnlyField(source='creator.last_name')
    creator_profile_pic = serializers.SerializerMethodField()
    distance = serializers.SerializerMethodField()
    participant_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'
        depth = 1

    def get_creator_profile_pic(self, obj):
        return str(obj.creator.profile_pic)

    def get_distance(self, obj):
        return (obj.distance)

    def get_participant_count(self, obj):
        return (obj.participant_count)


class NoAuthEventSearchSerializer(serializers.ModelSerializer):
    distance = serializers.SerializerMethodField()
    participant_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = (
            'name',
            'description',
            'seats',
            'image',
            'distance',
            'participant_count',
        )

    def get_distance(self, obj):
        return (obj.distance)

    def get_participant_count(self, obj):
        return (obj.participant_count)


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        depth = 1


class EventParticipantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('participants',)