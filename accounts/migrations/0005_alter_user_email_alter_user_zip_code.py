# Generated by Django 4.0.6 on 2022-07-04 15:00

import accounts.models
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_user_zip_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(max_length=255, validators=[django.core.validators.EmailValidator()]),
        ),
        migrations.AlterField(
            model_name='user',
            name='zip_code',
            field=models.CharField(max_length=5, null=True, validators=[accounts.models.validate_zip]),
        ),
    ]
