# Generated by Django 3.2.25 on 2024-09-15 12:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('authentication', '0008_auto_20240911_1041'),
    ]

    operations = [
        migrations.CreateModel(
            name='Participants',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_number', models.IntegerField(default=0)),
                ('is_accepted', models.BooleanField(default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ResultTournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('result', models.CharField(blank=True, choices=[('win', 'Win'), ('loss', 'Loss'), ('draw', 'Draw')], max_length=10, null=True)),
            ],
        ),
        migrations.RemoveConstraint(
            model_name='tournament',
            name='unique_tournament_initiator_opponent',
        ),
        migrations.RenameField(
            model_name='tournament',
            old_name='created_at',
            new_name='date',
        ),
        migrations.RemoveField(
            model_name='tournament',
            name='accepted',
        ),
        migrations.RemoveField(
            model_name='tournament',
            name='is_request',
        ),
        migrations.RemoveField(
            model_name='tournament',
            name='opponent',
        ),
        migrations.RemoveField(
            model_name='tournament',
            name='result',
        ),
        migrations.AddField(
            model_name='tournament',
            name='player_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='tournament',
            name='status',
            field=models.IntegerField(choices=[(0, 'Pending'), (1, 'Active'), (2, 'Completed')], default=0),
        ),
        migrations.AddField(
            model_name='resulttournament',
            name='opponent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='result_tournaments_as_opponent', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='resulttournament',
            name='tournament',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.tournament'),
        ),
        migrations.AddField(
            model_name='resulttournament',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='result_tournaments_as_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='participants',
            name='tournament',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.tournament'),
        ),
        migrations.AddField(
            model_name='participants',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddConstraint(
            model_name='resulttournament',
            constraint=models.UniqueConstraint(fields=('tournament', 'user', 'opponent'), name='unique_result_tournament'),
        ),
        migrations.AddConstraint(
            model_name='participants',
            constraint=models.UniqueConstraint(fields=('user', 'tournament'), name='unique_tournament_user'),
        ),
    ]
