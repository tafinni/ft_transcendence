import { loadHome } from './home.js';
import { loadStats } from './stats.js';
import { loadLogIn, initializeLogIn } from './login.js';
import { loadRegister, initializeRegister } from './register.js';

// Update content
export async function loadContent(content) {
	const contentElement = document.getElementById('content');
	const navbar = document.querySelector('nav');

	if (content === 'home') {
		contentElement.innerHTML = loadHome();
		navbar.classList.remove('navbar-hidden');
	}
	else if (content === 'stats') {
		contentElement.innerHTML = await loadStats();
		navbar.classList.remove('navbar-hidden');
	}
	else if (content === 'login') {
		contentElement.innerHTML = loadLogIn();
		initializeLogIn();
		navbar.classList.add('navbar-hidden');
	}
	else if (content === 'register') {
		contentElement.innerHTML = loadRegister();
		initializeRegister();
		navbar.classList.add('navbar-hidden');
	}
	else if (content === 'profile') {
		contentElement.innerHTML = loadRegister();
		initializeRegister();
		navbar.classList.remove('navbar-hidden');
	}
	else {
		contentElement.innerHTML = `<h1> 404 Page not found</h1>`;
	}
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

/* Default content */
window.onload = () => {
	loadContent('login');
}
