# Generated by Django 3.2.25 on 2024-09-11 10:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('authentication', '0007_userprofile_preferred_language'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accepted', models.BooleanField(default=False)),
                ('is_request', models.BooleanField(default=True)),
                ('result', models.CharField(blank=True, max_length=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('initiator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='initiated_tournaments', to=settings.AUTH_USER_MODEL)),
                ('opponent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invited_tournaments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddConstraint(
            model_name='tournament',
            constraint=models.UniqueConstraint(fields=('initiator', 'opponent'), name='unique_tournament_initiator_opponent'),
        ),
    ]
