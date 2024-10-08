import { loadContent } from './router.js';

function getCsrfToken() { return document.querySelector('meta[name="csrf-token"]').getAttribute('content'); }

export function loadLogIn() {
	return `
		<div class="bg-fade container-fluid d-flex justify-content-center align-items-center">

			<div class="card p-4" style="width: 20rem;">
				<h3 class="card-title text-center mb-4" translate="Log In"></h3>
				<form id="login-form" method="POST">
					<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>
					<div class="form-group mb-3">
						<label for="username" class="form-label" translate="Username"></label>
						<input type="text" class="form-control" id="username" required>
					</div>
					<div class="form-group mb-3">
						<label for="password" class="form-label" translate="Password"></label>
						<input type="password" class="form-control" id="password" required>
					</div>
					<button type="submit" class="btn btn-primary w-100" translate="Log In"></button>
					<p translate="Don't have an account?"></p>
					<button type="button" id="register-button" class="btn btn-link" translate="Register"></button>

				</form>
			</div>
		</div>
	`;
}


export function initializeLogIn() {

	console.log('initializeLogIn called'); // Debugging

    const loginForm = document.getElementById('login-form');
    if (!loginForm) {console.error('Login form not found'); return;}

	const errorMessage = document.getElementById('error-message');
    const registerButton = document.getElementById('register-button');

	const csrfToken = getCsrfToken();

    loginForm.addEventListener('submit', async (event) => {
		event.preventDefault(); // Prevent the form from submitting the default way

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try
		{
            const response = await fetch('http://localhost:8000/login/',
			{
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
				credentials: 'include',
                body: JSON.stringify({ username, password })
            });

            if (response.ok) 
			{
                const data = await response.json();
                console.log('Login successful:', data); // debugging, testing
				loadContent('home');
			} 
			else 
			{
                console.error('Login failed:', response.statusText);
				const errorData = await response.json();
                console.error('Login failed:', errorData);
                errorMessage.textContent = errorData.error;
               	errorMessage.style.display = 'block';
            }
        } 
		catch (error) 
		{
            console.error('Error during login:', error);
			errorMessage.textContent = errorData.error;
			errorMessage.style.display = 'block';
        }
    });

	registerButton.addEventListener('click', () => {
        console.log('Pressed register button'); // Debugging
		loadContent('register');
	})
}
