from xml.dom import ValidationErr
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from phone_field import PhoneField
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


def validate_zip(value):
    if len(value) > 0 and len(value) != 5:
        raise ValidationError('Zip code must be 5 digits') 

class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, validators=[validate_email])
    phone_number = PhoneField(null=True)
    zip_code = models.CharField(max_length=5, null=True, validators=[validate_zip])