import { checkUserLanguage } from './i18n.js';
import { loadContent } from './router.js';
import { getCookie } from './csrf.js';
import { showAlert } from './index.js';

export function loadLogIn() {
	return `
		<div class="bg-fade container-fluid d-flex justify-content-center align-items-center">

			<div class="card p-4" style="width: 20rem;">
				<h3 class="card-title text-center mb-4" translate="log in"></h3>
				<form id="login-form" method="POST">
					<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>
					<div class="form-group mb-3">
						<label for="username" class="form-label" translate="username"></label>
						<input type="text" class="form-control" id="username" required>
					</div>
					<div class="form-group mb-3">
						<label for="password" class="form-label" translate="password"></label>
						<input type="password" class="form-control" id="password" required>
					</div>
					<button type="submit" class="btn btn-primary w-100" translate="log in"></button>
					<p translate="don't have an account?"></p>
					<button type="button" id="register-button" class="btn btn-link" translate="register"></button>

				</form>
			</div>
		</div>
	`;
}

export function initializeLogIn() {

    const loginForm = document.getElementById('login-form');
    if (!loginForm)
	{
		console.error('Login form not found');
		showAlert('Error occured. Try again.', 'danger');
		return ;
	}

	const errorMessage = document.getElementById('error-message');
    const registerButton = document.getElementById('register-button');

	const csrftoken = getCookie('csrftoken');

    loginForm.addEventListener('submit', async (event) => {
		event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try
		{
            const response = await fetch('https://localhost:1443/api/login/',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
				credentials: 'include',
				body: JSON.stringify({ username, password })
			});

            if (response.ok) 
			{
                const data = await response.json();
                console.log('Login successful:', data);
				sessionStorage.setItem("username", username);
				localStorage.setItem('username', username);
				checkUserLanguage();
				loadContent('home');
			} 
			else 
			{
				const errorData = await response.json();
                console.error('Login failed:', errorData);
                errorMessage.textContent = errorData.error;
               	errorMessage.style.display = 'block';
            }
        } 
		catch (error) 
		{
            console.error('Error during login:', error);
			errorMessage.textContent = error;
			errorMessage.style.display = 'block';
        }
    });

	registerButton.addEventListener('click', () => {
		loadContent('register');
	})
}
