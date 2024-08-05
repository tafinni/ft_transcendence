import { loadContent } from './router.js';

export function loadRegister() {
    return `
        <div class="bg-fade container-fluid d-flex justify-content-center align-items-center">
            <div class="card p-4" style="width: 20rem;">
                <h3 class="card-title text-center mb-4">Register</h3>
                <form id="register-form" method="POST">
                    <div id="error-message" class="text-danger mb-3" style="display: none;"></div>
                    <div class="form-group mb-3">
                        <label for="first_name" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="first_name" placeholder="Enter first name" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="last_name" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="last_name" placeholder="Enter last name" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" placeholder="Enter username" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Enter password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Register</button>
                </form>
            </div>
        </div>
    `;
}

export function initializeRegister() {

	console.log('initializeRegister called'); // Debugging

	const registerForm = document.getElementById('register-form');
	if (!registerForm) { console.error('Register form not found'); return; }

	registerForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const first_name = document.getElementById('first_name').value;
		const last_name = document.getElementById('last_name').value;
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		console.log('Form submitted:', {first_name, last_name, username, password }); // Debuggin, testing

		try
		{
			const response = await fetch('http://localhost:8000/register/',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ first_name, last_name, username, password })
			});

			if (response.ok)
			{
				const data = await response.json();
				console.log('Registration successful:', data); // debugging, testing
				alert('Registration successful');
				loadContent('login');
			}
			else
			{
				console.error('Registration failed:', response.statusText);
			}
		}
		catch (error)
		{
			console.error('Error during registration:', error);
		}
	});
}