from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError  # ?

class UserProfile(models.Model):
    LANGUAGE_CHOICES = [
        ('RU', 'Russian'),
        ('FI', 'Finnish'),
        ('EN', 'English'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=100, unique=True, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg')
    is_online = models.BooleanField(default=False)
    preferred_language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='EN')

    def __str__(self):
        return self.user.username


class UserStats(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)

    def __str__(self):
       return f"Stats for {self.user.username}"

class MatchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    opponent = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    result = models.CharField(max_length=10)  # win/loss/draw
    details = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} vs {self.opponent} on {self.date}"

class Friendship(models.Model):
    user = models.ForeignKey(User, related_name='friendships', on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name='friends', on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    is_request = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'friend'], name='user_friend_unique')
        ]

    def clean(self):
        if self.accepted and self.is_request:
            raise ValidationError('Friendship cannot be both accepted and still a request.')
        if not self.accepted and not self.is_request:
            raise ValidationError('Friendship must be either accepted or a request.')

    def save(self, *args, **kwargs):
        self.clean()
        super(Friendship, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.username} -> {self.friend.username} (Accepted: {self.accepted})'


class Tournament(models.Model):
    initiator = models.ForeignKey(User, related_name='initiated_tournaments', on_delete=models.CASCADE)
    opponent = models.ForeignKey(User, related_name='invited_tournaments', on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    is_request = models.BooleanField(default=True)
    result = models.CharField(max_length=10, blank=True, null=True)  # Можно использовать win/loss/draw
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['initiator', 'opponent'], name='unique_tournament_initiator_opponent')
        ]

    def clean(self):
        if self.accepted and self.is_request:
            raise ValidationError('Tournament cannot be both accepted and still a request.')
        if not self.accepted and not self.is_request:
            raise ValidationError('Tournament must be either accepted or a request.')

    def save(self, *args, **kwargs):
        self.clean()
        super(Tournament, self).save(*args, **kwargs)

    def __str__(self):
        initiator_display = self.initiator.userprofile.display_name or self.initiator.username
        opponent_display = self.opponent.userprofile.display_name or self.opponent.username
        return f'Tournament: {initiator_display} vs {opponent_display} (Accepted: {self.accepted})'
#        return f'Tournament: {self.initiator.username} vs {self.opponent.username} (Accepted: {self.accepted})'





# Signal to create or update user profile
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, display_name=instance.username)
        UserStats.objects.create(user=instance) 
    else:
        UserProfile.objects.get_or_create(user=instance)
        UserStats.objects.get_or_create(user=instance)
    instance.userprofile.save()
