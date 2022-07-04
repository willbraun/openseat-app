# Generated by Django 4.0.6 on 2022-07-04 15:27

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_alter_user_email_alter_user_zip_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(null=True, upload_to='accounts/images/'),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=16, null=True, validators=[accounts.models.validate_phone]),
        ),
    ]
