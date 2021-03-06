from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from .models import User
from PIL import Image 
import glob


class TokenSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')
    zip = serializers.ReadOnlyField(source='user.zip_code')

    class Meta:
        model = TokenModel
        fields = ('key', 'id', 'zip',)


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username','password', 'password2','first_name','last_name','email','phone_number','zip_code', 'profile_pic',)
        extra_kwargs = {
            'password': {
                'write_only':True
            }
        }

    def save(self, request):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            phone_number=self.validated_data['phone_number'],
            zip_code=self.validated_data['zip_code'],
        )

        if 'profile_pic' in self.validated_data:
            user.profile_pic=self.validated_data['profile_pic']

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password':'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user


class UserOnEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 
            'username', 
            'first_name', 
            'last_name', 
            'profile_pic',
        )