import { getCookie } from "./csrf";
import { updateContent } from "./i18n";
import { loadContent } from "./router";
import { showAlert } from "./index.js";

export async function loadTournamentLobby() {
	try {
		// Fetch the user's tournament status
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
		
		// Fetch the tournament matches
		console.log(data.tournament_id);
		const reply = await fetch(`http://localhost:8000/get_tournament_matches/?tournament_id=${data.tournament_id}`, {
			method: 'GET',
			credentials: 'include',
		});

		if (!reply.ok) {
			console.error('Failed loading tournament matches:', reply.statusText);
			showAlert('Error occurred loading tournament matches. Try again.', 'danger');
			return;
		}

		const newData = await reply.json();
		if (newData.game_over === true)
		{
			console.log("tournament is over");
			loadContent('home');
			return;
		}
		console.log('testing: ', newData);

		const matchesHTML = newData.matches.map(match => `
			<div class="match-container mb-3">
				<p style="color: white"><strong>Round ${match.round_number}, Group ${match.group_number}</strong></p>
				<p style="color: white">${match.player_1} vs ${match.player_2}</p>
				${match.result === 'Pending' ? 
					`<button type="button" class="btn btn-primary start-game-btn" data-round="${match.round_number}" data-group="${match.group_number}">Start Game</button>` 
					: 
					`<button type="button" class="btn btn-secondary" disabled>${match.result === 'in_progress' ? 'In Progress' : 'Completed'}</button>`
				}			</div>
		`).join('');

		const lobbyHTML = `
			<div class="container mt-5">
				${matchesHTML}
			</div>
		`;

		const contentElement = document.getElementById('content');
		if (contentElement) {
			contentElement.innerHTML = lobbyHTML;
			updateContent();

			// Add event listeners for start game buttons
			const startGameButtons = document.querySelectorAll('.start-game-btn');
			startGameButtons.forEach(button => {
				button.addEventListener('click', () => {
					const round = button.getAttribute('data-round');
					const group = button.getAttribute('data-group');
					console.log(`Start game for round ${round}, group ${group}`);
					playerAuth(data.tournament_id, round, group);
				});
			});
		} else {
			console.error('Content element not found');
		}
	} catch (error) {
		console.error('Error with tournament lobby', error);
		showAlert('Error occurred with tournament lobby. Try again.', 'danger');
		loadContent('home');
	}
}

export async function tournamentSetUp(count) {
	console.log("Called tournamentSetUp", count);

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
	console.log("the tournament id: ", tournamentID);

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
				
				<h3 class="card-title text-center mb-4">
					<span translate="invite to tournament"></span>
				</h3>
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


async function updatePlayersList(tournamentID) {
	try
	{
		const csrftoken = getCookie('csrftoken');
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
			console.log('Getting player list successful');

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
