from rest_framework import serializers
from .models import Event
from accounts.serializers import UserOnEventSerializer


class EventSearchSerializer(serializers.ModelSerializer):
    creator = UserOnEventSerializer('creator', read_only=True)
    participants = UserOnEventSerializer(
        'participants', read_only=True, many=True)
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
            'id',
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
    creator = UserOnEventSerializer('creator', read_only=True)
    participants = UserOnEventSerializer(
        'participants', read_only=True, many=True)

    class Meta:
        model = Event
        fields = '__all__'
        depth = 1


class EventParticipantsSerializer(serializers.ModelSerializer):
    participants = UserOnEventSerializer(
        'participants', read_only=True, many=True)

    class Meta:
        model = Event
        fields = ('participants',)
        depth = 1
