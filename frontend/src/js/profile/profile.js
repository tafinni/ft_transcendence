import { loadContent } from "../router.js";
import { editInfo, editAvatar } from "./userInfo.js";
import { changePassword } from "./password.js";
import { displayFriends, displayFriendRequests, addFriend } from "./friends.js";
import { updateContent } from "../i18n.js";
import { showAlert } from "../index.js";

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
		buttonListener();
	}
	else
	{
		console.error('Content element not found');
	}
}


async function matchHistory () {
	try
	{
		const response = await fetch('http://localhost:8000/match_history/', {
			method: 'GET',
			credentials: 'include'
		});
		if (!response.ok)
		{
			console.error('Failed loading match history:', response.statusText);
			showAlert('Error occurred loading match history. Try again.', 'danger');
			return ;
		}

		const data = await response.json();
		const matches = data.matches;

		console.log('matchHistory called', data);

		const matchHistoryHTML = `
			<div class="container mt-5">
				<div class="row">
					<div class="col-md-12">
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">
									<span translate="match history"></span>
								</h5>
								<table class="table table-striped">
									<thead>
										<tr>
											<th translate="date"></th>
											<th translate="opponent"></th>
											<th translate="result"></th>
										</tr>
									</thead>
									<tbody>
                            			${matches.map(matchData => {
                                        	const localDate = new Date(matchData.date).toLocaleString(); 
                                        	return `
                                            	<tr>
                                            	    <td>${localDate}</td>
                                            	    <td>${matchData.opponent}</td>
                                            	    <td>${matchData.result}</td>
                                            	</tr>
                                            	`;
                                        }).join('')}
									</tbody>
								</table>
								<button type="button" id="back-button" class="btn btn-primary" translate="back"></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		const contentElement = document.getElementById('content');
		if (contentElement)
		{
			contentElement.innerHTML = matchHistoryHTML;
			updateContent();
			backButtonListener();
		}
		else
		{
			console.error('Content element not found');
		}
	}
	catch (error)
	{
		console.error('Error fetching match history:', error);
		showAlert('Error fetching match history. Try Again.', 'danger');
		loadContent('profile');
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



