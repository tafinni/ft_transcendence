from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import json
from authentication.models import UserStats, UserProfile, MatchHistory, Friendship
from django.conf import settings
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db.models import Q

# Add friend view
@login_required
@csrf_protect
def add_friend(request):
    if request.method == "POST":
        body = json.loads(request.body)
        friend_username = body.get('friend_username')

        if not friend_username:
            return JsonResponse({'error': 'Friend username is required'}, status=400)

        try:
            friend = User.objects.get(username=friend_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        if friend == request.user:
            return JsonResponse({'error': 'You cannot add yourself as a friend'}, status=400)

        existing_friendship = Friendship.objects.filter(
            (Q(user=request.user, friend=friend) | Q(user=friend, friend=request.user)),
            accepted=False
        ).first()

        if existing_friendship:
            return JsonResponse({'error': 'Friend request already sent or pending'}, status=400)

        friendship, created = Friendship.objects.get_or_create(user=request.user, friend=friend)
        if not created:
            return JsonResponse({'error': 'Friend request already sent or already friends'}, status=400)

        return JsonResponse({'message': 'Friend request sent'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Remove friend view
@login_required
@csrf_protect
def remove_friend(request):
    if request.method == "POST":
        body = json.loads(request.body)
        friend_username = body.get('friend_username')

        if not friend_username:
            return JsonResponse({'error': 'Friend username is required'}, status=400)

        try:
            friend = User.objects.get(username=friend_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        try:
            friendship = Friendship.objects.get(user=request.user, friend=friend)
            reverse_friendship = Friendship.objects.get(user=friend, friend=request.user)
            friendship.delete()
            reverse_friendship.delete()
            return JsonResponse({'message': 'Friend removed successfully'})
        except Friendship.DoesNotExist:
            return JsonResponse({'error': 'Friendship does not exist'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Accept friend request
@login_required
@csrf_protect
def accept_friend_request(request):
    if request.method == "POST":
        body = json.loads(request.body)
        request_user_username = body.get('request_user_username')

        if not request_user_username:
            return JsonResponse({'error': 'Request user username is required'}, status=400)

        try:
            request_user = User.objects.get(username=request_user_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        try:
            friendship = Friendship.objects.get(user=request_user, friend=request.user, accepted=False, is_request=True)
            friendship.accepted = True
            friendship.is_request = False
            friendship.save()

            # Create a reciprocal friendship
            Friendship.objects.get_or_create(user=request.user, friend=request_user, accepted=True, is_request=False)

            return JsonResponse({'message': 'Friend request accepted'})
        except Friendship.DoesNotExist:
            return JsonResponse({'error': 'Friend request does not exist or already accepted'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



@login_required
@csrf_protect
def decline_friend_request(request):
    if request.method == "POST":
        body = json.loads(request.body)
        request_user_username = body.get('request_user_username')

        if not request_user_username:
            return JsonResponse({'error': 'Request user username is required'}, status=400)

        try:
            request_user = User.objects.get(username=request_user_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        try:
            friendship = Friendship.objects.get(user=request_user, friend=request.user, accepted=False, is_request=True)
            friendship.delete()
            return JsonResponse({'message': 'Friend request declined and removed'})
        except Friendship.DoesNotExist:
            return JsonResponse({'error': 'Friend request does not exist or already processed'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
