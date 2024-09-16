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
        body = json.loads(request.body)
        opponent_username = body.get('opponent_username')

        if not opponent_username:
            return JsonResponse({'error': 'Opponent username is required'}, status=400)

        try:
            opponent = User.objects.get(username=opponent_username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)

        if opponent == request.user:
            return JsonResponse({'error': 'You cannot invite yourself to a tournament'}, status=400)

        existing_tournament = Tournament.objects.filter(
            (Q(initiator=request.user, opponent=opponent) | Q(initiator=opponent, opponent=request.user)),
            accepted=False
        ).first() #?

        if existing_tournament:
            return JsonResponse({'error': 'Tournament invitation already sent or pending'}, status=400)

        tournament, created = Tournament.objects.get_or_create(initiator=request.user, opponent=opponent)
        if not created:
            return JsonResponse({'error': 'Tournament invitation already sent or already active'}, status=400)


        initiator_display = request.user.userprofile.display_name or request.user.username
        opponent_display = opponent.userprofile.display_name or opponent.username
        return JsonResponse({'message': f'Tournament invitation sent: {initiator_display} vs {opponent_display}'})
     #   return JsonResponse({'message': 'Tournament invitation sent'})

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
