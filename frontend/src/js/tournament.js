import { getCookie } from "./csrf";
import { updateContent } from "./i18n";
import { loadContent } from "./router";
import { showAlert } from "./index.js";

export async function tournamentSetUp(value) {
	console.log("Called tournamentSetUp", value);

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok)
	{
		console.error('Failed at tournament set up:', response.statusText);
		showAlert('Error loading tournament set up. Try again.', 'danger');
		return ;
	}

	const userData = await response.json();
	if (value === 4)
	{
		console.log('value is four 4'); //testing
		const setUpHTML = `
			<div class="container-fluid d-flex justify-content-center align-items-center">
				<div class="card p-4" style="width: 20rem;">
				    <div class="card-body d-flex flex-column align-items-center">

						<button type="button" id="cancel-button" class="btn btn-link" translate="back"></button>
						<h3 class="card-title text-center mb-4">Invite to tournament</h3>
						
						<form id="tournament-form" method="POST">
							<div id="error-message" class="text-danger mb-3" style="display: none;"></div>
							
							<div class="form-group mb-3">
								<label for="player-1" class="form-label">Player 1 (You)</label>
								<input type="text" class="form-control" id="player-1" value="${userData.username}" readonly>
							</div>

							<div class="form-group mb-3">
								<label for="player-2" class="form-label">Player 2</label>
								<input type="text" class="form-control" id="player-2" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-3" class="form-label">Player 3</label>
								<input type="text" class="form-control" id="player-3" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-4" class="form-label">Player 4</label>
								<input type="text" class="form-control" id="player-4" required>
							</div>

							<input type="hidden" name="player_count" value="4">

							<button type="submit" class="btn btn-primary w-100">Invite</button>
						</form>
					
					</div>
				</div>
			</div>
		`;

		const contentElement = document.getElementById('content');
		if (contentElement)
			contentElement.innerHTML = setUpHTML;
		else
			console.error('Content element not found');
	}
	else if (value === 8)
	{
		const setUpHTML = `
			<div class="container-fluid d-flex justify-content-center align-items-center">
				<div class="card p-4" style="width: 20rem;">
				    <div class="card-body d-flex flex-column align-items-center">

						<button type="button" id="cancel-button" class="btn btn-link" translate="back"></button>
						<h3 class="card-title text-center mb-4">Invite to tournament</h3>
						
						<form id="tournament-form" method="POST">
							<div id="error-message" class="text-danger mb-3" style="display: none;"></div>
							
							<div class="form-group mb-3">
								<label for="player-1" class="form-label">Player 1 (You)</label>
								<input type="text" class="form-control" id="player-1" value="${userData.username}" readonly>
							</div>

							<div class="form-group mb-3">
								<label for="player-2" class="form-label">Player 2</label>
								<input type="text" class="form-control" id="player-2" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-3" class="form-label">Player 3</label>
								<input type="text" class="form-control" id="player-3" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-4" class="form-label">Player 4</label>
								<input type="text" class="form-control" id="player-4" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-5" class="form-label">Player 5</label>
								<input type="text" class="form-control" id="player-5" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-6" class="form-label">Player 6</label>
								<input type="text" class="form-control" id="player-6" required>
							</div>							
							<div class="form-group mb-3">
								<label for="player-7" class="form-label">Player 7</label>
								<input type="text" class="form-control" id="player-7" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-8" class="form-label">Player 8</label>
								<input type="text" class="form-control" id="player-8" required>
							</div>

						    <input type="hidden" name="player_count" value="8">

							<button type="submit" class="btn btn-primary w-100">Invite</button>
						</form>
					
					</div>
				</div>
			</div>
		`;


		const contentElement = document.getElementById('content');
		if (contentElement)
			contentElement.innerHTML = setUpHTML;
		else
			console.error('Content element not found');
	}
	else
	{
		const setUpHTML = `
			<div class="container-fluid d-flex justify-content-center align-items-center">
				<div class="card p-4" style="width: 20rem;">
				    <div class="card-body d-flex flex-column align-items-center">

						<button type="button" id="cancel-button" class="btn btn-link" translate="back"></button>
						<h3 class="card-title text-center mb-4">Invite to tournament</h3>
						
						<form id="tournament-form" method="POST">
							<div id="error-message" class="text-danger mb-3" style="display: none;"></div>
							
							<div class="form-group mb-3">
								<label for="player-1" class="form-label">Player 1 (You)</label>
								<input type="text" class="form-control" id="player-1" name="player1" value="${userData.username}" readonly>
							</div>

							<div class="form-group mb-3">
								<label for="player-2" class="form-label">Player 2</label>
								<input type="text" class="form-control" id="player-2" name="player2" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-3" class="form-label">Player 3</label>
								<input type="text" class="form-control" id="player-3" name="player3" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-4" class="form-label">Player 4</label>
								<input type="text" class="form-control" id="player-4" name="player4" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-5" class="form-label">Player 5</label>
								<input type="text" class="form-control" id="player-5" name="player5" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-6" class="form-label">Player 6</label>
								<input type="text" class="form-control" id="player-6" name="player6" required>
							</div>							
							<div class="form-group mb-3">
								<label for="player-7" class="form-label">Player 7</label>
								<input type="text" class="form-control" id="player-7" name="player7" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-8" class="form-label">Player 8</label>
								<input type="text" class="form-control" id="player-8" name="player8" required>
							</div>


							<div class="form-group mb-3">
								<label for="player-9" class="form-label">Player 9</label>
								<input type="text" class="form-control" id="player-9" name="player9" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-10" class="form-label">Player 10</label>
								<input type="text" class="form-control" id="player-10" name="player10" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-11" class="form-label">Player 11</label>
								<input type="text" class="form-control" id="player-11" name="player11" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-12" class="form-label">Player 12</label>
								<input type="text" class="form-control" id="player-12" name="player12" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-13" class="form-label">Player 13</label>
								<input type="text" class="form-control" id="player-13" name="player13" required>
							</div>							
							<div class="form-group mb-3">
								<label for="player-14" class="form-label">Player 14</label>
								<input type="text" class="form-control" id="player-14" name="player14" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-15" class="form-label">Player 15</label>
								<input type="text" class="form-control" id="player-15" name="player15" required>
							</div>

							<div class="form-group mb-3">
								<label for="player-16" class="form-label">Player 16</label>
								<input type="text" class="form-control" id="player-16" required>
							</div>							

							<input type="hidden" name="player_count" value="16">

							<button type="submit" class="btn btn-primary w-100">Invite</button>
						</form>
					
					</div>
				</div>
			</div>
		`;


		const contentElement = document.getElementById('content');
		if (contentElement)
			contentElement.innerHTML = setUpHTML;
		else
			console.error('Content element not found');
	}

	updateContent();
	sendInvites();
}

async function sendInvites() {

    const tournamentForm = document.getElementById('tournament-form');
    if (!tournamentForm)
	{
		console.error('Tournament form not found');
		showAlert('Error occured. Try again', 'danger');
		return ;
	}

	const cancelButton = document.getElementById('cancel-button');
	const errorMessage = document.getElementById('error-message');

    tournamentForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const formData = new FormData(tournamentForm);
		console.log(formData);
		const csrftoken = getCookie('csrftoken');
		try
		{
			const response = await fetch('http://localhost:8000/invite_to_tournament/',
			{
				method: 'POST',
				headers: { 'X-CSRFToken': csrftoken },
				credentials: 'include',
				body: formData
			});

			if (response.ok)
			{
				const data = await response.json();
				console.log('Invite successful');
				showAlert('Invites sent', 'success');
				loadContent('home'); // for testing
				//tournamentLobby();
			}
			else
			{
				const errorData = await response.json();
				console.error('Sending invites failed', errorData);
				errorMessage.textContent = errorData.error;
				errorMessage.style.display = 'block';
			}
		}
		catch (error)
		{
			console.error('Error during tournament set up');
			showAlert('Error at tournament set up. Try again.', 'danger');
		}
	});

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled tournament invites');
		loadContent('home');
	});
}
