
import { loadContent } from "../router.js";

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
					<button type="submit" class="btn btn-primary mt-3">Save Changes</button>
					<button type="button" id="cancel-button" class="btn btn-link" >Cancel</button>
				</form>
			</div>
        </div>
    `;

	const contentElement = document.getElementById('content');
	if (contentElement) {
		contentElement.innerHTML = editInfoHTML;
		saveInfo();
	}
	else
	{
		console.error('Content element not found');
	}
}

export async function saveInfo() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

    console.log('saveInfo called'); // Debugging

    const editInfoForm = document.getElementById('edit-info-form');
    if (!editInfoForm) { console.error('Edit form not found'); return;}

   const cancelButton = document.getElementById('cancel-button');

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
                console.log('Edit info successful'); // Debugging
                alert(data.message);
                loadContent('profile');
            }
            else
            {
                const errorData = await response.json();
                console.error('Edit info failed', errorData);
            }
        }
        catch (error)
        {
            console.error('Error during edit info', error);
        }
    });

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled edit info'); // Debugging
		loadContent('profile');
	});
}

export async function editAvatar() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const userData = await response.json();

	const editAvatarHTML = `
       <div class="container mt-5">
            <div class="card" style="background-color: white; padding: 20px; border-radius: 10px;">
				<h2 >Edit Profile Information</h2>
				<form id="edit-avatar-form" enctype="multipart/form-data">
					<div class="form-group">
						<label for="avatar">Change Avatar</label>
						<input type="file" id="avatar" name="avatar" class="form-control">
					</div>
					<button type="submit" class="btn btn-primary mt-3">Save Changes</button>
					<button type="button" id="cancel-button" class="btn btn-link" >Cancel</button>
				</form>
			</div>
        </div>
    `;

	const contentElement = document.getElementById('content');
	if (contentElement) {
		contentElement.innerHTML = editAvatarHTML;
		saveAvatar();
	}
	else
	{
		console.error('Content element not found');
	}
}

async function saveAvatar() {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

    console.log('saveInfo called'); // Debugging

    const editAvatarForm = document.getElementById('edit-avatar-form');
    if (!editAvatarForm) { console.error('Edit form not found'); return;}

   const cancelButton = document.getElementById('cancel-button');

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
                alert(data.message);
                loadContent('profile');
            }
            else
            {
                const errorData = await response.json();
                console.error('Edit info failed', errorData);
            }
        }
        catch (error)
        {
            console.error('Error during edit info', error);
        }
    });

	cancelButton.addEventListener('click', () => {
		console.log('Cancelled edit info'); // Debugging
		loadContent('profile');
	});
}