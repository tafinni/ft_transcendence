from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
import json
from authentication.models import UserStats, UserProfile, MatchHistory, Friendship, Participants, Tournament, ResultTournament
from django.conf import settings
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
import datetime
from django.core.exceptions import ObjectDoesNotExist


@login_required
@csrf_protect
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
def friends_statistics(request):
    user = request.user
    try:
        friendships = Friendship.objects.filter(user=user, accepted=True)
    except Friendship.DoesNotExist:
        return JsonResponse({'error': 'No friends found'}, status=404)

    friends_data = []

    for friendship in friendships:
        friend = friendship.friend
        try:
            stats = UserStats.objects.get(user=friend)
        except ObjectDoesNotExist:
            stats = UserStats(user=friend, wins=0, losses=0)
            stats.save() # ?

        friends_data.append({
            'friend_name': friend.username,
            'wins': stats.wins,
            'losses': stats.losses,
        })

    return JsonResponse({'friends': friends_data})

@login_required
@csrf_protect
#@csrf_exempt
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
    elif oppStatus == 2:
        opp = 'Guest Player'
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

# @csrf_exempt
@csrf_protect
def add_tourney_result(request):
    data = json.loads(request.body)
    nameLeft = data.get('nameLeft')
    userLeft = User.objects.get(username=nameLeft)
    sLeft = data.get('scoreLeft')
    nameRight = data.get('nameRight')
    userRight = User.objects.get(username=nameRight)
    sRight = data.get('scoreRight')

    if (sLeft > sRight):
        resultLeft = 'win' + ' ' + str(sLeft) + '-' + str(sRight)
        resultRight = 'lost' + ' ' + str(sLeft) + '-' + str(sRight)
        winner = "left"
    else:
        resultLeft = 'lost' + ' ' + str(sLeft) + '-' + str(sRight)
        resultRight = 'win' + ' ' + str(sLeft) + '-' + str(sRight)
        winner = "right"
    MatchHistory.objects.create(
        user = userLeft,
        opponent = userRight,
        date = datetime.datetime.now(),
        result = resultLeft
    )
    MatchHistory.objects.create(
        user = userRight,
        opponent = userLeft,
        date = datetime.datetime.now(),
        result = resultRight
    )
    participant = Participants.objects.filter(user=userLeft, tournament__status=1).first()
    opp = Participants.objects.filter(user=userRight, tournament__status=1).first()
    pluser = participant.user
    pruser = opp.user
    tourId = participant.tournament_id
    tourney = Tournament.objects.get(id=tourId)
    if not tourney:
        return JsonResponse({'message': 'no tournament'})
    # results = ResultTournament.objects.filter(user=pluser, opponent=pruser, tournament=tourney)
    results = ResultTournament.objects.filter(
    tournament=tourney,
    user__in=[pluser, pruser],
    opponent__in=[pluser, pruser]
    )
    if not results:
        return JsonResponse({'message': 'no results'})
    for result in results:
        if winner == "left":
            result.result = "win"
        else:
            result.result = "loss"
        result.save()
    return JsonResponse({'message': 'Result saved successfully'})