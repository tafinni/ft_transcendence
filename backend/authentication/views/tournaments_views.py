from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.contrib.auth.models import User
from authentication.models import Tournament, Participants, ResultTournament
from django.db.models import Max
import json
import random

@login_required
@csrf_protect
#@csrf_exempt
def accept_tournament_invitation(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            initiator_username = body.get('initiator_username')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)


        participant1 = Participants.objects.filter(
            user=request.user, 
            tournament__status=0, 
            is_accepted=True  # Only check for accepted tournaments
        ).select_related('tournament').first()

        if participant1:
            return JsonResponse({'error': 'Finish current tournament'}, status=400)



        participant1 = Participants.objects.filter(
            user=request.user, 
            tournament__status=0, 
            is_accepted=True  # Only check for accepted tournaments
        ).select_related('tournament').first()

        if participant1:
            return JsonResponse({'error': 'Finish current tournament'}, status=400)


        if not initiator_username:
            return JsonResponse({'error': 'Initiator username is required'}, status=400)

        # Find the initiator user
        initiator = User.objects.filter(username=initiator_username).first()
        if not initiator:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        # Find the tournament initiated by the specified user
        tournament = Tournament.objects.filter(initiator=initiator, status=0).first()  # Status=0 means 'Pending'
        if not tournament:
            return JsonResponse({'error': 'Tournament does not exist or already processed'}, status=404)
        
        accepted = Participants.objects.filter(tournament=tournament, is_accepted=True)
        if tournament.player_count == accepted.count():
            return JsonResponse({'error': 'Tournament full'}, status=404)
        
        accepted = Participants.objects.filter(tournament=tournament, is_accepted=True)
        if tournament.player_count == accepted.count():
            return JsonResponse({'error': 'Tournament full'}, status=404)

        # Find the participant record for the current user with a pending invitation
        participant = Participants.objects.filter(tournament=tournament, user=request.user, is_accepted=None).first()
        if not participant:
            return JsonResponse({'error': 'You do not have a pending invitation to this tournament'}, status=404)

        # Update the participant's acceptance status to True
        participant.is_accepted = True
        participant.save()

        # Get display names for the initiator and the user
        initiator_display = initiator.userprofile.display_name or initiator.username
        user_display = request.user.userprofile.display_name or request.user.username

    # Return a success message
    return JsonResponse({'message': f'Tournament invitation accepted: {initiator_display} vs {user_display}'})


