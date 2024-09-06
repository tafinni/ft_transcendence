import { updateContent } from "../i18n";
import { showAlert } from "../index.js";
import { loadContent } from "../router.js";
import { backButtonListener } from "./profile.js";

export async function loadPublicProfile(user_username) {
	console.log('clicked public profile');
	const response = await fetch('http://localhost:8000/public_profile/',
	{
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type' : 'application/json' },
		body: JSON.stringify({ user_username })
	});

	if (response.ok)
	{
		const userData = await response.json();

		const winPercentage = userData.wins + userData.losses > 0 ? ((userData.wins / (userData.wins + userData.losses)) * 100).toFixed(0) : 0;

		const publicProfileHTML = `
			<div class="container mt-5">
				<div class="row">
					<div class="col-md-5 mx-auto">
						<div class="card text-center profile-card">
							<div class="card-body">
								<button type="button" id="back-button" class="btn btn-link float-left" translate="back"></button>
								<div>
									<img src="http://localhost:8000/${userData.avatar}" class="rounded-circle img-fluid mb-3" alt="Avatar" style="width: 150px; height: 150px;">							
								</div>
								<h4 class="card-title">${userData.display_name}</h4>
									<p class="text-muted">@${userData.username}</p>
							</div>
						
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
								<button type="button" id="match-history-button" class="btn btn-info" translate="match history"></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
		const contentElement = document.getElementById('content');

		if (contentElement)
		{
			contentElement.innerHTML = publicProfileHTML;
			updateContent();

			const publicMatchHistoryButton = document.getElementById('match-history-button');
			if (publicMatchHistoryButton) {
				publicMatchHistoryButton.addEventListener('click', () => {
					publicMatchHistory(user_username);
			});
			}
			backButtonListener();
		}
		else
		{
			console.error('Content element not found');
		}	
	}		
	else
	{
		console.error('Profile loading failed');
		showAlert('Error loading profile.', 'danger');
	}
}

async function publicMatchHistory(user_username) {

	console.log('user username:', user_username);
	try
	{
		const response = await fetch(`http://localhost:8000/public_match_history/?user_username=${user_username}`, {
			method: 'GET',
			credentials: 'include',  // still keep credentials for user session
		});
		if (!response.ok) {
			console.error('Failed loading match history:', response.statusText);
			showAlert('Error occurred loading match history. Try again.', 'danger');
			return;
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

			const backButton = document.getElementById('back-button');
			if (backButton)
			{
				backButton.addEventListener('click', () => {
					console.log('Clicked back button');
					loadPublicProfile(user_username);
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
		console.error('Error fetching match history:', error);
		showAlert('Error fetching match history. Try Again.', 'danger');
		loadContent('profile');
	}
}