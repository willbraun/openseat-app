# Generated by Django 4.0.6 on 2022-07-18 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_alter_user_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(blank=True, default='accounts/images/default-user-2.jpeg', upload_to='accounts/images/'),
        ),
    ]
