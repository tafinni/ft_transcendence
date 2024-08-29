import { loadHome } from './home.js';
import { loadStats } from './stats.js';
import { loadLogIn, initializeLogIn } from './login.js';
import { loadRegister, initializeRegister } from './register.js';
import { buttonListener, loadProfile, editInfo, saveInfo, changePassword, savePassword, addFriend, saveFriend, removeFriend, saveRemovedFriend, matchHistory, backButtonListener, displayFriends } from './profile.js';
import { updateContent } from './i18n.js';

function navLinkVisibility(state) {
	const homeLink = document.getElementById('home-link');
	const profileLink = document.getElementById('profile-link');
	const statsLink = document.getElementById('stats-link');
	const loginLink = document.getElementById('login-link');

	if (state) {
		homeLink.style.display = 'block';
		profileLink.style.display = 'block';
		statsLink.style.display = 'block';
		loginLink.style.display = 'block';
	}
	else {
		homeLink.style.display ='none';
		profileLink.style.display ='none';
		statsLink.style.display ='none';
		loginLink.style.display ='none';
	}
}

// Update content
export async function loadContent(content) {
	const contentElement = document.getElementById('content');

	if (content === 'home') {
		contentElement.innerHTML = await loadHome();
		navLinkVisibility(true);
	}
	else if (content === 'stats') {
		contentElement.innerHTML = await loadStats();
	}
	else if (content === 'login') {
		contentElement.innerHTML = loadLogIn();
		initializeLogIn();
		navLinkVisibility(false);
	}
	else if (content === 'register') {
		contentElement.innerHTML = loadRegister();
		initializeRegister();
		navLinkVisibility(false);

	}
	else if (content === 'profile') {
		/* contentElement.innerHTML = await */loadProfile();
		/* await displayFriends();
		buttonListener(); */
	}
	else if (content === 'editInfo') {
		contentElement.innerHTML = await editInfo();
		saveInfo();
	}
	else if (content === 'changePassword') {
		contentElement.innerHTML = await changePassword();
		savePassword();
	}
	else if (content === 'profile-add-friend') {
		contentElement.innerHTML = await addFriend();
		saveFriend();
	}
	else if (content === 'profile-remove-friend') {
		contentElement.innerHTML = await removeFriend();
		saveRemovedFriend();
	}
	else if (content === 'profile-match-history') {
		contentElement.innerHTML = await matchHistory();
		backButtonListener();
	}
	else {
		contentElement.innerHTML = `<h1> 404 Page not found</h1>`;
	}
	updateContent();
}

// Navigation events
document.getElementById('home-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	loadContent('home');
});
document.getElementById('stats-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	loadContent('stats');
});
document.getElementById('login-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	sessionStorage.removeItem("username");
	loadContent('login');
});
document.getElementById('profile-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	loadContent('profile');
});

/* Default content */
window.onload = () => {
    if (!sessionStorage.getItem("username")) // added for savin log in
    {
        loadContent('login');

    }
}