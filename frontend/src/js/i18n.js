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

// Update content to selected language
export function updateContent() {
	if (i18next.isInitialized) {
		document.getElementById('home-link').innerText = i18next.t('home');
		document.getElementById('profile-link').innerText = i18next.t('profile');
		document.getElementById('stats-link').innerText = i18next.t('stats');
		document.getElementById('login-link').innerText = i18next.t('login');
		document.getElementById('game-link').innerText = i18next.t('game');
		document.getElementById('ai-link').innerText = i18next.t('ai');
		document.getElementById('languageDropdown').innerText = i18next.t('languageDropdown');
	
    document.querySelectorAll('[translate]').forEach(element => {
      const key = element.getAttribute('translate');
      element.textContent = i18next.t(key);
    });
  } else {
		console.warn('i18next is not initialized yet.');
	}
}

// Changing language
function setLanguage(lang) {
  i18next.changeLanguage(lang, (err, t) => {
    if (err) return console.error('Error changing language:', err);
    localStorage.setItem('language', lang);
    updateContent();
  });
}

// Make setLanguage globally available
window.setLanguage = setLanguage;

