import { updateContent } from "../i18n";
import { showAlert } from "../index.js";

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

		const publicProfileHTML = `
			<div class="container mt-5">
						<div class="row">
							<div class="col-md-4">
								<div class="card text-center profile-card">
								<div class="card-body">
									
				
				
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
										<h5 class="card-title"></h5>
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
											</tbody>
										</table>
										<button type="submit" id="match-history-button" class="btn btn-info" translate="match history"></button>

									</div>
								</div>
							</div>
							
						
						</div>
					</div>
		`;
		const contentElement = document.getElementById('content');

		if (contentElement) {
			contentElement.innerHTML = publicProfileHTML;
			updateContent();
		}
		else
		{
			console.error('Content element not found');
		}	
	}
		
		else
		{
			const errorData = await response.json();
			console.error('Adding friend failed');
			showAlert('errorData', 'danger');
		}

}