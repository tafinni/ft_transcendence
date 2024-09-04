
import { updateContent } from "../i18n.js";
import { loadContent } from "../router.js";
import { showAlert } from "../index.js";

export async function editInfo() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

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
					    <label for="language" translate="preferred language"></label>
					    <select id="language" name="language" class="form-control">
							<option value="en" ${userData.language === 'en' ? 'selected' : ''} translate="english"></option>
							<option value="fi" ${userData.language === 'fi' ? 'selected' : ''} translate="finnish"></option>
							<option value="ru" ${userData.language === 'ru' ? 'selected' : ''} translate="russian"></option>
					    </select>
  					</div>
					<button type="submit" class="btn btn-primary mt-3" translate="save changes"></button>
					<button type="button" id="cancel-button" class="btn btn-link" translate="cancel"></button>
				</form>
			</div>
        </div>
    `;

	const contentElement = document.getElementById('content');
	if (contentElement) {
		contentElement.innerHTML = editInfoHTML;
		saveInfo();
		updateContent();
	}
	else
	{
		console.error('Content element not found');
	}
}

export async function saveInfo() {

    console.log('saveInfo called'); // Debugging

    const editInfoForm = document.getElementById('edit-info-form');
    if (!editInfoForm) { console.error('Edit form not found'); return;}

	const cancelButton = document.getElementById('cancel-button');
	const errorMessage = document.getElementById('error-message');

    editInfoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

		const formData = new FormData(editInfoForm);

        try 
        {
            const response = await fetch('http://localhost:8000/update_profile/',
            {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            if (response.ok)
            {
                const data = await response.json();
                console.log('Edit info successful');
                showAlert(data.message, 'success');
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
        }
    });

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled edit info'); // Debugging
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
	if (contentElement) {
		contentElement.innerHTML = editAvatarHTML;
		updateContent();
		saveAvatar();
	}
	else
	{
		console.error('Content element not found');
	}
}

async function saveAvatar() {
    console.log('saveInfo called'); // Debugging

    const editAvatarForm = document.getElementById('edit-avatar-form');
    if (!editAvatarForm) { console.error('Edit form not found'); return;}

   const cancelButton = document.getElementById('cancel-button');
   const errorMessage = document.getElementById('error-message');

    editAvatarForm.addEventListener('submit', async (event) => {
        event.preventDefault();

		const formData = new FormData(editAvatarForm);

        try 
        {
            const response = await fetch('http://localhost:8000/update_profile/',
            {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            if (response.ok)
            {
                const data = await response.json();
                console.log('Edit info successful'); // Debugging
                showAlert(data.message, 'success');
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
            console.error('Error during edit avatar', error);
			showAlert('Error during edit avatar. Try Again');
        }
    });

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled edit info');
		loadContent('profile');
	});
}