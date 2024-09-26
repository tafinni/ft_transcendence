import { getCookie } from "./csrf";
import { updateContent } from "./i18n";
import { loadContent } from "./router";
import { showAlert } from "./index.js";
import { startGame } from "./game.js";


export async function loadTournamentLobby() {
	try
	{
		const response = await fetch(`https://localhost:1443/api/is_user_in_tournament/`, {
			method: 'GET',
			credentials: 'include',
		});

		if (!response.ok) {
			console.error('Failed:', response.statusText);
			showAlert('Error occurred. Try again.', 'danger');
			return;
		}

		const data = await response.json();
		const tournamentID = data.tournament_id
		
		const reply = await fetch(`https://localhost:1443/api/get_tournament_matches/?tournament_id=${data.tournament_id}`, {
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
			showAlert(newData.message, 'warning');
			loadContent('home');
			return ;
		}
		console.log('testing: ', newData);

		const matchesHTML = newData.matches.map(match => `
			<div class="match-container mb-3">
				<!-- <p style="color: white"><strong>Round ${match.round_number}, Group ${match.group_number}</strong></p> -->
				<p style="color: white">${match.player_1} vs ${match.player_2}</p>
				${match.result === 'Pending' ? 
					`<button type="button" class="btn btn-primary start-game-btn" data-round="${match.round_number}" data-group="${match.group_number}" translate="start game"></button>` 
					: 
					`<button type="button" class="btn btn-secondary" disabled>${match.result === 'in_progress' ? 'In Progress' : 'Completed'}</button>`
				}			</div>
		`).join('');

		const lobbyHTML = `
			<div class="container mt-5">
				${matchesHTML}
				<div class="float-right">
					<button type="button" id="cancel-tournament-btn" class="btn btn-danger w-100 mt-3" translate="cancel tournament"></button>
				</div>
			</div>
		`;

		const contentElement = document.getElementById('content');
		if (contentElement)
		{
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
			const cancelTournamentButton = document.getElementById('cancel-tournament-btn');
			cancelTournamentButton.addEventListener('click', () => {
				cancelTournament(tournamentID);
			});
		}
		else
		{
			console.error('Content element not found');
		}
	}
	catch (error)
	{
		console.error('Error with tournament lobby', error);
		showAlert('Error occurred with tournament lobby. Try again.', 'danger');
		loadContent('home');
	}
}

async function playerAuth(tournament_id, round, group) {
	console.log(`Starting game for tournament ${tournament_id}, round ${round}, group ${group}`);

	try
	{
		
		const response = await fetch(`https://localhost:1443/api/?tournament_id=${tournament_id}&group=${group}`, {
			method: 'GET',
			credentials: 'include',
		});

		if (!response.ok) {
			console.error('Failed fetching match details:', response.statusText);
			showAlert('Error occurred fetching match details. Try again.', 'danger');
			return;
		}
		
		const playerData = await response.json();
		console.log('player names: ', playerData);
		const startHTML = `
		<div class="container-fluid d-flex flex-column align-items-center">
			<div class="d-flex justify-content-center mb-3" style="margin-top: 3%">
				<div class="card p-4" style="width: 20rem; margin-right: 5%;">
					<h3 class="card-title text-center mb-4 d-flex justify-content-center align-items-center">
						<span>${playerData.player1.display_name}</span>
						<span id="success-1" class="bi bi-check-circle ms-2" style="margin-left: 10px; color: green; display: none;"></span>						
						<span id="error-message-1" class="bi bi-x-circle ms-2" style="margin-left: 10px; color: red; display: none;"></span>

					</h3>
					<form id="auth1-form" method="POST">
						<div class="form-group mb-3">
							<label for="username" class="form-label" translate="username"></label>
							<input type="text" class="form-control" id="username" value="${playerData.player1.username}" readonly>
						</div>
						<div class="form-group mb-3">
							<label for="password" class="form-label" translate="password"></label>
							<input type="password" class="form-control" id="password" required>
						</div>
						<button type="submit" class="btn btn-primary w-100" translate="authenticate"></button>
					</form>
				</div>
	
				<div class="card p-4" style="width: 20rem;">
					<h3 class="card-title text-center mb-4 d-flex justify-content-center align-items-center">
						<span>${playerData.player2.display_name}</span>
						<span id="success-2" class="bi bi-check-circle ms-2" style="margin-left: 10px; color: green; display: none;"></span>
						<span id="error-message-2" class="bi bi-x-circle ms-2" style="margin-left: 10px; color: red; display: none;"></span>
					</h3>


					<form id="auth2-form" method="POST">
						<div id="error-message-2" class="text-danger mb-3" style="display: none;"></div>
						<div class="form-group mb-3">
							<label for="username" class="form-label" translate="username"></label>
							<input type="text" class="form-control" id="usernameRight" value="${playerData.player2.username}" readonly>
						</div>
						<div class="form-group mb-3">
							<label for="password2" class="form-label" translate="password"></label>
							<input type="password" class="form-control" id="password2" required>
						</div>
						<button type="submit" class="btn btn-primary w-100" translate="authenticate"></button>
					</form>
				</div>
			</div>
	
			<div class="d-flex justify-content-center mt-3">
				<button type="button" id="continue-btn" class="btn btn-warning btn-lg" translate="continue"></button>
z			</div>
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
			let nameLeft;
			let player2 = false;
			let nameRight;
			const errorMessage1 = document.getElementById('error-message-1');
			const errorMessage2 = document.getElementById('error-message-2');
			const success1 = document.getElementById('success-1');
			const success2 = document.getElementById('success-2');

			auth1Form.addEventListener('submit', async (event) => {
				event.preventDefault();
				const username = document.getElementById('username').value;
				const password = document.getElementById('password').value;

				try
				{
					const csrftoken = getCookie('csrftoken');
					const response = await fetch('https://localhost:1443/api/check_game_password/',
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
						nameLeft = username;
						success1.style.display = 'block';
						errorMessage1.style.display = 'none';
					}
					else
					{
						const errorData = await response.json();
						console.error(errorData);
						//errorMessage1.textContent = errorData.error;
						errorMessage1.style.display = 'block';
						player1 = false;
						success1.style.display = 'none';
					}
				}
				catch (error)
				{
					console.error(error);
				}
			});

			auth2Form.addEventListener('submit', async (event) => {
				event.preventDefault();
				const username = document.getElementById('usernameRight').value;
				const password = document.getElementById('password2').value;

				try
				{
					const csrftoken = getCookie('csrftoken');
					const response = await fetch('https://localhost:1443/api/check_game_password/',
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
						nameRight = username;
						success2.style.display = 'block';
						errorMessage2.style.display = 'none';
					}
					else
					{
						const errorData = await response.json();
						console.error(errorData);
						errorMessage2.style.display = 'block';
						player2 = false;
						success2.style.display = 'none';
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
					{
						console.log("Users are", nameLeft, "and", nameRight);
						loadContent('tourney', 0, 0, 0, nameLeft, nameRight, false);
					}

				});
			}
		}
		else
		{
			console.error('Content element not found');
		}
	}
	catch (error)
	{
		console.error(error);
	}
}
	



export async function tournamentSetUp(count) {
	let tournamentID = -1;

	const csrftoken = getCookie('csrftoken');
	try
	{
		const reply = await fetch('https://localhost:1443/api/create_tournament/',
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
			showAlert('Error during tournament setup . Try again.', 'danger');
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
				const response = await fetch('https://localhost:1443/api/start_tournament/',
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
				const response = await fetch('https://localhost:1443/api/invite_to_tournament/',
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
		const response = await fetch('https://localhost:1443/api/cancel_tournament/',
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
			console.error('Cancelling tournament', errorData);
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
		const response = await fetch(`https://localhost:1443/api/list_invited_participants/?tournament_id=${tournamentID}`, {
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