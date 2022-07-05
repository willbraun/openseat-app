# Generated by Django 4.0.6 on 2022-07-05 17:21

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import localflavor.us.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('arrival_plan', models.TextField()),
                ('seats', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(2), django.core.validators.MaxValueValidator(20)])),
                ('image', models.ImageField(upload_to='events/images')),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('state', localflavor.us.models.USStateField(max_length=2)),
                ('zip_code', localflavor.us.models.USZipCodeField(max_length=10)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('creator', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('participants', models.ManyToManyField(blank=True, related_name='events', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
