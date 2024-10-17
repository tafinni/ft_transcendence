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
import re


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
def home(request):
    return JsonResponse({'message': 'Welcome to the home page!!'})

# Define a view function for the login page
@csrf_exempt
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
               # if user.userprofile.is_online == True:
                #    return JsonResponse({'error': 'User already logged in'}, status=400)
                user.userprofile.is_online = True
                user.userprofile.save()

            return JsonResponse({'message': 'Login successful', 'redirect': '/home/'})
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Define a view function for the registration page
@csrf_exempt
def register_page(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        first_name = body.get('first_name')
        last_name = body.get('last_name')
        username = body.get('username')
        password = body.get('password')

        if not all([first_name, last_name, username, password]):
                return JsonResponse({'error': 'Missing required fields'}, status=400)
        if first_name and not is_valid_string(first_name, 1, 10):
            return JsonResponse({'error': 'Invalid first name. It should be between 1 and 10 characters long.'}, status=400)
        if last_name and not is_valid_string(last_name, 1, 10):
            return JsonResponse({'error': 'Invalid last name. It should be between 1 and 10 characters long.'}, status=400)
        if username and not is_valid_string(username, 1, 10):
            return JsonResponse({'error': 'Invalid username. It should be between 1 and 10 characters long.'}, status=400)

        user = User.objects.filter(username=username)
        display = UserProfile.objects.filter(display_name=username)
         
        if user.exists() or display.exists():
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
@login_required
@csrf_protect
def logout_page(request):
    if request.method == "POST":
        user = request.user
        if user.is_authenticated and hasattr(user, 'userprofile'):
            user.userprofile.is_online = False 
            user.userprofile.save() 
        logout(request)
        return JsonResponse({'message': 'Logout successful'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def is_online(request):
    user = request.user
    if user.is_authenticated and hasattr(user, 'userprofile'):
        userProfile = user.userprofile
        is_online_status = userProfile.is_online
        return JsonResponse({'is_online': is_online_status})
    return JsonResponse({'is_online': False})