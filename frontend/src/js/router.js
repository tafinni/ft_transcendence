import { loadHome } from './home.js';
import { loadStats } from './stats.js';
import { loadLogIn, initializeLogIn } from './login.js';
import { loadRegister, initializeRegister } from './register.js';
import { loadProfile } from './profile.js';
import { updateContent } from './i18n.js';
import { loadGame } from './game.js';
import { loadRemote} from './pong_client.js';

function navLinkVisibility(state) {
	const homeLink = document.getElementById('home-link');
	const profileLink = document.getElementById('profile-link');
	const statsLink = document.getElementById('stats-link');
	const loginLink = document.getElementById('login-link');
	const gameLink = document.getElementById('game-link');
	const extra = document.getElementById('ai-link');
	const remote = document.getElementById('remote-link');

	if (state == 1) {
		homeLink.style.display = 'block';
		profileLink.style.display = 'block';
		statsLink.style.display = 'block';
		loginLink.style.display = 'block';
		gameLink.style.display = 'block';
		extra.style.display = 'block';
	}
	else if (state == 2) {
		homeLink.style.display ='block';
		profileLink.style.display ='none';
		statsLink.style.display ='none';
		loginLink.style.display ='none';
		gameLink.style.display = 'block';
		extra.style.display = 'none';
	}
	else {
		homeLink.style.display ='none';
		profileLink.style.display ='none';
		statsLink.style.display ='none';
		loginLink.style.display ='none';
		gameLink.style.display = 'none';
		extra.style.display = 'none';
	}
}

// Update content
export async function loadContent(content) {
	const contentElement = document.getElementById('content');

	if (content === 'home') {
		contentElement.innerHTML = await loadHome();
		navLinkVisibility(1);
	}
	else if (content === 'stats') {
		contentElement.innerHTML = await loadStats();
	}
	else if (content === 'login') {
		contentElement.innerHTML = loadLogIn();
		initializeLogIn();
		navLinkVisibility(0);
	}
	else if (content === 'register') {
		contentElement.innerHTML = loadRegister();
		initializeRegister();
		navLinkVisibility(0);
	}
	else if (content === 'profile') {
		contentElement.innerHTML = await loadProfile();
	}
	else if (content === 'game'){
		contentElement.innerHTML = await loadGame(1);
		navLinkVisibility(2);
	}
	else if (content === 'ai'){
		contentElement.innerHTML = await loadGame(0);
		navLinkVisibility(2);
	}
	else if (content === 'remote'){
		contentElement.innerHTML = await loadRemote();
		navLinkVisibility(2);
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
	loadContent('login');
});
document.getElementById('profile-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	loadContent('profile');
});

document.getElementById('game-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	loadContent('game');
});

document.getElementById('ai-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	loadContent('ai');
});

document.getElementById('remote-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	loadContent('remote');
});

/* Default content */
window.onload = () => {
	loadContent('login');
}
