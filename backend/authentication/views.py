from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json


# Create your views here.  
#curl -v -X POST -F username=jon
 #-F password=jon http://localhost:8000/login/

@login_required
def home(request):
    return JsonResponse({'message': 'Welcome to the home page!'})

# Define a view function for the login page
@csrf_exempt
def login_page(request):
    if request.method == "POST":
        body = json.loads(request.body)
        username = body.get('username')
        password = body.get('password')
    #    username = request.POST.get('username')
     #   password = request.POST.get('password')

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
def register_page(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        first_name = body.get('first_name')
        last_name = body.get('last_name')
        username = body.get('username')
        password = body.get('password')
     #   display_name = body.get('display_name')
    #    first_name = request.POST.get('first_name')
    #    last_name = request.POST.get('last_name')
    #    username = request.POST.get('username')
    #    password = request.POST.get('password')


        if not all([first_name, last_name, username, password]):
                return JsonResponse({'error': 'Missing required fields'}, status=400)

        user = User.objects.filter(username=username)
         
        if user.exists():
            return JsonResponse({'error': 'Username already taken!'}, status=400)

   #     if UserProfile.objects.filter(display_name=display_name).exists():
   #         return JsonResponse({'error': 'Display name already taken!'}, status=400)
         
        # Create a new User object with the provided information
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password
        )
         
        # Set the user's password and save the user object
        user.set_password(password)
        user.save()
        return JsonResponse({'message': 'Account created successfully!'})
     
    # Render the registration page template (GET request)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Define a view function for the logout page
@csrf_exempt
def logout_page(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({'message': 'Logout successful'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
@csrf_exempt
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
            if UserProfile.objects.filter(display_name=display_name).exclude(user=user).exists():
                return JsonResponse({'error': 'Display name already taken'}, status=400)
            user_profile.display_name = display_name
        if avatar:
            user_profile.avatar.save(avatar.name, avatar, save=True)
        user.save()
        user_profile.save()
        return JsonResponse({'message': 'Profile updated successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)


#@login_required
#@csrf_exempt
#def upload_avatar(request):


@login_required
def profile(request):
    user = request.user
    user_stats = UserStats.objects.get(user=user)
    data = {
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'wins': user_stats.wins,
        'losses': user_stats.losses,
        'avatar': user.userprofile.avatar.url,
    }
    return JsonResponse(data)