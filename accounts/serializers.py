from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from .models import User


class TokenSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = TokenModel
        fields = ('key','id',)


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ('username','password', 'password2','first_name','last_name','email','phone_number','zip_code',)
        extra_kwargs = {
            'password': {
                'write_only':True
            }
        }

    def save(self):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password':'Passwords must match.'})
        user.set_password(password)
        user.save()
