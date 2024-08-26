from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import json
from .models import UserStats, UserProfile, MatchHistory
from django.conf import settings
from . import views

# Create your views here.  
#curl -v -X POST -F username=jon
 #-F password=jon http://localhost:8000/login/

@login_required
def home(request):
    return JsonResponse({'message': 'Welcome to the home page!!'})

# Define a view function for the login page
@csrf_exempt
#@csrf_protect
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

        user = User.objects.filter(username=username)
         
        if user.exists():
            return JsonResponse({'error': 'Username already taken!'}, status=400)
        # Create a new User object with the provided information
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
        logout(request)
        return JsonResponse({'message': 'Logout successful'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
@csrf_exempt
#@csrf_protect
def update_profile(request):
    if request.method == "POST":
        body = json.loads(request.body)
        user = request.user
        user_profile, created = UserProfile.objects.get_or_create(user=user)

        first_name = body.get('first_name')
        last_name = body.get('last_name')
        display_name = body.get('display_name')
        avatar = request.FILES.get('avatar')
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if display_name:
     #       if UserProfile.objects.filter(display_name=display_name).exclude(user=user).exists():
      #          return JsonResponse({'error': 'Display name already taken'}, status=400)
            user_profile.display_name = display_name
        if avatar:
            avatar_response = upload_avatar(request)
            if avatar_response.status_code != 200:
                return avatar_response
            #user_profile.avatar.save(avatar.name, avatar, save=True) upload_avatar or?
        user.save()
        user_profile.save()
        return JsonResponse({'message': 'Profile updated successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)



@login_required
@csrf_exempt
#@csrf_protect
def change_password(request):
    if request.method == "POST":
        body = json.loads(request.body)
        current_password = body.get('current_password')
        new_password = body.get('new_password')
        confirm_password = body.get('confirm_password')
        if not all([current_password, new_password, confirm_password]):
            return JsonResponse({'error': 'All fields are required'}, status=400)
        if new_password != confirm_password:
            return JsonResponse({'error': 'New password and confirm password do not match'}, status=400)

        user.set_password(new_password)
        user.save()
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
 #   friendships = Friendship.objects.filter(user=request.user, accepted=True)
 #   friends = [
  #      {
   #         'username': friend.friend.username,
   #         'online_status': friend.friend.is_online  # ? add in User model
    #    } for friend in friendships
   # ]

    data = {
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'wins': user_stats.wins,
        'losses': user_stats.losses,
        'display_name': user_profile.display_name,
        'avatar': avatar_url,
    #    'friends': friends,
    }
    return JsonResponse(data)


@login_required
def match_history(request):
    user = request.user
    matches = MatchHistory.objects.filter(user=user).order_by('-date')
    match_list = [
        {
            'opponent': match.opponent, 
            'date': match.date, 'result': match.result, 
            'details': match.details
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
            friendship.delete()
            return JsonResponse({'message': 'Friend removed successfully'})
        except Friendship.DoesNotExist:
            return JsonResponse({'error': 'Friendship does not exist'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

