import pdb
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from localflavor.us.models import USZipCodeField


def validate_phone(value):
    if len(value) == 0:
        return
    for char in value:
        if not char in '0123456789-() +':
            raise ValidationError(f'Invalid character: {char}. Accepted characters: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -, (, ), "space", "+".') 


class User(AbstractUser):
    phone_number = models.CharField(max_length=16, blank=True, validators=[validate_phone])
    zip_code = USZipCodeField(blank=True)
    profile_pic = models.ImageField(upload_to='accounts/images/', default='accounts/images/default-user-2.jpeg', blank=True)