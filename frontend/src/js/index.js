import { initI18next } from './i18n.js';
import { loadContent } from './router.js';

/* App entrypoint */
async function initApp() {
	try 
	{
		await initI18next;

		const path = window.location.pathname.replace('/', '');

		if (!localStorage.getItem("username") && !sessionStorage.getItem("username"))
			loadContent('login', false);
		else if (path)
			loadContent(path, false);
		else
			loadContent('home', false);
	}
	catch (error)
	{
		console.error('Error initializing app:', error);
	}
}

/* Start app */
initApp();

/* For browswer back and forward buttons */
window.addEventListener('popstate', (event) => {
	if (event.state && event.state.content)
		loadContent(event.state.content, false);
	else
		loadContent('home', false); 
});
