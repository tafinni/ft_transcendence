import { loadHome } from './home.js';
import { loadLogIn, initializeLogIn } from './login.js';
import { loadRegister, initializeRegister } from './register.js';
import { loadProfile } from './profile/profile.js';
import { updateContent, initI18next } from './i18n.js';
import { loadGame, endGame, startGame } from './game.js';
import { loadResult } from './result.js';
import { showAlert } from './index.js';
import { getCookie } from './csrf.js';
import { loadTournamentLobby } from './tournament.js';

/* Set navigation bar visibility */
function navLinkVisibility(state) {
	const homeLink = document.getElementById('home-link');
	const profileLink = document.getElementById('profile-link');
	const loginLink = document.getElementById('login-link');
	
	if (state == 1) {
		homeLink.style.display = 'block';
		profileLink.style.display = 'block';
		loginLink.style.display = 'block';
	}
	else if (state == 2) {
		homeLink.style.display ='block';
		profileLink.style.display ='none';
		loginLink.style.display ='none';
	}
	else {
		homeLink.style.display ='none';
		profileLink.style.display ='none';
		loginLink.style.display ='none';
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
		showAlert('Please log in', 'danger');
	}

	if (addHistory)
	{
		const current = window.location.pathname.replace('/', '');
		if (current !== content)
			window.history.pushState({ content: content }, '', `/${content}#`);
	}
	document.getElementById('profile-name').innerHTML = sessionStorage.getItem("username")
  
	switch (content)
	{
		case 'home':
			await endGame();
			contentElement.innerHTML = await loadHome();
			navLinkVisibility(1);
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
		case 'single':
			contentElement.innerHTML = await loadGame(0);
			startGame();
			navLinkVisibility(2);
			break;
		case 'localMulti':
			contentElement.innerHTML = await loadGame(1);
			startGame();
			navLinkVisibility(2);
			break;
		case 'result':
			contentElement.innerHTML = await loadResult(scoreLeft, scoreRight, oppIsHuman);
			navLinkVisibility(1);
			break;
		case 'tournament-lobby':
			contentElement.innerHTML = await loadTournamentLobby();
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

document.getElementById('login-link').addEventListener('click', (event) => {
  event.preventDefault();
  completeLogOut();
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

async function completeLogOut() {
	const csrftoken = getCookie('csrftoken');
	try
	{
		const response = await fetch('http://localhost:8000/logout/',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
			credentials: 'include',
		});

		if (response.ok)
		{
			const data = await response.json();
			console.log('Logged out succesfully: ', data.message);
		}
		else
		{
			const errorData = await response.json();
			console.error('Log out failed');
			showAlert(errorData, 'danger');
		}
	}
	catch (error)
	{
		console.error('Error during log out', error);
		showAlert('Error occured when logging out. Try again.', 'danger');
	}
}