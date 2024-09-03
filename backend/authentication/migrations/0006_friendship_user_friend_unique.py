# Generated by Django 3.2.25 on 2024-09-02 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_friendship_is_request'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='friendship',
            constraint=models.UniqueConstraint(fields=('user', 'friend'), name='user_friend_unique'),
        ),
    ]
