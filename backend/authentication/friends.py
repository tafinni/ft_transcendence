from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import json
from .models import UserStats, UserProfile, MatchHistory, Friendship
from django.conf import settings
from . import views
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db.models import Q

# Create your views here.  
#curl -v -X POST -F username=jon
 #-F password=jon http://localhost:8000/login/

def is_valid_string(value, min_length, max_length):
    return value and not value.isspace() and min_length <= len(value) <= max_length


@login_required
def home(request):
    return JsonResponse({'message': 'Welcome to the home page!!'})

# Define a view function for the login page
@csrf_exempt
@csrf_protect
def login_page(request):
    if request.method == "POST":
        body = json.loads(request.body)
        username = body.get('username')
        password = body.get('password')
        
        user = authenticate(username=username, password=password)
        if user is None:
            return JsonResponse({'error': 'Invalid Password or Username'}, status=400)
        else:
            login(request, user)
            if hasattr(user, 'userprofile'):
                user.userprofile.is_online = True
                user.userprofile.save()

            return JsonResponse({'message': 'Login successful', 'redirect': '/home/'})
#return JsonResponse({"status": "ok"})
#return JsonResponse({})
    # Render the login page template (GET request)
  #  return render(request, 'login.html')
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Define a view function for the registration page
@csrf_exempt
#@csrf_protect
def register_page(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        first_name = body.get('first_name')
        last_name = body.get('last_name')
        username = body.get('username')
        password = body.get('password')

        if not all([first_name, last_name, username, password]):
                return JsonResponse({'error': 'Missing required fields'}, status=400)

        if not is_valid_string(first_name, 1, 10):
            return JsonResponse({'error': 'Invalid first name. It should be between 1 and 10 characters long.'}, status=400)
        if not is_valid_string(last_name, 1, 10):
            return JsonResponse({'error': 'Invalid last name. It should be between 1 and 10 characters long.'}, status=400)
        if not is_valid_string(username, 1, 10):
            return JsonResponse({'error': 'Invalid username. It should be between 1 and 10 characters long.'}, status=400)

        user = User.objects.filter(username=username)
         
        if user.exists():
            return JsonResponse({'error': 'Username already taken!'}, status=400)

        try:
            validate_password(password)
        except ValidationError as e:
            return JsonResponse({'error': e.messages}, status=400)

        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password
        )
        user.set_password(password)
        user.save()
        return JsonResponse({'message': 'Account created successfully!'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Define a view function for the logout page
@csrf_exempt
#@csrf_protect
def logout_page(request):
    if request.method == "POST":
        user = request.user
        if user.is_authenticated and hasattr(user, 'userprofile'):
            user.userprofile.is_online = False 
            user.userprofile.save() 
        logout(request)
        return JsonResponse({'message': 'Logout successful'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
@csrf_exempt
#@csrf_protect
def update_profile(request):
    if request.method == "POST":
        user = request.user
        user_profile, created = UserProfile.objects.get_or_create(user=user)

        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        display_name = request.POST.get('display_name')
        avatar = request.FILES.get('avatar')

        if first_name and not is_valid_string(first_name, 1, 10):
            return JsonResponse({'error': 'Invalid first name'}, status=400)
        if last_name and not is_valid_string(last_name, 1, 10):
            return JsonResponse({'error': 'Invalid last name'}, status=400)
        if display_name and not is_valid_string(display_name, 1, 10):
            return JsonResponse({'error': 'Invalid display name'}, status=400)

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
            #avatar_response = upload_avatar(request)
            user_profile.avatar.save(avatar.name, avatar, save=True)
            #if avatar_response.status_code != 200:
            #    return avatar_response
        user.save()
        user_profile.save()
        return JsonResponse({'message': 'Profile updated successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)



@login_required
@csrf_exempt
#@csrf_protect
def change_password(request):
    if request.method == "POST":
        user = request.user
        body = json.loads(request.body)
        current_password = body.get('current_password')
        new_password = body.get('new_password')
        confirm_password = body.get('confirm_password')
        if not all([current_password, new_password, confirm_password]):
            return JsonResponse({'error': 'All fields are required'}, status=400)
        if new_password != confirm_password:
            return JsonResponse({'error': 'New password and confirm password do not match'}, status=400)
        if new_password == current_password:
            return JsonResponse({'error': 'New password cannot be the same as the current password'}, status=400)

        try:
            validate_password(new_password)  # Validate password
        except ValidationError as e:
            return JsonResponse({'error': e.messages}, status=400)
        user.set_password(new_password)
        user.save()
        login(request, user)
        return JsonResponse({'message': 'Password changed successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)




#@login_required
@csrf_exempt
#@csrf_protect
def upload_avatar(request):
    if request.method == "POST":
        user = request.user
        user_profile, created = UserProfile.objects.get_or_create(user=user)
        avatar = request.FILES.get('avatar')
        if avatar:
            user_profile.avatar.save(avatar.name, avatar, save=True)
            user_profile.save()
            return JsonResponse({'message': 'Avatar uploaded successfully'})
        else:
            return JsonResponse({'error': 'No avatar provided'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
def profile(request):
    user = request.user
    user_stats = UserStats.objects.get(user=user)
    user_profile, created = UserProfile.objects.get_or_create(user=user)

    try:
        avatar_url = user_profile.avatar.url
    except:
    #    avatar_url = 'http://localhost:8000/media/avatars/default.jpg'
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

    data = {
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'wins': user_stats.wins,
        'losses': user_stats.losses,
        'display_name': user_profile.display_name,
        'avatar': avatar_url,
        'friends': friends,
        'friend_requests': requests,
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


# Add friend view
@login_required
@csrf_exempt
#@csrf_protect
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
        ).first() #?

        if existing_friendship:
            return JsonResponse({'error': 'Friend request already sent or pending'}, status=400)

        friendship, created = Friendship.objects.get_or_create(user=request.user, friend=friend)
        if not created:
            return JsonResponse({'error': 'Friend request already sent or already friends'}, status=400)

        return JsonResponse({'message': 'Friend request sent'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Remove friend view
@login_required
@csrf_exempt
#@csrf_protect
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
            reverse_friendship = Friendship.objects.get(user=friend, friend=request.user) #?
            friendship.delete()
            reverse_friendship.delete() #?
            return JsonResponse({'message': 'Friend removed successfully'})
        except Friendship.DoesNotExist:
            return JsonResponse({'error': 'Friendship does not exist'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Accept friend request
@login_required
@csrf_exempt
#@csrf_protect
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
            Friendship.objects.get_or_create(user=request.user, friend=request_user, accepted=True, is_request=False) #?

            return JsonResponse({'message': 'Friend request accepted'})
        except Friendship.DoesNotExist:
            return JsonResponse({'error': 'Friend request does not exist or already accepted'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



@login_required
@csrf_exempt
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
