import { updateContent } from "../i18n.js";
import { loadContent } from "../router.js";
import { showAlert } from "../index.js";


export async function displayFriends() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const data = await response.json(); // Parse the JSON response

	console.log('display friends called', data); // Debugging
	const friends = data.friends;

	const friendsListContainer = document.getElementById('friends-list');
	friendsListContainer.innerHTML = ''; // Clear existing content

	friends.forEach((friend, index) => {
		const colors = ['#f0f0f0', '#fffff'];


		const friendItem = document.createElement('div');
		friendItem.className = 'friend-item';

		friendItem.style.backgroundColor = colors[index % colors.length];
		friendItem.style.padding = '10px';
		friendItem.style.display = 'flex';
		friendItem.style.alignItems = 'center';

		const onlineStatus = document.createElement('span');
		onlineStatus.className = 'online-status';
		onlineStatus.style.marginRight = '10px';
		onlineStatus.style.fontSize = '80%';
		if (friend.online_status == true)
		{
			onlineStatus.innerHTML = '<i class="bi bi-circle-fill"></i>';
			onlineStatus.style.color = 'green';
		}
		else if (friend.online_status == false)
		{
			onlineStatus.innerHTML = '<i class="bi bi-circle-fill"></i>';
			onlineStatus.style.color = 'red';
		}

		const friendName = document.createElement('span');
		friendName.className = 'friend-name';
		friendName.textContent = friend.username;

        const removeFriendButton = document.createElement('button');
        removeFriendButton.className = 'btn btn-link btn-sm';
		removeFriendButton.innerHTML = '<i class="bi bi-trash3-fill"></i>';
	    removeFriendButton.style.marginRight = '10px';
		removeFriendButton.style.marginLeft = 'auto';
		removeFriendButton.style.color = 'red';
		removeFriendButton.style.fontSize = '110%';
        removeFriendButton.onclick = () => removeFriend(friend.username);

		friendItem.appendChild(onlineStatus);
		friendItem.appendChild(friendName);
		friendItem.appendChild(removeFriendButton);

		friendsListContainer.appendChild(friendItem);
	});
}

export async function displayFriendRequests() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const data = await response.json(); // Parse the JSON response

	console.log('display friends called', data); // Debugging
	const friends = data.friend_requests;

	const friendsListContainer = document.getElementById('friend-requests');
	friendsListContainer.innerHTML = ''; // Clear existing content

	friends.forEach((friend, index) => {
		const colors = ['#f0f0f0', '#fffff'];

		const friendItem = document.createElement('div');
		friendItem.className = 'friend-item';
		friendItem.style.display = 'flex';
        friendItem.style.alignItems = 'center';
        friendItem.style.marginBottom = '10px';

		friendItem.style.backgroundColor = colors[index % colors.length];
		friendItem.style.padding = '10px';

		const friendName = document.createElement('span');
		friendName.className = 'friend-name';
		friendName.textContent = friend.username;
        friendName.style.flexGrow = '1';

		// Create Accept button
        const acceptButton = document.createElement('button');
        acceptButton.className = 'btn btn-success btn-sm';
		acceptButton.innerHTML = '<i class="bi bi-check-lg"></i>';
	    acceptButton.style.marginRight = '10px';
        acceptButton.onclick = () => acceptFriend(friend.username);

        // Create Deny button
        const denyButton = document.createElement('button');
        denyButton.className = 'btn btn-danger btn-sm';
		denyButton.innerHTML = '<i class="bi bi-x-lg"></i>';
        denyButton.onclick = () => declineFriend(friend.username);

		friendItem.appendChild(friendName);
        friendItem.appendChild(acceptButton);
        friendItem.appendChild(denyButton);		

		friendsListContainer.appendChild(friendItem);
	});	
}

async function acceptFriend(request_user_username) {
	try
	{
		const response = await fetch('http://localhost:8000/accept_friend_request/',
		{
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type' : 'application/json' },
			body: JSON.stringify({ request_user_username })
		});

		if (response.ok)
		{
			const data = await response.json();
			console.log('Friend added succesfully');
			showAlert(data.message, 'success');
			loadContent('profile');
		}
		else
		{
			const errorData = await response.json();
			console.error('Adding friend failed');
			showAlert('errorData', 'danger');
			loadContent('profile');
		}
	}
	catch (error)
	{
		console.error('Error during adding friend', error);
		showAlert('Error occured when adding friend. Try again.', 'danger');
	}
}

async function declineFriend(request_user_username) {
	try
	{
		const response = await fetch('http://localhost:8000/decline_friend_request/',
		{
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type' : 'application/json' },
			body: JSON.stringify({ request_user_username })
		});

		if (response.ok)
		{
			const data = await response.json();
			console.log('Friend declined succesfully');
			showAlert(data.message, 'success');
			loadContent('profile');
		}
		else
		{
			const errorData = await response.json();
			console.error('Declining friend failed');
			showAlert(errorData, 'danger');
			loadContent('profile');
		}
	}
	catch (error)
	{
		console.error('Error during adding friend', error);
		showAlert('Error occured when adding friend. Try again.', 'danger');
	}
}



export async function addFriend() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const addFriendHTML = `
	<div class="container mt-5">
        <div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
		<form id="add-friends-form">
			<div class="form-group">
				<label for="friends-name" translate="friend's name"></label>
				<input type="text" id="new-friend" class="form-control" required>
			</div>
			<button type="submit" class="btn btn-success mt-3" translate="send request"></button>
			<button type="button" id="cancel-button" class="btn btn-link" translate="cancel"></button>
		</form>
		</div>
	</div>
`;


	const contentElement = document.getElementById('content');
	if (contentElement) {
		contentElement.innerHTML = addFriendHTML;
		updateContent();
		saveFriend();
	}
	else
	{
		console.error('Content element not found');
	}
}



async function saveFriend() {
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
				showAlert(data.message, 'success');
				loadContent('profile');
			}
			else
			{
				const errorData = await response.json();
				console.error('Adding friend failed', errorData);
				showAlert('test', 'danger');
				loadContent('profile');
			}
		}
		catch (error)
		{
			console.error('Error during adding friend', error);
			showAlert('Error occured when adding friend. Try again.', 'danger');
		}
	});

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled add friend'); // Debugging
		loadContent('profile');
	});
}

async function removeFriend(friend_username) {
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
			showAlert(data.message, 'success');
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
}

