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
#@csrf_exempt
def add_result(request):
    data = json.loads(request.body)
    user = request.user
    user_stats = UserStats.objects.get(user=user)
    sLeft = data.get('scoreLeft')
    sRight = data.get('scoreRight')
    oppStatus = data.get('oppIsHuman')
    if (sLeft > sRight):
        user_stats.wins += 1
        result = 'WIN' + ' ' + str(sLeft) + '-' + str(sRight)
    else:
        user_stats.losses += 1
        result = 'LOST' + ' ' + str(sLeft) + '-' + str(sRight)
    user_stats.save()

    if oppStatus == 0:
        opp = 'AI'
    else:
        opp = 'Human'
    MatchHistory.objects.create(
        user = user,
        opponent = opp,
        date = datetime.datetime.now(),
        result = result
    )
    return JsonResponse({'message': 'Result saved successfully'})