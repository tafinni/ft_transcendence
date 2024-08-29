from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
 #   display_name = models.CharField(max_length=100, unique=True, blank=True, null=True)
    display_name = models.CharField(max_length=100, unique=True, blank=True, null=True)
#    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg')

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
    accepted = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.user.username} -> {self.friend.username} (Accepted: {self.accepted})'

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
