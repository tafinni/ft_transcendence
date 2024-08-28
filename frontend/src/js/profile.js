import { loadContent } from "./router";

export async function loadProfile() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const userData = await response.json();

	return `
		<div class="container mt-5">
			<div class="row">
				<div class="col-md-4">
					<div class="card text-center">
						<div class="card-body">
						<img src="http://localhost:8000/${userData.avatar}" class="rounded-circle img-fluid mb-3" alt="Avatar" style="width: 150px; height: 150px;">							
                        <h4 class="card-title">${userData.display_name}</h4>
							<p class="text-muted">@${userData.username}</p>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Friends</h5>
							<button type="submit" id="add-friend-button" class="btn btn-primary">Add friend</button>
							<button type="submit" id="remove-friend-button" class="btn btn-primary">Remove friend</button>
							<ul id="friends-list" class="list-group">
								<!-- Friends here dinamically -->
							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Stats</h5>
								<table class="table table-striped">
								<tbody>
									<tr>
										<th scope="row">Wins</th>
										<td>${userData.wins}</td>
									</tr>
									<tr>
										<th scope="row">Losses</th>
										<td>${userData.losses}</td>
									</tr>
								</tbody>
							</table>
							<button type="submit" id="match-history-button" class="btn btn-primary">Match history</button>

						</div>
					</div>
				</div>
				<div class="col-md-8">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title">Personal Info</h4>
							<table class="table table-striped">
								<tbody>
									<tr>
										<th scope="row">First Name</th>
										<td>${userData.first_name}</td>
									</tr>
									<tr>
										<th scope="row">Last Name</th>
										<td>${userData.last_name}</td>
									</tr>
									<tr>
										<th scope="row">Display Name</th>
										<td>${userData.display_name}</td>
									</tr>
									<tr>
										<th scope="row">Username</th>
										<td>${userData.username}</td>
									</tr>
								</tbody>
							</table>
							<button type="submit" id="change-password-button" class="btn btn-primary">Change password</button>
		
							<button type="submit" id="edit-button" class="btn btn-primary">Edit info</button>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

}


export async function editInfo() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const userData = await response.json();

	return `
       <div class="container mt-5">
            <div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
            
				<h2>Edit Profile Information</h2>
				<form id="edit-info-form">
					<div class="form-group">
						<label for="first_name">First Name</label>
						<input type="text" id="first_name" class="form-control" value="${userData.first_name}" required>
					</div>
					<div class="form-group">
						<label for="last_name">Last Name</label>
						<input type="text" id="last_name" class="form-control" value="${userData.last_name}" required>
					</div>
					<div class="form-group">
						<label for="display_name">Display Name</label>
						<input type="text" id="display_name" class="form-control" value="${userData.display_name}" required>
					</div>
					<div class="form-group">
						<label for="avatar">Change Avatar</label>
						<input type="file" id="avatar" class="form-control">
					</div>
					<button type="submit" class="btn btn-primary mt-3">Save Changes</button>
					<button type="button" id="cancel-button" class="btn btn-link" >Cancel</button>
				</form>
			</div>
        </div>
    `;
}

export async function saveInfo() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

    console.log('saveInfo called'); // Debugging

    const editInfoForm = document.getElementById('edit-info-form');
    if (!editInfoForm) { console.error('Edit form not found'); return;}

   const cancelButton = document.getElementById('cancel-button');

    editInfoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

		const first_name = document.getElementById('first_name').value;
		const last_name = document.getElementById('last_name').value;
        const display_name = document.getElementById('display_name').value;

        console.log('Edit info form submitted'); // Debugging

        try 
        {
            const response = await fetch('http://localhost:8000/update_profile/',
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ first_name, last_name, display_name })
            });

            if (response.ok)
            {
                const data = await response.json();
                console.log('Edit info successful'); // Debugging
                alert(data.message);
                loadContent('profile');
            }
            else
            {
                const errorData = await response.json();
                console.error('Edit info failed', errorData);
            }
        }
        catch (error)
        {
            console.error('Error during edit info', error);
        }
    });

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled edit info'); // Debugging
		loadContent('profile');
	});
}

export async function changePassword() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	return `
	<div class="container mt-5">
        <div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">

		 <h2>Change password</h2>
		 <form id="change-password-form">
			 <div class="form-group">
				 <label for="current_password">Old password</label>
				 <input type="text" id="current_password" class="form-control" required>
			 </div>
			 <div class="form-group">
				 <label for="new_password">New password</label>
				 <input type="text" id="new_password" class="form-control" required>
			 </div>
			 <div class="form-group">
				 <label for="confirm_password">Type new password again</label>
				 <input type="text" id="confirm_password" class="form-control" required>
			 </div>
			 <button type="submit" class="btn btn-primary mt-3">Save new password</button>
			 <button type="button" id="cancel-button" class="btn btn-link" >Cancel</button>
		 </form>
		 </div>
	 </div>
 `;

}

export async function savePassword() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

    console.log('savePassword called'); // Debugging

	const changePasswordForm = document.getElementById('change-password-form');
	if (!changePasswordForm) { console.error('Change password form not found'); return ; }

	const cancelButton = document.getElementById('cancel-button');

	changePasswordForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const current_password = document.getElementById('current_password').value;
		const new_password = document.getElementById('new_password').value;
		const confirm_password = document.getElementById('confirm_password').value;

		console.log('Change password form submitted');

		try
		{
            const response = await fetch('http://localhost:8000/change_password/',
				{
					method: 'POST',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ current_password, new_password, confirm_password })
				});
			


			if (response.ok)
			{
				const data = await response.json();
				console.log('Password change succesfull'); // Debugging
				alert(data.message);
				loadContent('profile');
			}
			else
			{
				const errorData = await response.json();
				console.error('Password change failed');
				alert(errorData.message);
				loadContent('profile');

			}
		}
		catch (error)
		{
			console.error('Error during change password', error);
			alert('Error occured when changing the password. Try again.')
		}
	});

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled change password'); // Debugging
		loadContent('profile');
	});
}

export async function addFriend() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	return `
	<div class="container mt-5">
        <div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
		 <form id="add-friends-form">
			 <div class="form-group">
				 <label for="friends-name">Friend's name</label>
				 <input type="text" id="new-friend" class="form-control" required>
			 </div>
			 <button type="submit" class="btn btn-primary mt-3">Add friend</button>
			 <button type="button" id="cancel-button" class="btn btn-link" >Cancel</button>
		 </form>
		 </div>
	 </div>
 `;
}



export async function saveFriend() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

    console.log('saveFriend called'); // Debugging

	const addFriendsForm = document.getElementById('add-friends-form');
	if (!addFriendsForm) { console.error('Add friends form not found'); return ; }

	const cancelButton = document.getElementById('cancel-button');

	addFriendsForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const friend_username = document.getElementById('new-friend').value;
		
		console.log('Add friends form submitted');

		try
		{
			const response = await fetch('http://localhost:8000/add_friend/',
				{
					method: 'POST',
					credentials: 'include',
					headers: { 'Content-Type' : 'application/json' },
					body: JSON.stringify({ friend_username })
				});

			if (response.ok)
			{
				const data = await response.json();
				console.log('Friend added succesfully');
				alert(data.message);
				loadContent('profile');
			}
			else
			{
				const errorData = await response.json();
				console.error('Adding friend failed');
				alert(errorData);
				loadContent('profile');
			}
		}
		catch (error)
		{
			console.error('Error during adding friend', error);
			alert('Error occured when adding friend. Try again.');
		}
	});

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled add friend'); // Debugging
		loadContent('profile');
	});
}

export async function removeFriend() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	return `
	<div class="container mt-5">
        <div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
		 <form id="remove-friends-form">
			 <div class="form-group">
				 <label for="friends-name">Friend's name</label>
				 <input type="text" id="remove-friend" class="form-control" required>
			 </div>
			 <button type="submit" class="btn btn-primary mt-3">Remove friend</button>
			 <button type="button" id="cancel-button" class="btn btn-link" >Cancel</button>
		 </form>
		 </div>
	 </div>
 `;

}

export async function saveRemovedFriend() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

    console.log('removeFriend called'); // Debugging

	const removeFriendsForm = document.getElementById('remove-friends-form');
	if (!removeFriendsForm) { console.error('Remove friends form not found'); return ; }

	const cancelButton = document.getElementById('cancel-button');

	removeFriendsForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const friend_username = document.getElementById('remove-friend').value;
		
		console.log('Remove friend form submitted');

		try
		{
			const response = await fetch('http://localhost:8000/remove_friend/',
				{
					method: 'POST',
					credentials: 'include',
					headers: { 'Content-Type' : 'application/json' },
					body: JSON.stringify({ friend_username })
				});

			if (response.ok)
			{
				const data = await response.json();
				console.log('Friend removed succesfully');
				alert(data.message);
				loadContent('profile');
			}
			else
			{
				const errorData = await response.json();
				console.error('Removing friend failed');
				alert(errorData);
				loadContent('profile');
			}
		}
		catch (error)
		{
			console.error('Error during removing friend', error);
			alert('Error occured when removing friend. Try again.');
		}
	});

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled remove friend'); // Debugging
		loadContent('profile');
	});
}

export async function matchHistory () {
	const response = await fetch('http://localhost:8000/match_history/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const matchData = await response.json();

	return `
	<div class="container mt-5">
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Match history</h5>
						<table class="table table-striped">
						<tbody>
							<tr>
								<th scope="row">Date</th>
								<td>${matchData.date}</td>
							</tr>
							<tr>
								<th scope="row">Against</th>
								<td>${matchData.opponent}</td>
							</tr>
							<tr>
								<th scope="row">Result</th>
								<td>${matchData.result}</td>
							</tr>
						</tbody>
					</table>
					<button type="submit" id="back-button" class="btn btn-primary">Back</button>

				</div>
			</div>
		</div>
	</div>
	`;


}

export async function backButtonListener() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

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
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

    const editButton = document.getElementById('edit-button');
	const pwdButton = document.getElementById('change-password-button');
	const addFriendButton = document.getElementById('add-friend-button');
	const removeFriendButton = document.getElementById('remove-friend-button');
    const matchHistoryButton = document.getElementById('match-history-button');

    editButton.addEventListener('click', () => {
        console.log('Clicked edit button'); // Debugging
        loadContent('editInfo');
    });

	pwdButton.addEventListener('click', () => {
		console.log('Clicked change password button'); // Debugging
		loadContent('changePassword');
	});

	addFriendButton.addEventListener('click', () => {
		console.log('Clicked add friend button');
		loadContent('profile-add-friend');
	});

	removeFriendButton.addEventListener('click', () => {
		console.log('Clicked remove friend button');
		loadContent('profile-remove-friend');
	});

	matchHistoryButton.addEventListener('click', () => {
		console.log('Clicked match history button');
		loadContent('profile-match-history');
	});

	matchHistoryButton.addEventListener('click', () => {
		console.log('Clicked match history button');
		loadContent('profile-match-history');
	});
}

