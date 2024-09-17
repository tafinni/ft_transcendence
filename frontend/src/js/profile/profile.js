import { loadContent } from "../router.js";
import { editInfo, editAvatar } from "./userInfo.js";
import { changePassword } from "./password.js";
import { displayFriends, displayFriendRequests, addFriend } from "./friends.js";
import { updateContent } from "../i18n.js";
import { showAlert } from "../index.js";
import { getCookie } from "../csrf.js";
import { matchHistory } from "./stats.js";
import { loadChartOne } from "./stats.js";
import { loadChartTwo } from "./stats.js";

export async function loadProfile() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok)
	{
		console.error('Failed loading profile:', response.statusText);
		showAlert('Error occured loading profile. Try Again.', 'danger');
		return ;
	}

	const userData = await response.json();

	const winPercentage = userData.wins + userData.losses > 0 ? ((userData.wins / (userData.wins + userData.losses)) * 100).toFixed(0) : 0;

	const profileHTML = `
		<div class="container mt-5">
			<div class="row">
				<div class="col-md-4">
					<div class="card text-center profile-card">
						<div class="card-body">
		                	<div class="d-flex justify-content-end mb-1">
								<button type="submit" id="edit-avatar-button" class="btn btn-primary float-right">
									<i class="bi bi-pencil-fill"></i>
								</button>
							</div>
							<div>
								<img src="http://localhost:8000/${userData.avatar}" class="rounded-circle img-fluid mb-3" alt="Avatar" style="width: 150px; height: 150px;">							
        	                </div>
							<h4 class="card-title">${userData.display_name}</h4>
							<p class="text-muted">@${userData.username}</p>
						</div>
					</div>
				</div>
				
				<div class="col-md-4">
					<div class="card profile-card">
						<div class="card-body">
							<h5 class="card-title">
								<span translate="stats"></span>
							</h5>
							<table class="table table-striped">
								<tbody>
									<tr>
										<th scope="row" translate="wins"></th>
										<td>${userData.wins}</td>
									</tr>
									<tr>
										<th scope="row" translate="losses"></th>
										<td>${userData.losses}</td>
									</tr>
									<tr>
										<th scope="row" translate="win %"></th>
										<td>${winPercentage}%</td>
									</tr>
								</tbody>
							</table>
							<button type="submit" id="match-history-button" class="btn btn-info" translate="match history"></button>
							<button type="button" id="chart-one-button" class="btn btn-warning">1</button>
							<button type="button" id="chart-two-button" class="btn btn-warning">2</button>


						</div>
					</div>
				</div>

				<div class="col-md-4">
					<div class="card profile-card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center mb-4">
								<h5 class="card-title mb-0">
									<span translate="friends"></span>
								</h5>
								<div class="float-right">
									<button type="submit" id="add-friend-button" class="btn btn-success" >
										<i class="bi bi-person-plus-fill" style="font-size: 120%"></i>
									</button>
								</div>
							</div>
							<ul id="friends-list" class="list-group">
								<!-- Friends here dinamically -->
							</ul>
							<hr></hr>
							<h5>
								<span translate="requests"></span>
							</h5>
							<ul id="friend-requests" class="list-group">
								<!-- Friends here dinamically -->
							</ul>
						</div>
					</div>
				</div>

				<div class="col-md-4">
					<div class="card profile-card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center mb-4">
								<h5 class="card-title mb-0">
									<span translate="game invites"></span>
								</h5>
							</div>
							<ul id="game-invite-list" class="list-group">
								<!-- Game invites here dinamically -->
							</ul>
							<hr></hr>
						</div>
					</div>
				</div>
				
				<div class="col-md-8">
					<div class="card profile-card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center mb-4">
								<h4 class="card-title mb-0">
									<span translate="user info"></span>
								</h4>
								<button type="submit" id="edit-button" class="btn btn-primary">
									<i class="bi bi-pencil-fill"></i>
								</button>
							</div>
							<table class="table table-striped">
								<tbody>
									<tr>
										<th scope="row" translate="first name"></th>
										<td>${userData.first_name}</td>
									</tr>
									<tr>
										<th scope="row" translate="last name"></th>
										<td>${userData.last_name}</td>
									</tr>
									<tr>
										<th scope="row" translate="display name"></th>
										<td>${userData.display_name}</td>
									</tr>
									<tr>
										<th scope="row" translate="username"></th>
										<td>${userData.username}</td>
									</tr>
									<tr>
										<th scope="row" translate="language"></th>
										<td>${userData.preferred_language}</td>
									</tr>
								</tbody>
							</table>
							<button type="submit" id="change-password-button" class="btn btn-link float-right" translate="change password"></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

	const contentElement = document.getElementById('content');
	if (contentElement)
	{
		contentElement.innerHTML = profileHTML;
		updateContent();
		await displayFriends();
		await displayFriendRequests();
		await displayGameInvites();
		buttonListener();

	}
	else
	{
		console.error('Content element not found');
	}
}

async function displayGameInvites() {
	const response = await fetch('http://localhost:8000/profile/',
	{
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok)
	{
		console.error('Failed loading profile:', response.statusText);
		showAlert('Error occured displaying friend requests. Try again.', 'danger');
		return ;
	}

	const data = await response.json();
	console.log('display game invites called', data); // Debugging

	const invites = data.tournament_invitations;

	const gameInviteContainer = document.getElementById('game-invite-list');
	gameInviteContainer.innerHTML = '';

	invites.forEach((invite, index) => {
		const colors = ['#f0f0f0', '#fffff'];

		const inviteItem = document.createElement('div');
		inviteItem.className = 'friend-item';
		inviteItem.style.display = 'flex';
        inviteItem.style.alignItems = 'center';
        inviteItem.style.marginBottom = '10px';

		inviteItem.style.backgroundColor = colors[index % colors.length];
		inviteItem.style.padding = '10px';

		const invitorName = document.createElement('span');
		invitorName.className = 'friend-name';
		invitorName.textContent = invite.tournament_initiator;
        invitorName.style.flexGrow = '1';

		// Create Accept button
        const acceptButton = document.createElement('button');
        acceptButton.className = 'btn btn-success btn-sm';
		acceptButton.innerHTML = '<i class="bi bi-check-lg"></i>';
	    acceptButton.style.marginRight = '10px';
        acceptButton.onclick = () => acceptInvite(invite.tournament_initiator);

        // Create Deny button
        const denyButton = document.createElement('button');
        denyButton.className = 'btn btn-danger btn-sm';
		denyButton.innerHTML = '<i class="bi bi-x-lg"></i>';
        denyButton.onclick = () => declineInvitation(invite.tournament_initiator);

		inviteItem.appendChild(invitorName);
        inviteItem.appendChild(acceptButton);
        inviteItem.appendChild(denyButton);		

		gameInviteContainer.appendChild(inviteItem);
	});
}

async function acceptInvite(initiator_username) {
	try
	{
		console.log('initiator username: ', initiator_username);
		const csrftoken = getCookie('csrftoken');
		const response = await fetch('http://localhost:8000/accept_tournament_invitation/',
		{
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type' : 'application/json', 'X-CSRFToken': csrftoken },
			body: JSON.stringify({ initiator_username })
		});

		if (response.ok)
		{
			const data = await response.json();
			console.log('Invitation accepted succesfully');
			showAlert(data.message, 'success');
			loadContent('profile');
		}
		else
		{
			const errorData = await response.json();
			console.error('Accepting invitation failed', errorData);
			showAlert(errorData.error, 'danger');
			loadContent('profile');
		}
	}
	catch (error)
	{
		console.error('Error during accepting game invite', error);
		showAlert('Error occured when accepting invite. Try again.', 'danger');
	}
}

async function declineInvitation(initiator_username) {
	
	try
	{
		const csrftoken = getCookie('csrftoken');
		const response = await fetch('http://localhost:8000/decline_tournament_invitation/',
		{
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type' : 'application/json', 'X-CSRFToken': csrftoken  },
			body: JSON.stringify({ initiator_username })
		});

		if (response.ok)
		{
			const data = await response.json();
			console.log('Game invite declined succesfully');
			showAlert(data.message, 'success');
			loadContent('profile');
		}
		else
		{
			const errorData = await response.json();
			console.error('Declining game invite failed');
			showAlert(errorData.error, 'danger');
			loadContent('profile');
		}
	}
	catch (error)
	{
		console.error('Error during declining game invite', error);
		showAlert('Error occured when declining game invite. Try again.', 'danger');
	}
}


export async function backButtonListener() {
	const backButton = document.getElementById('back-button');
	if (backButton)
	{
		backButton.addEventListener('click', () => {
			console.log('Clicked back button');
			loadContent('profile');
		});
	}
}

export async function buttonListener () {
    const editButton = document.getElementById('edit-button');
	const pwdButton = document.getElementById('change-password-button');
	const addFriendButton = document.getElementById('add-friend-button');
    const matchHistoryButton = document.getElementById('match-history-button');
	const editAvatarButton = document.getElementById('edit-avatar-button');

	const chartOneButton = document.getElementById('chart-one-button');
	if (chartOneButton)
	{
		chartOneButton.addEventListener('click', () => {
			console.log('Clicked chart one button');
			loadChartOne();
		});
	}
	const chartTwoButton = document.getElementById('chart-two-button');
	if (chartTwoButton)
	{
		chartTwoButton.addEventListener('click', () => {
			console.log('Clicked chart two button');
			loadChartTwo();
		});
	}

	if (editButton) {
   		editButton.addEventListener('click', () => {
        	editInfo();
    });
	}

	if (editAvatarButton) {
		editAvatarButton.addEventListener('click', () => {
			editAvatar();
	});
	}

	if (pwdButton) {
		pwdButton.addEventListener('click', () => {
			changePassword();
	});
	}

	if (addFriendButton) {
		addFriendButton.addEventListener('click', () => {
			addFriend();
	});
	}

	if (matchHistoryButton) {
		matchHistoryButton.addEventListener('click', () => {
			matchHistory();
	});
	}

}



