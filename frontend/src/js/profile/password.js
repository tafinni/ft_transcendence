import { updateContent } from "../i18n";
import { loadContent } from "../router";

export async function changePassword() {

	const passwordHTML = `
		<div class="container mt-5">
			<div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
				<h2>
					<span translate="change password"></span>
				</h2>
				<form id="change-password-form">
					<div class="form-group">
						<label for="current_password" translate="current password"></label>
						<input type="text" id="current_password" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="new_password" translate="new password"></label>
						<input type="text" id="new_password" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="confirm_password" translate="type new password again"></label>
						<input type="text" id="confirm_password" class="form-control" required>
					</div>
					<button type="submit" class="btn btn-primary mt-3" translate="save changes"></button>
					<button type="button" id="cancel-button" class="btn btn-link" translate="cancel"></button>
				</form>
			</div>
		</div>
	`;

	const contentElement = document.getElementById('content');
	if (contentElement)
	{
		contentElement.innerHTML = passwordHTML;
		updateContent();
		savePassword();
	}
	else
	{
		console.error('Content element not found');
	}

}

export async function savePassword() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

    console.log('savePassword called'); // Debugging

	const changePasswordForm = document.getElementById('change-password-form');
	if (!changePasswordForm) { console.error('Change password form not found'); return ; }

	const cancelButton = document.getElementById('cancel-button');

	changePasswordForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const current_password = document.getElementById('current_password').value;
		const new_password = document.getElementById('new_password').value;
		const confirm_password = document.getElementById('confirm_password').value;

		console.log('Change password form submitted');

		try
		{
            const response = await fetch('http://localhost:8000/change_password/',
				{
					method: 'POST',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ current_password, new_password, confirm_password })
				});
			
			if (response.ok)
			{
				const data = await response.json();
				console.log('Password change succesfull'); // Debugging
				alert(data.message);
				loadContent('profile');
			}
			else
			{
				const errorData = await response.json();
				console.error('Password change failed', errorData);
				alert(errorData.error);
				loadContent('profile');

			}
		}
		catch (error)
		{
			console.error('Error during change password', error);
			alert('Error occured when changing the password. Try again.')
		}
	});

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled change password'); // Debugging
		loadContent('profile');
	});
}