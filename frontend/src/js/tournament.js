import { getCookie } from "./csrf";
import { updateContent } from "./i18n";
import { loadContent } from "./router";
import { showAlert } from "./index.js";

let players = [];

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

				<p>You - accepted</p>
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

				<button type="button" id="finish-invites-btn" class="btn btn-success w-100 mt-3" disabled translate="start tournament"></button>
			</div>
		</div>`;

	const contentElement = document.getElementById('content');
	if (contentElement)
	{
		contentElement.innerHTML = setUpHTML;
		updateContent();
	}
	else
		console.error('Content element not found');

	const cancelButton = document.getElementById('cancel-button');
	cancelButton.addEventListener('click', () => {
		loadContent('home');
	});

	const refreshButton = document.getElementById('refresh-button');
	refreshButton.addEventListener('click', () => {
		//tournamentSetUp(count);
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
				players.push({ username, status: 'pending' });
				updatePlayersList();
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
		document.getElementById('finish-invites-btn').disabled = players.length >= count - 1;

/* 			await validateUsername(username);
			
			// Add player to list
			players.push({ username, status: 'pending' });
			updatePlayersList();
			
			// Clear input field
			newPlayerInput.value = '';
			
			// Disable finish button if max players reached
			document.getElementById('finish-invites-btn').disabled = players.length >= maxPlayers;
			
			// Send invitation (simulated)
			sendInvitation(username).then(status => {
				updatePlayerStatus(username, status);
			}); */
	

	});
}

function validateUsername(username) {
    // Simulate API call to validate username
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Replace this with actual API call
            if (username.length > 3 && username.length < 20) {
                resolve();
            } else {
                reject('Username must be between 4 and 19 characters');
            }
        }, 1000);
    });
}

function sendInvitation(username) {
    // Simulate sending invitation
    return new Promise((resolve) => {
        setTimeout(() => {
            // Replace this with actual API call
            const status = Math.random() < 0.7 ? 'accepted' : 'declined';
            resolve(status);
        }, 2000);
    });
}

function updatePlayersList() {
    const playersContainer = document.getElementById('players-container');
    playersContainer.innerHTML = '';

    players.forEach(player => {
        const playerEntry = document.createElement('div');
        playerEntry.className = 'player-entry';

        const usernameSpan = document.createElement('span');
        usernameSpan.className = 'username';
        usernameSpan.textContent = player.username;

        const statusSpan = document.createElement('span');
        statusSpan.className = 'status';
        statusSpan.textContent = ` - ${player.status}`;

        playerEntry.appendChild(usernameSpan);
        playerEntry.appendChild(statusSpan);

        playersContainer.appendChild(playerEntry);
    });
}

function updatePlayerStatus(username, status) {
    const index = players.findIndex(p => p.username === username);
    if (index !== -1) {
        players[index].status = status;
        updatePlayersList();
    }
}

function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
    setTimeout(() => {
        errorMessageDiv.style.display = 'none';
    }, 3000);
}