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
from django.core.exceptions import ObjectDoesNotExist
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
@csrf_protect
def public_match_history(request):
    if request.method == "GET":
        user_username = request.GET.get('user_username')

        if not user_username:
            return JsonResponse({'error': 'Username not provided'}, status=400)

        try:
            user = User.objects.get(username=user_username)
            matches = MatchHistory.objects.filter(user=user).order_by('-date')
            match_list = [
                {
                    'opponent': match.opponent, 
                    'date': match.date, 
                    'result': match.result
                } for match in matches
            ]
            return JsonResponse({'matches': match_list})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)


@login_required
@csrf_exempt
def add_result(request):
    data = json.loads(request.body)
    user = request.user
    user_stats = UserStats.objects.get(user=user)
    sLeft = data.get('scoreLeft')
    sRight = data.get('scoreRight')
    oppStatus = data.get('oppIsHuman')
    oppName = data.get('oppName')

    if oppName == user.username:
        return JsonResponse({'message': 'Due to players being the same, result was not saved'})
    if oppStatus == 0:
        opp = 'AI'
        opp_user = None
    else:
        opp = oppName
    try:
        opp_user = User.objects.get(username=oppName)
        opp_stats = UserStats.objects.get(user=opp_user)
        if (sLeft > sRight):
            user_stats.wins += 1
            opp_stats.losses +=1
            result = 'WIN' + ' ' + str(sLeft) + '-' + str(sRight)
            oppResult = 'LOST' + ' ' + str(sRight) + '-' + str(sLeft)
        elif (sRight > sLeft):
            user_stats.losses += 1
            opp_stats.wins += 1
            result = 'LOST' + ' ' + str(sLeft) + '-' + str(sRight)
            oppResult = 'WIN' + ' ' + str(sRight) + '-' + str(sLeft)
        else:
            result = 'DRAW' + ' ' + str(sLeft) + '-' + str(sRight)
            oppResult = 'DRAW' + ' ' + str(sRight) + '-' + str(sLeft)
        user_stats.save()
        opp_stats.save()

        MatchHistory.objects.create(
        user = user,
        opponent = opp,
        date = datetime.datetime.now(),
        result = result
        )

        MatchHistory.objects.create(
            user=opp_user,
            opponent=user.username,
            date=datetime.datetime.now(),
            result = oppResult
        )
    except ObjectDoesNotExist:
        # Handle the case where the opponent does not exist
        if (sLeft > sRight):
            user_stats.wins += 1
            result = 'WIN' + ' ' + str(sLeft) + '-' + str(sRight)
        elif (sRight > sLeft):
            user_stats.losses += 1
            result = 'LOST' + ' ' + str(sLeft) + '-' + str(sRight)
        else:
            result = 'DRAW' + ' ' + str(sLeft) + '-' + str(sRight)
        user_stats.save()
        MatchHistory.objects.create(
        user = user,
        opponent = opp,
        date = datetime.datetime.now(),
        result = result
        )
    return JsonResponse({'message': 'Result saved successfully'})
