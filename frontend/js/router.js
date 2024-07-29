import { loadHome } from './home.js';
import { loadStats } from './stats.js';
import { loadSignIn } from './signin.js';

// Update content
async function loadContent(content) {
	const contentElement = document.getElementById('content');

	if (content === 'home') {
		contentElement.innerHTML = loadHome();
	}
	else if (content === 'stats') {
		contentElement.innerHTML = await loadStats();
	}
	else if (content === 'signin') {
		contentElement.innerHTML = loadSignIn();
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
document.getElementById('signin-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	loadContent('signin');
});

/* Default content */
window.onload = () => {
	loadContent('signin');
}
