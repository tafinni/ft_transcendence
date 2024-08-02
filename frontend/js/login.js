export function loadLogIn() {
	return `
		<div class="bg-fade container-fluid d-flex justify-content-center align-items-center">
			<div class="card p-4" style="width: 20rem;">
				<h3 class="card-title text-center mb-4">Log In</h3>
				<form>
					<div class="form-group mb-3">
						<label for="username" class="form-label">Username</label>
						<input type="text" class="form-control" id="username" placeholder="Enter username" required>
					</div>
					<div class="form-group mb-3">
						<label for="password" class="form-label">Password</label>
						<input type="password" class="form-control" id="password" placeholder="Enter password" required>
					</div>
					<button type="submit" class="btn btn-primary w-100">Log In</button>
					<p>Don't have an account?</p>
					<button type="button" class="btn btn-link">Register</button>
				</form>
			</div>
		</div>
	`;
}


export function initializeLogIn() {
    const loginForm = document.getElementById('login-form');

    if (!loginForm) {
        console.error('Login form not found');
        return;
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the default way

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://backend:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // Handle successful login here (e.g., redirect to a different page)
            } else {
                console.error('Login failed:', response.statusText);
                // Handle login failure here (e.g., show an error message to the user)
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle network or other errors here
        }
    });
}
