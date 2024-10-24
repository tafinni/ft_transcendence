import { showAlert } from "..";
import { updateContent } from "../i18n";
import { loadContent } from "../router";
import { getCookie } from '../csrf.js';

export async function changePassword() {

	const passwordHTML = `
		<div class="container mt-5">
			<div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
				<h2>
					<span translate="change password"></span>
				</h2>
				<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>
				<form id="change-password-form">
					<div class="form-group">
						<label for="current_password" translate="current password"></label>
						<input type="password" id="current_password" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="new_password" translate="new password"></label>
						<input type="password" id="new_password" class="form-control" required>
					</div>
					<div class="form-group">
						<label for="confirm_password" translate="type new password again"></label>
						<input type="password" id="confirm_password" class="form-control" required>
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
		console.error('Content element not found');
}

export async function savePassword() {

	const changePasswordForm = document.getElementById('change-password-form');
	if (!changePasswordForm)
	{
		console.error('Change password form not found');
		showAlert('Error changing password. Try again', 'danger');
		loadContent('profile');
	}

	const errorMessage = document.getElementById('error-message');
	const cancelButton = document.getElementById('cancel-button');

	changePasswordForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const current_password = document.getElementById('current_password').value;
		const new_password = document.getElementById('new_password').value;
		const confirm_password = document.getElementById('confirm_password').value;

		const csrftoken = getCookie('csrftoken');
		try
		{
            const response = await fetch('https://localhost:1443/api/change_password/',
			{
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken  },
				body: JSON.stringify({ current_password, new_password, confirm_password })
			});
			
			if (response.ok)
			{
				const data = await response.json();
				console.log('Password change succesfull');
				showAlert(data.message, 'success');
				loadContent('profile');
			}
			else
			{
				const errorData = await response.json();
				console.error('Password change failed', errorData);
                errorMessage.textContent = errorData.error;
               	errorMessage.style.display = 'block';
			}
		}
		catch (error)
		{
			console.error('Error during change password', error);
			showAlert('Error occured when changing the password. Try again.', 'danger');
			loadContent('profile');
		}
	});

	cancelButton.addEventListener('click', () => {
		loadContent('profile');
	});
}