import { loadHome } from './home.js';
import { loadLogIn, initializeLogIn } from './login.js';
import { loadRegister, initializeRegister } from './register.js';
import { loadProfile } from './profile/profile.js';
import { updateContent, initI18next } from './i18n.js';
import { loadGame, endGame, startGame } from './game.js';
import { loadResult, loadTourneyResult} from './result.js';
import { showAlert } from './index.js';
import { getCookie } from './csrf.js';
import { loadTournamentLobby } from './tournament.js';

/* Set navigation bar visibility */
function navLinkVisibility(state) {
	const homeLink = document.getElementById('home-link');
	const profileLink = document.getElementById('profile-link');
	const loginLink = document.getElementById('login-link');
	const langSwitch = document.getElementById('languageDropdown')
	
	if (state == 1) {
		homeLink.style.display = 'block';
		profileLink.style.display = 'block';
		loginLink.style.display = 'block';
		langSwitch.style.display = 'block';
	}
	else if (state == 2) {
		homeLink.style.display ='block';
		profileLink.style.display ='none';
		loginLink.style.display ='none';
		langSwitch.style.display = 'none';
	}
	else {
		homeLink.style.display ='none';
		profileLink.style.display ='none';
		loginLink.style.display ='none';
		langSwitch.style.display = 'block';
	}
}

/* Update page content */
//sessionStorage.setItem('timeoutTimer', 0);
sessionStorage.setItem('timeoutTimer', Date.now()); 
let timeoutPeriod = 15 * 60 * 1000; //time in milliseconds, currently 15 minutes

setInterval(handleInactives, 2 * 60 * 1000); // Time in milliseconds, currently 2 minute 

async function handleInactives() {
	try {
		const response = await fetch('https://localhost:1443/api/is_online/', {
			method: 'GET',
			credentials: 'include'
		});
		if (response.ok) {
			const data = await response.json();
			if (data.is_online) {
				const timeThen = sessionStorage.getItem('timeoutTimer');
				if (Date.now() > Number(timeThen) + Number(timeoutPeriod)) {
					await completeLogOut();
					loadContent('login');
				}
			}
		} else {
			console.error('Failed to fetch is_online status');
		}
	} catch (error) {
		console.error('Error in handleInactives:', error);
	}
}

function updateTimeout() {
	// Update the time on any user action
	sessionStorage.setItem('timeoutTimer', Date.now()); 
}

// Add event listeners to track clicks and key presses
document.addEventListener('click', updateTimeout);
document.addEventListener('keypress', updateTimeout); 




export async function loadContent(content, scoreLeft, scoreRight, oppIsHuman, nameLeft, nameRight, addHistory = true) {
  await initI18next;
  const contentElement = document.getElementById('content');
  sessionStorage.setItem('timeoutTimer', Date.now());

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
			startGame(0);
			navLinkVisibility(2);
			break;
		case 'localMulti':
			contentElement.innerHTML = await loadGame(1, sessionStorage.getItem("username"));
			startGame(1);
			navLinkVisibility(2);
			break;
		case 'local4':
			contentElement.innerHTML = await loadGame(2, sessionStorage.getItem("username"));
			startGame(2)
			navLinkVisibility(2);
			break;
		case 'tourney':
			contentElement.innerHTML = await loadGame(3, nameLeft, nameRight);
			startGame(3, nameLeft, nameRight);
			navLinkVisibility(2);
			break;
		case 'result':
			console.log(oppIsHuman, nameRight);
			contentElement.innerHTML = await loadResult(scoreLeft, scoreRight, oppIsHuman, nameRight);
			navLinkVisibility(1);
			break;
		case 'tourneyResult':
			contentElement.innerHTML = await loadTourneyResult(scoreLeft, scoreRight, nameLeft, nameRight);
			navLinkVisibility(1);
			break;
		case 'tournament-lobby':
			await loadTournamentLobby();
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
		const response = await fetch('https://localhost:1443/api/logout/',
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