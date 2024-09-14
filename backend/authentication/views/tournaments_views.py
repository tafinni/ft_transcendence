from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.models import User
from authentication.models import Tournament
import json

# invite_to_tournament
@login_required
@csrf_protect
def invite_to_tournament(request):
    if request.method == "POST":
        player_count = request.POST.get('player_count')
        usernames = request.POST.getlist('players')

    try:
        player_count = int(player_count)
    except ValueError:
        return JsonResponse({'error': 'Invalid value for player count'}, status=400)

    if player_count not in {4, 8, 16}:
            return JsonResponse({'error': 'Invalid number of players. Must be 4, 8, or 16.'}, status=400)

    if len(usernames) != player_count:
            return JsonResponse({'error': f'The number of provided players ({len(usernames)}) does not match the specified count ({player_count})'}, status=400)


    # Remove the tournament initiator from the list of players
    if request.user.username in usernames:
        usernames.remove(request.user.username)

    if len(usernames) < player_count - 1:
        return JsonResponse({'error': f'Not enough valid opponents. Required: {player_count - 1}, Found: {len(usernames)}'}, status=400)


    opponents = []
    unique_usernames = set()
    for username in usernames:
        if not username:
            return JsonResponse({'error': 'Opponent username is required'}, status=400)
        if username in unique_usernames:
            return JsonResponse({'error': f'Username {username} is duplicated'}, status=400)

        unique_usernames.add(username)

        try:
            opponent = User.objects.get(username=username)
            if opponent != request.user:
                opponents.append(opponent)
            else:
                return JsonResponse({'error': 'You cannot invite yourself to the tournament'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': f'User {username} does not exist'}, status=404)
            
    if len(opponents) < player_count - 1:
        return JsonResponse({'error': f'Not enough valid opponents. Required: {player_count - 1}, Found: {len(opponents)}'}, status=400)


         # Check for existing tournament invitations
        existing_tournament = Tournament.objects.filter(
            Q(initiator=request.user, opponent__in=opponents) |
            Q(initiator__in=opponents, opponent=request.user),
            accepted=False
        ).first()

        if existing_tournament:
            return JsonResponse({'error': 'Tournament invitation already sent or pending confirmation'}, status=400)

        # Create a new tournament
        tournament, created = Tournament.objects.get_or_create(
            initiator=request.user,
            opponent__in=opponents
        )
        if not created:
            return JsonResponse({'error': 'Tournament invitation already sent or active'}, status=400)

        # Prepare response message
        initiator_display = request.user.userprofile.display_name or request.user.username
        opponent_display_names = [opponent.userprofile.display_name or opponent.username for opponent in opponents]
        opponents_display = ', '.join(opponent_display_names)

        return JsonResponse({'message': f'Tournament invitation sent: {initiator_display} vs {opponents_display}'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Accept tournament invitation
@login_required
@csrf_protect
def accept_tournament_invitation(request):
    if request.method == "POST":
        body = json.loads(request.body)
        initiator_username = body.get('initiator_username')

        if not initiator_username:
            return JsonResponse({'error': 'Initiator username is required'}, status=400)

        try:
            initiator = User.objects.get(username=initiator_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        try:
            tournament = Tournament.objects.get(initiator=initiator, opponent=request.user, accepted=False, is_request=True)
            tournament.accepted = True
            tournament.is_request = False
            tournament.save()

            initiator_display = initiator.userprofile.display_name or initiator.username
            opponent_display = request.user.userprofile.display_name or request.user.username
            return JsonResponse({'message': f'Tournament invitation accepted: {initiator_display} vs {opponent_display}'})
          #  return JsonResponse({'message': 'Tournament invitation accepted'})
        except Tournament.DoesNotExist:
            return JsonResponse({'error': 'Tournament invitation does not exist or already accepted'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@login_required
@csrf_protect
def decline_tournament_invitation(request):
    if request.method == "POST":
        body = json.loads(request.body)
        initiator_username = body.get('initiator_username')

        if not initiator_username:
            return JsonResponse({'error': 'Initiator username is required'}, status=400)

        try:
            initiator = User.objects.get(username=initiator_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        try:
            tournament = Tournament.objects.get(initiator=initiator, opponent=request.user, accepted=False, is_request=True)
            tournament.delete()

            initiator_display = initiator.userprofile.display_name or initiator.username
            opponent_display = request.user.userprofile.display_name or request.user.username
            return JsonResponse({'message': f'Tournament invitation declined: {initiator_display} vs {opponent_display}'})
       #     return JsonResponse({'message': 'Tournament invitation declined and removed'})
        except Tournament.DoesNotExist:
            return JsonResponse({'error': 'Tournament invitation does not exist or already processed'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
