from django.db import models
from .models import User

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='events/images')
    location = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    participants = models.ManyToManyField(User, related_name='events')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)