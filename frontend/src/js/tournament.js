import { getCookie } from "./csrf";
import { updateContent } from "./i18n";
import { loadContent } from "./router";
import { showAlert } from "./index.js";

let players = [];
const maxPlayers = 4;

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
	let setUpHTML = `
	<div class="card-body d-flex flex-column align-items-center">
	<div class="card p-4" style="width: 20rem;">
    <button type="button" id="cancel-button" class="btn btn-link" translate="back">Back</button>
    <h3 class="card-title text-center mb-4">Invite to tournament</h3>
    
    <div id="players-container">
        <!-- Players will be dynamically added here -->
    </div><br>

    <form id="add-player-form">
        <div id="error-message" class="text-danger mb-3" style="display: none;"></div>
        <div class="form-group mb-3">
            <input type="text" class="form-control" id="new-player" placeholder="Enter player username" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Add Player</button>
    </form>

    <button type="button" id="finish-invites-btn" class="btn btn-success w-100 mt-3" disabled>Finish Inviting</button>
	</div></div>`;
	const contentElement = document.getElementById('content');
		if (contentElement)
			contentElement.innerHTML = setUpHTML;
		else
			console.error('Content element not found');
			
			document.getElementById('add-player-form').addEventListener('submit', async (e) => {
				e.preventDefault();
				
				const newPlayerInput = document.getElementById('new-player');
				const username = newPlayerInput.value.trim();
			
				if (!username) return;
			
				// Simulate API call to check validity
				try {
					await validateUsername(username);
					
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
					});
			
				} catch (error) {
					showError(error.message);
				}
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