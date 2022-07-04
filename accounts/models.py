from xml.dom import ValidationErr
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from phone_field import PhoneField
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


def validate_zip(value):
    try:
        int(value)
    except:
        raise ValidationError('Zip Code must be a number.')
    if len(value) > 0 and len(value) != 5:
        raise ValidationError('Zip code must be 5 digits.') 
    

def validate_phone(value):
    if len(value) == 0:
        return
    for char in value:
        if not char in '0123456789-() +':
            raise ValidationError(f'Invalid character: {char}. Accepted characters: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -, (, ), "space", "+".') 


class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, validators=[validate_email])
    phone_number = models.CharField(max_length=16, blank=True, validators=[validate_phone])
    zip_code = models.CharField(max_length=5, blank=True, validators=[validate_zip])
    profile_pic = models.ImageField(upload_to='accounts/images/', null=True)