import { getCookie } from "./csrf";
import { updateContent } from "./i18n";
import { loadContent } from "./router";
import { showAlert } from "./index.js";


/* export async function loadTournamentLobby() {
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
		//console.log('testing: ', newData);

	const lobbyHTML = `
		<div class="container mt-5">
			<button type="button" id="start-match-btn" class="btn btn-warning">Start match</button>
		</div>
	`;

	const contentElement = document.getElementById('content');
	if (contentElement)
	{
		contentElement.innerHTML = lobbyHTML;
		updateContent();

		const startMatchButton = document.getElementById('start-match-btn');
		if (startMatchButton)
		{
			startMatchButton.addEventListener('click', () => {
				console.log('Clicked start match button');
				nextMatch(data.tournament_id);
			});
		}
	}
	else
		console.error('Content element not found');
	}
	catch (error)
	{
		console.error('Error with tournament lobby', error);
		showAlert('Error occured with tournament lobby. Try again.', 'danger');
		loadContent('home');
	}
} */

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

		// Generate HTML for tournament matches
		const matchesHTML = newData.matches.map(match => `
			<div class="match-container mb-3">
				<p style="color: white"><strong>Round ${match.round_number}, Group ${match.group_number}</strong></p>
				<p style="color: white">${match.player_1} vs ${match.player_2}</p>
				<button type="button" class="btn btn-primary start-game-btn" data-round="${match.round_number}" data-group="${match.group_number}">Start Game</button>
			</div>
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
					// Implement your logic to start the game for the selected match
					startGame(data.tournament_id, round, group);
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

async function startGame(tournamentId, round, group) {
	// Implement your logic to start the game for the selected match
	console.log(`Starting game for tournament ${tournamentId}, round ${round}, group ${group}`);

	const startHTML = `
		<div class="bg-fade container-fluid d-flex justify-content-center align-items-center">
			<div class="card p-4" style="width: 20rem;">
'				<h3 class="card-title text-center mb-4">Player 1</h3>
'				<form id="auth1-form" method="POST">
					<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>
					<div class="form-group mb-3">
						<label for="username" class="form-label" translate="username"></label>
						<input type="text" class="form-control" id="username" required>
					</div>
					<div class="form-group mb-3">
						<label for="password" class="form-label" translate="password"></label>
						<input type="password" class="form-control" id="password" required>
					</div>
					<button type="submit" class="btn btn-primary w-100">Authenticate</button>
				</form>
			</div>

			<div class="card p-4" style="width: 20rem;">
				<h3 class="card-title text-center mb-4">Player 2</h3>
				<form id="auth2-form" method="POST">
					<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>
					<div class="form-group mb-3">
						<label for="username" class="form-label" translate="username"></label>
						<input type="text" class="form-control" id="username" required>
					</div>
					<div class="form-group mb-3">
						<label for="password" class="form-label" translate="password"></label>
						<input type="password" class="form-control" id="password" required>
					</div>
					<button type="submit" class="btn btn-primary w-100">Authenticate</button>
				</form>
				<button type="click" id="continue-btn" class="btn btn-warning w-100">Continue</button>

			</div>
		</div>
	`;

	const contentElement = document.getElementById('content');
	if (contentElement) {
		contentElement.innerHTML = startHTML;
		updateContent();

		const auth1Form = document.getElementById('auth1-form');
		if (!auth1Form)
		{
			console.error('Auth1 form not found');
			showAlert('Error occured. Try again', 'danger');
			return ;
		}
		const auth2Form = document.getElementById('auth2-form');
		if (!auth2Form)
		{
			console.error('Auth1 form not found');
			showAlert('Error occured. Try again', 'danger');
			return ;
		}

		let player1 = false;
		let player2 = false;
		auth1Form.addEventListener('submit', async (event) => {
			event.preventDefault();
			const username = document.getElementById('username').value;
			const password = document.getElementById('password').value;

			try
			{
				const csrftoken = getCookie('csrftoken');
				const response = await fetch('http://localhost:8000/check_game_password/',
				{
					method: 'POST',
					credentials: 'include',
					headers: { 'Content-Type' : 'application/json', 'X-CSRFToken': csrftoken  },
					body: JSON.stringify({ check_user: username, check_pass: password })
				});
		
				if (response.ok)
				{
					const data = await response.json();
					console.log(data);
					player1 = true;
				}
				else
				{
					const errorData = await response.json();
					console.error(errorData);
				}
			}
			catch (error)
			{
				console.error(error);
			}
		});

		auth2Form.addEventListener('submit', async (event) => {
			event.preventDefault();
			const username = document.getElementById('username').value;
			const password = document.getElementById('password').value;

			try
			{
				const csrftoken = getCookie('csrftoken');
				const response = await fetch('http://localhost:8000/check_game_password/',
				{
					method: 'POST',
					credentials: 'include',
					headers: { 'Content-Type' : 'application/json', 'X-CSRFToken': csrftoken  },
					body: JSON.stringify({ check_user: username, check_pass: password })
				});
		
				if (response.ok)
				{
					const data = await response.json();
					console.log(data);
					player2 = true;
				}
				else
				{
					const errorData = await response.json();
					console.error(errorData);
				}
			}
			catch (error)
			{
				console.error(error);
			}
		});

		const continueButton = document.getElementById('continue-btn');
		if (continueButton) {
			continueButton.addEventListener('click', () => {
				if (player1 === true && player2 === true)
					console.log('open game');
				else
					console.log('authenticate players');
			});
		}



	} else {
		console.error('Content element not found');
	}


	
	// You can send a request to the server to start the game, or navigate to a game page
}
	

// Function to start a match
async function startMatch(matchId) {
    try {
        const response = await fetch(`http://localhost:8000/start_match/${matchId}/`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Failed to start match:', response.statusText);
            showAlert('Error occurred starting the match. Try again.', 'danger');
            return;
        }

        showAlert('Match started successfully!', 'success');
        loadTournamentLobby(); // Reload the lobby to update the match status
    } catch (error) {
        console.error('Error starting match', error);
        showAlert('Error occurred with match start. Try again.', 'danger');
    }
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
