
export async function loadProfile() {

	const response = await fetch('http://localhost:8000/profile/');
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const userData = await response.json();

	return `
		<div class="container mt-5">
			<div class="row">
				<div class="col-md-4">
					<div class="card text-center">
						<div class="card-body">
							<img src="{userData.avatar}" class="rounded-circle img-fluid mb-3" alt="Avatar" style="width: 150px; height: 150px;">
							<h4 class="card-title">{userData.display_name}</h4>
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
										<td>{userData.display_name}</td>
									</tr>
									<tr>
										<th scope="row">Username</th>
										<td>${userData.username}</td>
									</tr>
									<tr>
										<th scope="row">Email</th>
										<td>{userData.email}</td>
									</tr>
								</tbody>
							</table>
							<h4 class="card-title mt-4">Change Password</h4>
							<form id="change-password-form">
								<div class="form-group">
									<label for="current_password">Current Password</label>
									<input type="password" class="form-control" id="current_password" placeholder="Enter current password" required>
								</div>
								<div class="form-group">
									<label for="new_password">New Password</label>
									<input type="password" class="form-control" id="new_password" placeholder="Enter new password" required>
								</div>
								<button type="submit" class="btn btn-primary">Change Password</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
}