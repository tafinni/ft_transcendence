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



# Tournament

class Tournament(models.Model):
    STATUS_CHOICES = [
        (0, 'Pending'),
        (1, 'Active'),
        (2, 'Completed'),
    ]

    initiator = models.ForeignKey(User, related_name='initiated_tournaments', on_delete=models.CASCADE)
    player_count = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)

    def __str__(self):
        return f"Tournament by {self.initiator.username} on {self.date.strftime('%Y-%m-%d')}"

class Participants(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group_number = models.IntegerField(default=0) # int 
    is_accepted = models.BooleanField(null=True, default=None)  # None, True, False
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'tournament'], name='unique_tournament_user')
        ]

    def __str__(self):
        return f"{self.user.username} in {self.tournament.initiator.username}'s tournament"
#        return f"{self.user.username} in {self.tournament}"

class ResultTournament(models.Model):
    RESULT_CHOICES = [
        ('win', 'Win'),
        ('loss', 'Loss'),
        ('draw', 'Draw'),
    ]
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='result_tournaments_as_user', on_delete=models.CASCADE)
    opponent = models.ForeignKey(User, related_name='result_tournaments_as_opponent', on_delete=models.CASCADE)
    result = models.CharField(max_length=10, choices=RESULT_CHOICES, blank=True, null=True) 
    round_number = models.IntegerField(default=1)  

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['tournament', 'user', 'opponent'], name='unique_result_tournament')
        ]

    def __str__(self):
        return f"{self.user.username} vs {self.opponent.username} - Result: {self.result}"


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
    instance.userprofile.save() #? check
