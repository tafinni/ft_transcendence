import { getCookie } from "./csrf";
import { updateContent } from "./i18n";
import { loadContent } from "./router";
import { showAlert } from "./index.js";

export async function loadTournamentLobby() {
	try
	{
		const response = await fetch(`http://localhost:8000/is_user_in_tournament/`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Failed:', response.statusText);
            showAlert('Error occurred. Try again.', 'danger');
            return;
        }

        const data = await response.json();
		
		const reply = await fetch(`http://localhost:8000/get_tournament_matches/?tournament_id=${data.tournament_id}`, {
			method: 'GET',
			credentials: 'include',
		});
		if (!reply.ok)
		{
			console.error('Failed loading tournament matches:', response.statusText);
			showAlert('Error occurred loading tournament matches. Try again.', 'danger');
			return;
		}

		const newData = await reply.json();
		console.log('testing: ', newData);

	}
	catch (error)
	{
		console.error('Error with tournament lobby', error);
		showAlert('Error occured with tournament lobby. Try again.', 'danger');
		loadContent('home');
	}

	const lobbyHTML = `
	
	`;
}

export async function tournamentSetUp(count) {
	let tournamentID = -1;

	const csrftoken = getCookie('csrftoken');
	try
	{
		const reply = await fetch('http://localhost:8000/create_tournament/',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
			credentials: 'include',
			body: JSON.stringify({ player_count: count })
		});

		if (reply.ok)
		{
			const replyData = await reply.json();
			console.log('Sending tournament data successful', replyData);
			tournamentID = replyData.tournament_id;
			count = replyData.player_count;
		}
		else
		{
			const errorData = await reply.json();
			console.error('Tournament setup failed', errorData);
			showAlert('Error during tournament setup. Try again.', 'danger');
			loadContent('home');
		}
	}
	catch (error)
	{
		console.error('Error during tournament setup', error);
		showAlert('Error during tournament setup. Try again.', 'danger');
		loadContent('home');
	}

	let setUpHTML = `
		<div class="card-body d-flex flex-column align-items-center">
			<div class="card p-4" style="width: 20rem;">
				<div class="float-right">
					<button type="button" id="cancel-button" class="btn btn-link" translate="back"></button>
					<button type="button" id="refresh-button" class="btn-sm btn-primary float-right">
							<i class="bi bi-arrow-clockwise" style="font-size: 100%;"></i>
					</button>
				</div>

				<hr style="visibility:hidden;"></hr>
				
				<h5 class="card-title text-center mb-4">
					<span translate="tournament for"></span>
					<span>${count}</span>
					<span translate="players"></span>
				</h5>
				<div id="players-container">
					<!-- Players will be dynamically added here -->
				</div><br>

				<hr style="visibility:hidden;"></hr>
				<hr></hr>

				<form id="add-player-form">
					<div id="error-message" class="text-danger mb-3" style="display: none;"></div>
					<div class="form-group mb-3">
						<label for="new-player" class="form-label" translate="enter player username"></label>
						<input type="text" class="form-control" id="new-player" required>
					</div>
					<button type="submit" class="btn btn-primary w-100" translate="invite player"></button>
				</form>

				<button type="button" id="start-tournament-btn" class="btn btn-success w-100 mt-3" translate="start tournament"></button>
				<button type="button" id="cancel-tournament-btn" class="btn btn-danger w-100 mt-3" translate="cancel tournament"></button>

			</div>
		</div>`;

	const contentElement = document.getElementById('content');
	if (contentElement)
	{
		contentElement.innerHTML = setUpHTML;
		updateContent();
		updatePlayersList(tournamentID);

		const cancelButton = document.getElementById('cancel-button');
		cancelButton.addEventListener('click', () => {
			loadContent('home');
		});

		const refreshButton = document.getElementById('refresh-button');
		refreshButton.addEventListener('click', () => {
			updatePlayersList(tournamentID);
		});

		const cancelTournamentButton = document.getElementById('cancel-tournament-btn');
		cancelTournamentButton.addEventListener('click', () => {
			cancelTournament(tournamentID);
		});

		const startTournamentButton = document.getElementById('start-tournament-btn');
		startTournamentButton.addEventListener('click', async (e) => {
			e.preventDefault();
			try
			{
				const csrftoken = getCookie('csrftoken');
				const response = await fetch('http://localhost:8000/start_tournament/',
				{
					method: 'POST',
					headers: { 'X-CSRFToken': csrftoken },
					credentials: 'include',
					body: JSON.stringify({ tournament_id: tournamentID })
				});
		
				if (response.ok)
				{
					const data = await response.json();
					console.log('Starting tournament successful');
					showAlert(data.message, 'success');
					loadContent('home');
				}
				else
				{
					const errorData = await response.json();
					console.error('Starting tournament failed: ', errorData);
					errorMessage.textContent = errorData.error;
					errorMessage.style.display = 'block';
				}
			}
			catch (error)
			{
				console.error('Error during start tournament', error);
				showAlert('Error during starting tournament. Try Again', 'danger');
				return ;
			}
		
		});

		document.getElementById('add-player-form').addEventListener('submit', async (e) => {
			e.preventDefault();
			
			const newPlayerInput = document.getElementById('new-player');
			const username = newPlayerInput.value.trim();
			const errorMessage = document.getElementById('error-message');
			errorMessage.style.display = 'none';
		
			if (!username) return;
		
			try
			{
				const csrftoken = getCookie('csrftoken');
				const response = await fetch('http://localhost:8000/invite_to_tournament/',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
					credentials: 'include',
					body: JSON.stringify({ opponent_username: username, tournament_id: tournamentID })
				});
		
				if (response.ok)
				{
					const responseData = await response.json();
					console.log('Sending invite to player successful', responseData);
					updatePlayersList(tournamentID);
				}
				else
				{
					const errorData = await response.json();
					console.error('Error inviting player', errorData);
					errorMessage.textContent = errorData.error;
					errorMessage.style.display = 'block';
					return ;
				}
			}
			catch (error)
			{
				console.error('Error during tournament setup', error);
				showAlert('Error during tournament setup. Try again.', 'danger');
			}

			newPlayerInput.value = '';
		});
	}
	else
		console.error('Content element not found');
}

