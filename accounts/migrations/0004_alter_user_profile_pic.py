# Generated by Django 4.0.6 on 2022-07-18 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_user_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(blank=True, default='/media/accounts/images/default-user.jpeg', upload_to='accounts/images/'),
        ),
    ]
