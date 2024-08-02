import { loadHome } from './home.js';
import { loadStats } from './stats.js';
import { loadLogIn, initializeLogIn } from './login.js';

// Update content
async function loadContent(content) {
	const contentElement = document.getElementById('content');

	if (content === 'home') {
		contentElement.innerHTML = loadHome();
	}
	else if (content === 'stats') {
		contentElement.innerHTML = await loadStats();
	}
	else if (content === 'login') {
		contentElement.innerHTML = loadLogIn();
		initializeLogIn();
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

/* Default content */
window.onload = () => {
	loadContent('login');
}