@login_required
@csrf_protect
#@csrf_exempt
def decline_tournament_invitation(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            initiator_username = body.get('initiator_username')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        if not initiator_username:
            return JsonResponse({'error': 'Initiator username is required'}, status=400)

        try:
            initiator = User.objects.get(username=initiator_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        # Find the tournament where the current user is invited by the initiator
        participant = Participants.objects.filter(
            tournament__initiator=initiator,
            user=request.user,
            is_accepted=None
        ).first()

        if not participant:
            return JsonResponse({'error': 'No pending invitation found for this tournament'}, status=404)

        # Delete the participant record, effectively declining the invitation
        participant.delete()

        # Get display names for the initiator and the user
        initiator_display = initiator.userprofile.display_name or initiator.username
        user_display = request.user.userprofile.display_name or request.user.username

        return JsonResponse({'message': f'Tournament invitation declined: {initiator_display} vs {user_display}'})
    
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# invite_to_tournament
@login_required
@csrf_protect
#@csrf_exempt
def invite_to_tournament(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            opponent_username = body.get('opponent_username')
            tournament_id = body.get('tournament_id')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        if not opponent_username or not tournament_id:
            return JsonResponse({'error': 'Opponent username and tournament ID are required'}, status=400)
   
   
        try:
            opponent = User.objects.get(username=opponent_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        try:
            tournament = Tournament.objects.get(id=tournament_id, initiator=request.user, status=0)  # status=0 means 'Pending'
        except Tournament.DoesNotExist:
            return JsonResponse({'error': 'Tournament does not exist or is not pending'}, status=404)

        if opponent == request.user:
            return JsonResponse({'error': 'You cannot invite yourself to the tournament'}, status=400)

        # Check if the user is already invited or accepted
        existing_participant = Participants.objects.filter(tournament=tournament, user=opponent).first()
        if existing_participant:
            if existing_participant.is_accepted is None:
                return JsonResponse({'error': 'User is already invited and pending acceptance'}, status=400)
            elif existing_participant.is_accepted:
                return JsonResponse({'error': 'User has already accepted the invitation'}, status=400)
            else:
                return JsonResponse({'error': 'User has declined the invitation'}, status=400)

        # Add the opponent to the tournament
        Participants.objects.create(
            tournament=tournament,
            user=opponent,
            is_accepted=None  # Pending acceptance
        )

        # Prepare response message
        initiator_display = request.user.userprofile.display_name or request.user.username
        opponent_display = opponent.userprofile.display_name or opponent.username

        return JsonResponse({'message': f'Invitation sent to {opponent_display} for tournament initiated by {initiator_display}'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@login_required
@csrf_protect
#@csrf_exempt
def create_tournament(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            player_count = body.get('player_count')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        if not player_count:
            return JsonResponse({'error': 'Player count is required'}, status=400)

        try:
            player_count = int(player_count)
        except ValueError:
            return JsonResponse({'error': 'Invalid player count'}, status=400)

        if player_count not in {4, 8, 16}:
            return JsonResponse({'error': 'Invalid player count. Must be 4, 8, or 16'}, status=400)

        #Checking for the existence of an unfinished tournament (Pending 0 or Active 1)
     #   existing_tournament = Tournament.objects.filter(initiator=request.user, status__in=[0, 1]).first()
     #   if existing_tournament:
     #       return JsonResponse({
     #           'error': 'You already have an ongoing or pending tournament. Complete it before creating a new one.'
      #      }, status=400)

        existing_tournament = Tournament.objects.filter(initiator=request.user, status__in=[0]).first()
        if existing_tournament:
            existing_tournament.player_count #= player_count
            return JsonResponse({
                'message': 'You already have a pending tournament.',
                'tournament_id': existing_tournament.id,
                'player_count': existing_tournament.player_count
            })

        tournament = Tournament.objects.create(
            initiator=request.user,
            player_count=player_count,
            status=0  # Pending
        )

        # Add the initiator to the participants of the tournament
        Participants.objects.create(
            tournament=tournament,
            user=request.user,
            is_accepted=True
        )

        # Prepare response message
        initiator_display = request.user.userprofile.display_name or request.user.username
        return JsonResponse({'message': f'Tournament created by {initiator_display}', 'tournament_id': tournament.id, 'player_count': tournament.player_count})

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
@csrf_protect
#@csrf_exempt
def start_tournament(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            tournament_id = body.get('tournament_id')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        if not tournament_id:
            return JsonResponse({'error': 'Tournament ID is required'}, status=400)

        try:
            tournament = Tournament.objects.get(id=tournament_id, initiator=request.user, status=0)  # status=0 means 'Pending'
        except Tournament.DoesNotExist:
            return JsonResponse({'error': 'Tournament does not exist or is not pending'}, status=404)

        accepted_participants = Participants.objects.filter(tournament=tournament, is_accepted=True)

        # Check if the number of participants who have accepted matches the required player count
        if accepted_participants.count() != tournament.player_count:
            return JsonResponse({'error': 'Not enough participants have accepted the invitation'}, status=400)

        participants_list = list(accepted_participants)
        random.shuffle(participants_list)
        # create group
        group_number = 1
        for i in range(0, len(participants_list), 2):
            participants_list[i].group_number = group_number
            participants_list[i+1].group_number = group_number
            participants_list[i].save()
            participants_list[i+1].save()

            group_number += 1

        # Update the tournament status to 'Active'
        tournament.status = 1  # 1 means 'Active'
        tournament.save()

        # Prepare response message
        initiator_display = request.user.userprofile.display_name or request.user.username

        return JsonResponse({'message': f'Tournament {tournament_id} started by {initiator_display}'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@login_required
def list_invited_participants(request):
    if request.method == "GET":
        tournament_id = request.GET.get('tournament_id')
    try:
        tournament = Tournament.objects.get(id=tournament_id)
    except Tournament.DoesNotExist:
        return JsonResponse({'error': 'Tournament not found'}, status=404)

    if request.user != tournament.initiator and not Participants.objects.filter(tournament=tournament, user=request.user).exists():
        return JsonResponse({'error': 'You do not have permission to view participants for this tournament'}, status=403)

    participants = Participants.objects.filter(tournament=tournament).select_related('user')

    participant_list = []
    for participant in participants:
        user_profile = participant.user.userprofile
        display_name = user_profile.display_name if user_profile.display_name else participant.user.username

        # Check status: None = Pending, True = Accepted, False = Declined
        if participant.is_accepted is None:
            status = "Pending"
        elif participant.is_accepted:
            status = "Accepted"
        else:
            status = "Declined"

        participant_list.append({
            'display_name': display_name,
            'status': status
        })

    return JsonResponse({'participants': participant_list})


@login_required
def is_user_in_tournament(request):
    #if request.method == "GET":
        # Check if the user is a participant in any pending or active tournaments (status = 0 or 1)
    participant = Participants.objects.filter(
        user=request.user, 
        tournament__status__in=[0, 1]  # Checking both pending and active tournaments
    ).select_related('tournament').first()

    if not participant:
        return JsonResponse({
            'in_tournament': False,
            'message': 'User is not in any pending or active tournament'
        }, status=200)

    user = request.user

    # If the tournament is active (status = 1)
    if participant.tournament.status == 1:
        return JsonResponse({
            'user': user.username,
            'in_tournament': True,
            'status': 'Active',
            'test': participant.tournament.status,
            'tournament_id': participant.tournament.id,
            'tournament_initiator': participant.tournament.initiator.username
        }, status=200)

    # If the user has accepted the invitation to a pending tournament (status = 0)
    if participant.is_accepted is True and participant.tournament.status == 0:
        return JsonResponse({
            'user': user.username,
            'in_tournament': True,
            'status': 'Pending',
            'test': participant.tournament.status,
            'tournament_id': participant.tournament.id,
            'tournament_initiator': participant.tournament.initiator.username
        }, status=200)


    # If the user has accepted the invitation to a pending tournament (status = 0)
    if participant.is_accepted is None and participant.tournament.status == 0:
        return JsonResponse({
            'user': user.username,
            'in_tournament': None,
            'status': 'Pending',
            'test': participant.tournament.status,
            'test2': 'invited but not accepted',
            'tournament_id': participant.tournament.id,
            'tournament_initiator': participant.tournament.initiator.username
        }, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@login_required
@csrf_protect
def cancel_tournament(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            tournament_id = body.get('tournament_id')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        try:
            tournament = Tournament.objects.get(id=tournament_id, initiator=request.user, status=0)  # status=0 means 'Pending'
        except Tournament.DoesNotExist:
            return JsonResponse({'error': 'Tournament does not exist or is not pending'}, status=404)

        # If the tournament exists and is found, delete it
        tournament.delete()
        return JsonResponse({'success': 'Tournament canceled and deleted successfully'}, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=405)




@login_required
def get_tournament_matches(request):
    if request.method == "GET":
        tournament_id = request.GET.get('tournament_id')
        
        try:
            tournament = Tournament.objects.get(id=tournament_id)
        except Tournament.DoesNotExist:
            return JsonResponse({'error': 'Tournament not found'}, status=404)

        # Check if the current user is a participant in the tournament
        is_participant = Participants.objects.filter(tournament=tournament, user=request.user).exists()
        if not is_participant and request.user != tournament.initiator:
            return JsonResponse({'error': 'You are not allowed to view this tournament'}, status=403)

        # Retrieve all results for the current tournament
        results = ResultTournament.objects.filter(tournament=tournament)
        current_round = results.aggregate(max_round=Max('round_number'))['max_round'] or 1
        matches_list = []

        if not results.exists():
            # Get participants from tournament
            participants = Participants.objects.filter(tournament=tournament, is_accepted=True) # accept
            if not participants.exists():
                return JsonResponse({'error': 'No participants in this tournament'}, status=400)
           # round_number = 1
            groups: dict = {} #dic
            for participant in participants:
                group_number = participant.group_number
                if group_number not in groups:
                    groups[group_number] = []

                groups[group_number].append(participant)
            # Create matches for round 1
            for group_number, group_participants in groups.items(): #?
                if len(group_participants) == 2:  # Ensure there are exactly two participants in a group
                    participant1, participant2 = group_participants
                    user_display1 = participant1.user.userprofile.display_name or participant1.user.username
                    user_display2 = participant2.user.userprofile.display_name or participant2.user.username

                    mResult = ResultTournament.objects.create(
                        tournament = tournament,
                        user = participant1.user,
                        opponent = participant2.user,
                        round_number = 1,
                    )
                    mResult.save()
                    matches_list.append({
                        'round_number': 1,  # Assuming the round number is 1 if no results exist yet
                        'group_number': group_number,
                        'player_1': user_display1,
                        'player_2': user_display2,
                        'result': 'Pending'
                    })
        else:
            # Check if all matches in the current round are completed
            all_completed = not ResultTournament.objects.filter(tournament=tournament, round_number=current_round, result__isnull=True).exists()

            if all_completed:
                # Move to the next round by selecting winners from the current round
                winners = []
                for result in results.filter(round_number=current_round):
                    if result.result == 'win':
                        winners.append(result.user)
                    elif result.result == 'loss':
                        winners.append(result.opponent) 

                if len(winners) == 1:
                    # Завершаем турнир, так как остался только один победитель
                    tournament.status = 2  # "Completed"
                    tournament.save()
                    return JsonResponse({'message': f'{winners[0].username} is the winner!'}, status=200)

                # Update group numbers and create new matches for the next round
                # Если больше одного победителя, создаём новые группы для следующего раунда
                new_groups = {}
                group_number = 1

                for i in range(0, len(winners), 2):
                    if len(winners[i:i+2]) == 2:  # Ensure there are exactly two participants
                        winner1, winner2 = winners[i], winners[i+1]
                        new_groups[group_number] = [winner1, winner2]
                        group_number += 1

                current_round += 1

                # Save new groups and create match pairs
                for group_number, group_participants in new_groups.items():
                    user_display1 = group_participants[0].userprofile.display_name or group_participants[0].username
                    user_display2 = group_participants[1].userprofile.display_name or group_participants[1].username

                    matches_list.append({
                        'round_number': current_round,
                        'group_number': group_number,
                        'player_1': user_display1,
                        'player_2': user_display2,
                        'result': 'Pending'
                    })

            else:
                # Current round is not complete, display ongoing matches
                for result in results.filter(round_number=current_round):
                    user_display = result.user.userprofile.display_name or result.user.username
                    opponent_display = result.opponent.userprofile.display_name or result.opponent.username
                    match_info = {
                        'round_number': result.round_number,
                        'group_number': Participants.objects.get(user=result.user, tournament=tournament).group_number,
                        'player_1': user_display,
                        'player_2': opponent_display,
                        'result': result.result or 'Pending'
                    }
                    matches_list.append(match_info)

        return JsonResponse({'matches': matches_list}, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



@login_required
@csrf_protect
def get_next_match(request):
    if request.method == "GET":
        tournament_id = request.GET.get('tournament_id')
    
        try:
            tournament = Tournament.objects.get(id=tournament_id)
        except Tournament.DoesNotExist:
            return JsonResponse({'error': 'Tournament not found'}, status=404)
    
        # Check if the current user is a participant in the tournament
        is_participant = Participants.objects.filter(tournament=tournament, user=request.user).exists()
        if not is_participant and request.user != tournament.initiator:
            return JsonResponse({'error': 'You are not allowed to view this tournament'}, status=403)
        
        # Retrieve all results for the current tournament
        results = ResultTournament.objects.filter(tournament=tournament)

        # Get the current round or set it to 1 if no results exist
        current_round = results.aggregate(max_round=Max('round_number'))['max_round'] or 1

        # Look for the next match for the current user in the current round
        next_match = results.filter(
            round_number=current_round,
            user=request.user
        ).first()

        if not next_match:
            # Try checking if the current user is an opponent in any matches
            next_match = results.filter(
                round_number=current_round,
                opponent=request.user
            ).first()

        if not next_match:
            return JsonResponse({'message': 'No upcoming match found for this user'}, status=200)

        # Get opponent information
        if next_match.user == request.user:
            opponent = next_match.opponent
        else:
            opponent = next_match.user

        opponent_display_name = opponent.userprofile.display_name or opponent.username

        # Check if the match has been played
        match_status = next_match.result or 'Pending'

        # Return match info
        return JsonResponse({
            'round_number': next_match.round_number,
            'opponent': opponent_display_name,
            'match_status': match_status
        }, status=200)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
def get_players(request):
    tournament_id = request.GET.get('tournament_id')
    group_num = request.GET.get('group')

    # if not tournament_id or not round_num or not group_num:
    if not tournament_id or not group_num:
        return JsonResponse({'error': 'Tournament ID, round number, and group number are required', "req": str(request.GET)}, status=400)

    # Retrieve participants for the specified group and round
    participants = Participants.objects.filter(
        tournament_id=tournament_id,
        group_number=group_num,
        is_accepted=True 
    ).select_related('user')

    players_in_round = [p.user for p in participants]

    if len(players_in_round) != 2:
        return JsonResponse({'error': 'Not enough players found for the specified round and group'}, status=404)

    resp = {}
    for i, p in enumerate(players_in_round, start=1):
        resp[f'player{i}'] = {
            'username': p.username,
            'display_name': p.userprofile.display_name or p.username
        }
    return JsonResponse(resp)


@csrf_protect
@login_required
def update_game_status(request):
    # Get player usernames from the request
    body = json.loads(request.body)
    player1_username = body.get('player1')
    player2_username = body.get('player2')

    # Validate input
    if not player1_username or not player2_username:
        return JsonResponse({'error': 'Both player1 and player2 usernames are required'}, status=400)

    # Fetch both players from the `User` model
    try:
        player1 = User.objects.get(username=player1_username)
        player2 = User.objects.get(username=player2_username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'One or both players not found'}, status=404)

    # Retrieve the game involving both players
    try:
        game = ResultTournament.objects.filter(
            (Q(user=player1) & Q(opponent=player2)) | 
            (Q(user=player2) & Q(opponent=player1))
        ).first()

        if not game:
            return JsonResponse({'error': 'Game between these players not found'}, status=404)

    except ResultTournament.DoesNotExist:
        return JsonResponse({'error': 'Game not found'}, status=404)

    # Update game status (assuming `game_status` is a field on `ResultTournament`)
    game.status = 'Completed'  # Or 'started', 'finished', etc.
    game.save()

    return JsonResponse({'success': 'Game status updated successfully'}, status=200)