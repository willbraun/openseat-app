# Generated by Django 4.0.6 on 2022-07-18 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0008_alter_event_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='address_json',
            field=models.JSONField(null=True),
        ),
    ]