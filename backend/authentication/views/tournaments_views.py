from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.contrib.auth.models import User
from authentication.models import Tournament, Participants, ResultTournament
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
        existing_tournament = Tournament.objects.filter(initiator=request.user, status__in=[0, 1]).first()
        if existing_tournament:
            return JsonResponse({
                'error': 'You already have an ongoing or pending tournament. Complete it before creating a new one.'
            }, status=400)

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
        return JsonResponse({'message': f'Tournament created by {initiator_display}', 'tournament_id': tournament.id})

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