async function cancelTournament(tournament_id) {
	try
	{
		const csrftoken = getCookie('csrftoken');
		const response = await fetch('http://localhost:8000/cancel_tournament/',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
			credentials: 'include',
			body: JSON.stringify({ tournament_id })
		});

		if (response.ok)
		{
			const responseData = await response.json();
			console.log('Cancelling tournament successful', responseData);
			showAlert('Tournament cancelled', 'success');
			loadContent('home');
		}
		else
		{
			const errorData = await response.json();
			console.error('Cancelling tournamnet', errorData);
			showAlert('Error cancelling tournament. Try again.', 'danger');
			loadContent('home');
		}
	}
	catch (error)
	{
		console.error('Error cancelling tournament', error);
		showAlert('Error cancelling tournament. Try again.', 'danger');
		loadContent('home');
	}
}


async function updatePlayersList(tournamentID) {
	try
	{
		const response = await fetch(`http://localhost:8000/list_invited_participants/?tournament_id=${tournamentID}`, {
			method: 'GET',
			credentials: 'include',
		});
		if (!response.ok) {
			console.error('Failed:', response.statusText);
			showAlert('Error occurred. Try again.', 'danger');
			return;
		}

		if (response.ok)
		{
			const data = await response.json();

			const playersContainer = document.getElementById('players-container');
			playersContainer.innerHTML = '';

			const players = data.participants;
			
			players.forEach((participant) => {
				const playerItem = document.createElement('div');
				playerItem.className = 'player-item';
				playerItem.style.display = 'flex';
				playerItem.style.alignItems = 'center';
				playerItem.style.marginBottom = '10px';

				const playerName = document.createElement('span');
				playerName.className = 'player-name';
				playerName.textContent = participant.display_name;
				playerName.style.flexGrow = '1';

				const playerStatus = document.createElement('span');
				playerStatus.className = 'player-status';
				playerStatus.textContent = participant.status;
				playerStatus.style.flexGrow = '1';


				playerItem.appendChild(playerName);
				playerItem.appendChild(playerStatus);

				playersContainer.appendChild(playerItem);

			});
		}
		else
		{
			const errorData = await response.json();
			console.error('Starting tournament failed: ', errorData);
			errorMessage.textContent = errorData.error;
			errorMessage.style.display = 'block';
		}
	}
	catch (error)
	{
		console.error('Error during start tournament', error);
		showAlert('Error during starting tournament. Try Again', 'danger');
	}
}
