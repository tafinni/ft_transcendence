import { loadHome } from './home.js';
import { loadStats } from './stats.js';
import { loadLogIn, initializeLogIn } from './login.js';
import { loadRegister, initializeRegister } from './register.js';
import { loadProfile } from './profile/profile.js';
import { updateContent, initI18next } from './i18n.js';
import { loadGame } from './game.js';
import { loadResult } from './result.js';

/* Set navigation bar visibility */
function navLinkVisibility(state) {
	const homeLink = document.getElementById('home-link');
	const profileLink = document.getElementById('profile-link');
	const statsLink = document.getElementById('stats-link');
	const loginLink = document.getElementById('login-link');
	const gameLink = document.getElementById('game-link');

	if (state == 1) {
		homeLink.style.display = 'block';
		profileLink.style.display = 'block';
		statsLink.style.display = 'block';
		loginLink.style.display = 'block';
		gameLink.style.display = 'block';
	}
	else if (state == 2) {
		homeLink.style.display ='block';
		profileLink.style.display ='none';
		statsLink.style.display ='none';
		loginLink.style.display ='none';
		gameLink.style.display = 'block';
	}
	else {
		homeLink.style.display ='none';
		profileLink.style.display ='none';
		statsLink.style.display ='none';
		loginLink.style.display ='none';
		gameLink.style.display = 'none';
	}
}

/* Update page content */
export async function loadContent(content, scoreLeft, scoreRight, oppIsHuman, addHistory = true) {
  await initI18next;

  const contentElement = document.getElementById('content');

	if (!localStorage.getItem("username") && !sessionStorage.getItem("username") && content !== 'login' && content !== 'register')
	{
		content = 'login';
		console.log('Redirected to login');
		alert('Please log in');
	}

	if (addHistory)
	{
		const current = window.location.pathname.replace('/', '');
		if (current !== content)
			window.history.pushState({ content: content }, '', `/${content}#`);
	}
  
	switch (content)
	{
		case 'home':
			contentElement.innerHTML = await loadHome();
			navLinkVisibility(1);
			break ;
		case 'stats':
			contentElement.innerHTML = await loadStats();
			break ;
		case 'login':
			contentElement.innerHTML = loadLogIn();
			initializeLogIn();
			navLinkVisibility(0);
			break ;
		case 'register':
			contentElement.innerHTML = loadRegister();
			initializeRegister();
			navLinkVisibility(0);
			break ;
		case 'profile':
			loadProfile();
			break ;
		case 'game':
			contentElement.innerHTML = await loadGame(1);
			navLinkVisibility(2);
			break;
		case 'result':
			contentElement.innerHTML = await loadResult(scoreLeft, scoreRight, oppIsHuman);
			navLinkVisibility(1);
			break;
		default:
			loadContent('home');
			return ;
	}
  updateContent();
}

/* Navigation bar events */
document.getElementById('home-link').addEventListener('click', (event) => {
  event.preventDefault();
  loadContent('home');
});

document.getElementById('stats-link').addEventListener('click', (event) => {
  event.preventDefault();
  loadContent('stats');
});

document.getElementById('login-link').addEventListener('click', (event) => {
  event.preventDefault();
  sessionStorage.removeItem("username");
  localStorage.removeItem("username");
  loadContent('login');
});

document.getElementById('profile-link').addEventListener('click', (event) => {
  event.preventDefault();
  loadContent('profile');
});

document.getElementById('languageDropdown').addEventListener('change', (event) => {
  setLanguage(e.target.value);
  event.preventDefault(); 
});

document.getElementById('game-link').addEventListener('click', (event) => {
	event.preventDefault(); // Stops normal link
	loadContent('game');
});
