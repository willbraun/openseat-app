from rest_framework import serializers
from dj_rest_auth.models import TokenModel


class TokenSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = TokenModel
        fields = ('key','id',)