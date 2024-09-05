import { loadHome } from './home.js';
import { loadLogIn, initializeLogIn } from './login.js';
import { loadRegister, initializeRegister } from './register.js';
import { loadProfile } from './profile/profile.js';
import { updateContent, initI18next, i18next } from './i18n.js';
import { showAlert } from './index.js';

/* Set navigation bar visibility */
function navLinkVisibility(state) {
	const homeLink = document.getElementById('home-link');
	const profileLink = document.getElementById('profile-link');
	const loginLink = document.getElementById('login-link');

	if (state)
	{
		homeLink.style.display = 'block';
		profileLink.style.display = 'block';
		loginLink.style.display = 'block';
	}
	else 
	{
		homeLink.style.display = 'none';
		profileLink.style.display = 'none';
		loginLink.style.display = 'none';
  	}
}

/* Update page content */
export async function loadContent(content, addHistory = true) {

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
			navLinkVisibility(true);
			break ;
		case 'login':
			contentElement.innerHTML = loadLogIn();
			initializeLogIn();
			navLinkVisibility(false);
			break ;
		case 'register':
			contentElement.innerHTML = loadRegister();
			initializeRegister();
			navLinkVisibility(false);
			break ;
		case 'profile':
			loadProfile();
			break ;
		default:
			loadContent('home');
			break ;
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

document.getElementById('languageDropdown').addEventListener('click', (event) => {
  setLanguage(event.target.value);
  event.preventDefault(); 
});


async function completeLogOut() {
	try
	{
		const response = await fetch('http://localhost:8000/logout/',
		{
			method: 'POST',
			credentials: 'include',
		});

		if (response.ok)
		{
			const data = await response.json();
			console.log('Logged out succesfully');
			showAlert(data.message, 'success');
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
