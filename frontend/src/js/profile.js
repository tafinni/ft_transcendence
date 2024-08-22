import { loadContent } from "./router";

export async function loadProfile() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const userData = await response.json();

	return `
		<div class="container mt-5">
			<div class="row">
				<div class="col-md-4">
					<div class="card text-center">
						<div class="card-body">
						<img src="http://localhost:8000/${userData.avatar}" class="rounded-circle img-fluid mb-3" alt="Avatar" style="width: 150px; height: 150px;">							
                        <h4 class="card-title">${userData.display_name}</h4>
							<p class="text-muted">@${userData.username}</p>
						</div>
					</div>
				</div>
				<div class="col-md-8">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title">Personal Info</h4>
							<table class="table table-striped">
								<tbody>
									<tr>
										<th scope="row">First Name</th>
										<td>${userData.first_name}</td>
									</tr>
									<tr>
										<th scope="row">Last Name</th>
										<td>${userData.last_name}</td>
									</tr>
									<tr>
										<th scope="row">Display Name</th>
										<td>${userData.display_name}</td>
									</tr>
									<tr>
										<th scope="row">Username</th>
										<td>${userData.username}</td>
									</tr>
									<tr>
										<th scope="row">Email</th>
										<td>${userData.email}</td>
									</tr>
								</tbody>
							</table>
							<h4 class="card-title mt-4">Change Password</h4>
		
							<button type="submit" id="edit-button" class="btn btn-primary">Edit info</button>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

}


export async function editInfo() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const userData = await response.json();

	return `
       <div class="container mt-5">
            <h2>Edit Profile Information</h2>
            <form id="edit-info-form">
                <div class="form-group">
                    <label for="first_name">First Name</label>
                    <input type="text" id="first_name" class="form-control" value="${userData.first_name}" required>
                </div>
                <div class="form-group">
                    <label for="last_name">Last Name</label>
                    <input type="text" id="last_name" class="form-control" value="${userData.last_name}" required>
                </div>
                <div class="form-group">
                    <label for="display_name">Display Name</label>
                    <input type="text" id="display_name" class="form-control" value="${userData.display_name}" required>
                </div>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" class="form-control" value="${userData.username}" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-control" value="${userData.email}" required>
                </div>
                <div class="form-group">
                    <label for="avatar">Change Avatar</label>
                    <input type="file" id="avatar" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary mt-3">Save Changes</button>
				<button type="button" id="cancel-button" class="btn btn-link" >Cancel</button>
            </form>
        </div>
    `;
}

export async function saveInfo() {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	//const userData = await response.json();

    console.log('saveInfo called'); // Debugging
	console.log(`Display Name: ${display_name}`); // Debugging

    const editInfoForm = document.getElementById('edit-info-form');
    if (!editInfoForm) { console.error('Edit form not found'); return;}

   // const cancelButton = document.getElementById('cancel-button');

    editInfoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

		const first_name = document.getElementById('first_name').value;
		const last_name = document.getElementById('last_name').value;
        const display_name = document.getElementById('display_name').value;

        console.log('Edit info form submitted'); // Debugging

        try 
        {
            const response = await fetch('http://localhost:8000/update_profile/',
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ first_name, last_name, display_name })
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
}

export async function editButtonListener () {
	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

    const editButton = document.getElementById('edit-button');
    
    editButton.addEventListener('click', () => {
        console.log('Pressed edit button'); // Debugging
        loadContent('editInfo');
    });
}

