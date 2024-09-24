from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from authentication.models import UserStats, UserProfile, MatchHistory, Friendship, Participants, Tournament
import json
import re

# Create your views here.

def is_valid_string(value, min_length, max_length):
    if not value:
        return False
    if value.isspace():
        return False
    if not min_length <= len(value) <= max_length:
        return False
    if not re.match(r'^[a-zA-Zа-яА-ЯйЙёЁäÄöÖåÅ0-9\s]*$', value):
        return False
    return True


@login_required
@csrf_protect
def update_profile(request):
    if request.method == "POST":
        user = request.user
        user_profile, created = UserProfile.objects.get_or_create(user=user)

        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        display_name = request.POST.get('display_name')
        avatar = request.FILES.get('avatar')
        preferred_language = request.POST.get('preferred_language')

        if first_name and not is_valid_string(first_name, 1, 10):
            return JsonResponse({'error': 'Invalid first name'}, status=400)
        if last_name and not is_valid_string(last_name, 1, 10):
            return JsonResponse({'error': 'Invalid last name'}, status=400)
        if display_name and not is_valid_string(display_name, 1, 10):
            return JsonResponse({'error': 'Invalid display name'}, status=400)
        if preferred_language and preferred_language not in dict(UserProfile.LANGUAGE_CHOICES):
            return JsonResponse({'error': 'Invalid preferred language'}, status=400)

        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if display_name:
            if UserProfile.objects.filter(display_name=display_name).exclude(user=user).exists():
                return JsonResponse({'error': 'Display name already taken'}, status=400)
            user_profile.display_name = display_name
        if avatar:
            # Implement size and type checks for avatar
            if avatar.size > 5 * 1024 * 1024:  # 5 MB limit ? or 3
                return JsonResponse({'error': 'Avatar file is too large'}, status=400)
            if not avatar.name.lower().endswith(('.png', '.jpg', '.jpeg')):
                return JsonResponse({'error': 'Invalid file type for avatar'}, status=400)
            user_profile.avatar.save(avatar.name, avatar, save=True)
        if preferred_language:
            user_profile.preferred_language = preferred_language
        user.save()
        user_profile.save()
        return JsonResponse({'message': 'Profile updated successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
@csrf_protect
def change_password(request):
    if request.method == "POST":
        user = request.user
        body = json.loads(request.body)
        current_password = body.get('current_password')
        new_password = body.get('new_password')
        confirm_password = body.get('confirm_password')
        if not all([current_password, new_password, confirm_password]):
            return JsonResponse({'error': 'All fields are required'}, status=400)
        if not user.check_password(current_password):
            return JsonResponse({'error': 'Current password not valid'}, status=400)
        if new_password != confirm_password:
            return JsonResponse({'error': 'New password and confirm password do not match'}, status=400)
        if new_password == current_password:
            return JsonResponse({'error': 'New password cannot be the same as the current password'}, status=400)

        try:
            validate_password(new_password)
        except ValidationError as e:
            return JsonResponse({'error': e.messages}, status=400)
        user.set_password(new_password)
        user.save()
        login(request, user)
        return JsonResponse({'message': 'Password changed successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@login_required
@csrf_protect
def profile(request):
    user = request.user
    user_stats = UserStats.objects.get(user=user)
    user_profile, created = UserProfile.objects.get_or_create(user=user)

    try:
        avatar_url = user_profile.avatar.url
    except:
        avatar_url = settings.MEDIA_URL + 'avatars/default.jpg'

    # friends
    friendships = Friendship.objects.filter(user=request.user, accepted=True)
    friends = [
        {
            'username': friend.friend.username,
            'online_status':  friend.friend.userprofile.is_online
        } for friend in friendships
    ]

     # friend requests
    friend_requests = Friendship.objects.filter(friend=user, accepted=False, is_request=True)
    requests = [
        {
            'username': request.user.username,
        } for request in friend_requests
    ]

     # tournament_invitations
    tournament_invitations = Participants.objects.filter(user=user, is_accepted=None)
    invitations = [
        {
            'tournament_id': invite.tournament.id,
            'tournament_initiator': invite.tournament.initiator.username,
            'status': 'Pending',
           # 'date': invite.tournament.date,
        } for invite in tournament_invitations
    ]


    data = {
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'wins': user_stats.wins,
        'losses': user_stats.losses,
        'display_name': user_profile.display_name,
        'avatar': avatar_url,
        'preferred_language': user_profile.preferred_language,
        'friends': friends,
        'friend_requests': requests,
         'tournament_invitations': invitations, 
    }
    return JsonResponse(data)

@login_required
def match_history(request):
    user = request.user
    matches = MatchHistory.objects.filter(user=user).order_by('-date')
    match_list = [
        {
            'opponent': match.opponent, 
            'date': match.date, 
            'result': match.result
        } for match in matches
    ]
    return JsonResponse({'matches': match_list})


@login_required
@csrf_protect
def public_profile(request):
    if request.method == "POST":
        body = json.loads(request.body)
        user_username = body.get('user_username')

        user = User.objects.get(username=user_username)
        user_stats = UserStats.objects.get(user=user)
        user_profile = UserProfile.objects.get(user=user)
        
        data = {
            'username': user.username,
            'display_name': user_profile.display_name,
            'wins': user_stats.wins,
            'losses': user_stats.losses,
            'avatar': user_profile.avatar.url,
        }
        return JsonResponse(data) #ADD ERRORS
    
@csrf_exempt
def check_game_password(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            check_user = body.get('check_user')
            check_pass = body.get('check_pass')

            if not check_user or not check_pass:
                return JsonResponse({'error': 'Username and password are required'}, status=400)

            user2 = authenticate(request, username=check_user, password=check_pass)
            
            if user2 is not None:
                return JsonResponse({'message': 'Authentication successful'}, status=200)
            else:
                return JsonResponse({'error': 'Authentication failed'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)