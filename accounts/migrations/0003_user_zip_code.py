# Generated by Django 4.0.6 on 2022-07-04 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_phone_number_alter_user_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='zip_code',
            field=models.IntegerField(max_length=5, null=True),
        ),
    ]
