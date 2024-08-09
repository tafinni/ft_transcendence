from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=100, unique=True, blank=True, null=True)
#    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.jpg')

    def __str__(self):
        return self.user.username

# Signal to create or update user profile
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        UserProfile.objects.get_or_create(user=instance)
    instance.userprofile.save()
