from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from localflavor.us.models import USStateField, USZipCodeField
from django.conf import settings

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    seats = models.PositiveIntegerField(validators=[MinValueValidator(2), MaxValueValidator(20)])
    image = models.ImageField(upload_to='events/images')
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = USStateField()
    zip_code = USZipCodeField()
    date = models.DateField()
    time = models.TimeField()
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='events', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    # def clean(self):
    #     cleaned_data = super().clean()
    #     participants = cleaned_data.get('participants')
    #     seats = cleaned_data.get('seats')
    #     print(seats)
    #     print(len(participants))

    #     import pdb 
    #     pdb.set_trace()

    #     if len(participants) > seats:
    #         raise ValidationError('All seats on this event have been filled.')

    # def save(self):
    #     self.clean()
    #     return super(Event, self).save()
        