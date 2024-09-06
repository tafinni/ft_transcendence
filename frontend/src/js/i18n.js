import i18next from 'i18next';
import i18nextHttpBackend from 'i18next-http-backend';
import { showAlert } from './index.js';

const initI18next = i18next
  .use(i18nextHttpBackend)
  .init({
    lng: localStorage.getItem('language') || 'en',
    backend: {
      loadPath: 'http://localhost:3000/languages/{{lng}}.json',
    },
    fallbackLng: 'en',
    debug: true,
  });

export { i18next, initI18next };

export function updateContent() {
  if (i18next.isInitialized) {
    document.getElementById('home-link').innerText = i18next.t('home');
    document.getElementById('profile-link').innerText = i18next.t('profile');
    document.getElementById('login-link').innerText = i18next.t('login');
		 document.getElementById('languageDropdown').innerText = i18next.t('languageDropdown');
  
    document.querySelectorAll('[translate]').forEach(element => {
      const key = element.getAttribute('translate');
      element.textContent = i18next.t(key);
    });
  } else {
    console.warn('i18next is not initialized yet.');
  }
}

export async function setLanguage(lang) {
  try {
    await i18next.changeLanguage(lang);
    localStorage.setItem('language', lang);
    updateContent();
  } catch (error) {
    console.error('Error changing language:', error);
  }
}

export async function checkUserLanguage() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok)
  {
    console.error('Failed checking language:', response.statusText);
    showAlert('Error checking language. Try again.', 'danger');
    return ;
  }

	const userData = await response.json();

  switch (userData.preferred_language)
  {
    case 'FI':
      setLanguage('fi');
      break ;
    case 'RU':
      setLanguage('ru');
      break ;
    default:
      setLanguage('en');
  }

}

/* Make setLanguage available */
window.setLanguage = setLanguage;

i18next
  .use(i18nextHttpBackend)
  .init({
    lng: localStorage.getItem('language') || 'en', // Default language
    backend: {
      loadPath: 'http://localhost:3000/languages/{{lng}}.json'
    },
    fallbackLng: 'en',
    debug: true
  }, function(err, t) {
    if (err) return console.error(err);
    updateContent();
  });
