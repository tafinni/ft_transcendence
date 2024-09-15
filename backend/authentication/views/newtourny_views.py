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
import datetime

@csrf_protect
def check_username(request):
    if request.method == "POST":
        body = json.loads(request.body)
        check_username = body.get('check_username')
        if not check_username:
            return JsonResponse({'error': 'No username to check!'}, status=400)
        try:
            check = User.objects.get(username=check_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Username not found', 'exists': False}, status=200)
        return JsonResponse({'message': 'Username exists', 'exists': True}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

