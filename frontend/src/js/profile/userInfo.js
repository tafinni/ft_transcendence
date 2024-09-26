
import { updateContent } from "../i18n.js";
import { loadContent } from "../router.js";
import { checkUserLanguage } from "../i18n.js";
import { showAlert } from "../index.js";
import { getCookie } from '../csrf.js';
import { loadProfile } from "./profile.js";

export async function editInfo() {
	try
	{
		const response = await fetch('https://localhost:1443/api/profile/', {
			method: 'GET',
			credentials: 'include'
		});
		if (!response.ok)
		{
			console.error('Failed editing profile:', response.statusText);
			showAlert('Error editing profile. Try again.', 'danger');
			return ;
		}

		const userData = await response.json();

		const editInfoHTML = `
		<div class="container mt-5">
				<div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
				
					<h2 translate="edit user information"></h2>
				
					<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>

					<form id="edit-info-form" enctype="multipart/form-data">
						<div class="form-group">
							<label for="first_name" translate="first name"></label>
							<input type="text" id="first_name" name="first_name" class="form-control" value="${userData.first_name}" required>
						</div>
						<div class="form-group">
							<label for="last_name" translate="last name"></label>
							<input type="text" id="last_name" name="last_name" class="form-control" value="${userData.last_name}" required>
						</div>
						<div class="form-group">
							<label for="display_name" translate="display name"></label>
							<input type="text" id="display_name" name="display_name" class="form-control" value="${userData.display_name}" required>
						</div>
						<div class="form-group">
							<label for="username" translate="username"></label>
							<input type="text" id="username" name="username" class="form-control" value="${userData.username}" readonly>
						</div>
						<div class="form-group">
							<label for="preferred_language" translate="preferred language"></label>
							<select id="preferred_language" name="preferred_language" class="form-control">
								<option value="EN" ${userData.language === 'en' ? 'selected' : ''} translate="english"></option>
								<option value="FI" ${userData.language === 'fi' ? 'selected' : ''} translate="finnish"></option>
								<option value="RU" ${userData.language === 'ru' ? 'selected' : ''} translate="russian"></option>
							</select>
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
			contentElement.innerHTML = editInfoHTML;
			saveInfo();
			updateContent();
		}
		else
		{
			console.error('Content element not found');
			showAlert('Error occured. Try again.', 'danger');
			loadContent('profile');
		}
	}
	catch (error)
	{
		console.log(error);
	}
}

export async function saveInfo() {
    const editInfoForm = document.getElementById('edit-info-form');
    if (!editInfoForm)
	{
		console.error('Edit form not found');
		showAlert('Error occured. Try again', 'danger');
		return ;
	}

	const cancelButton = document.getElementById('cancel-button');
	const errorMessage = document.getElementById('error-message');

    editInfoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

		const formData = new FormData(editInfoForm);

		const csrftoken = getCookie('csrftoken');
        try 
        {
            const response = await fetch('https://localhost:1443/api/update_profile/',
            {
                method: 'POST',
				headers: { 'X-CSRFToken': csrftoken },
                credentials: 'include',
                body: formData
            });

            if (response.ok)
            {
                const data = await response.json();
                console.log('Edit info successful');
                showAlert(data.message, 'success');
				await checkUserLanguage()
                loadContent('profile');
            }
            else
            {
                const errorData = await response.json();
                console.error('Edit info failed', errorData);
				errorMessage.textContent = errorData.error;
				errorMessage.style.display = 'block';
            }
        }
        catch (error)
        {
            console.error('Error during edit info', error);
			showAlert('Error editin user info. Try again.', 'danger');
			loadContent('profile');
        }
    });

	cancelButton.addEventListener('click', () => {
		loadContent('profile');
	});
}

export async function editAvatar() {

	const editAvatarHTML = `
       <div class="container mt-5">
            <div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
				<h5>
					<span translate="change avatar"></span>
				</h5>
				<div id="error-message" class="text-danger mb-3" styl2="display: none;"></div>
				<form id="edit-avatar-form" enctype="multipart/form-data">
					<div class="form-group">
						<label for="avatar"></label>
						<input type="file" id="avatar" name="avatar" class="form-control">
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
		contentElement.innerHTML = editAvatarHTML;
		updateContent();
		saveAvatar();
	}
	else
	{
		console.error('Content element not found');
		showAlert('Error occured. Try again', 'danger');
		loadContent('profile');
	}
}

async function saveAvatar() {

    const editAvatarForm = document.getElementById('edit-avatar-form');
    if (!editAvatarForm)
	{
		console.error('Edit Avatar form not found');
		showAlert('Error occured. Try again.', 'danger');
		return ;
	}

   const cancelButton = document.getElementById('cancel-button');
   const errorMessage = document.getElementById('error-message');

    editAvatarForm.addEventListener('submit', async (event) => {
        event.preventDefault();

		const formData = new FormData(editAvatarForm);

		const csrftoken = getCookie('csrftoken');
        try 
        {
            const response = await fetch('https://localhost:1443/api/update_profile/',
            {
                method: 'POST',
				headers: { 'X-CSRFToken': csrftoken },
                credentials: 'include',
                body: formData
            });

            if (response.ok)
            {
                const data = await response.json();
                console.log('Edit avatar successful');
                showAlert(data.message, 'success');
                loadContent('profile');
            }
            else
            {
                const errorData = await response.json();
                console.error('Edit avatar failed', errorData);
				errorMessage.textContent = errorData.error;
				errorMessage.style.display = 'block';
            }
        }
        catch (error)
        {
            console.error('Error during edit avatar', error);
			showAlert('Error during edit avatar. Try Again', 'danger');
        }
    });

	cancelButton.addEventListener('click', () => {
		loadContent('profile');
	});
}