from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


# Create your views here.

@login_required
def home(request):
    return JsonResponse({'message': 'Welcome to the home page!'})

# Define a view function for the login page
@csrf_exempt
def login_page(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            return JsonResponse({'error': 'Invalid Password or Username'}, status=400)
        else:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'redirect': '/home/'})

    # Render the login page template (GET request)
  #  return render(request, 'login.html')
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Define a view function for the registration page
@csrf_exempt
def register_page(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = User.objects.filter(username=username)
         
        if user.exists():
            return JsonResponse({'error': 'Username already taken!'}, status=400)
         
        # Create a new User object with the provided information
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username
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