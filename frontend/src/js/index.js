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

export function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>`;
    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
        $(alertDiv).alert('close');
    }, 5000); // Change 3000 to the number of milliseconds you want
}

