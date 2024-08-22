import { loadHome } from './home.js';
import { loadStats } from './stats.js';
import { loadLogIn, initializeLogIn } from './login.js';
import { loadRegister, initializeRegister } from './register.js';
import { loadProfile } from './profile.js';
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
		contentElement.innerHTML = await loadProfile();
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
	sessionStorage.removeItem("username"); // added for savin log in
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