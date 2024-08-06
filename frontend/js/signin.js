export function loadSignIn() {
	return `
		<div class="container-fluid d-flex justify-content-center align-items-center vh-100 bg-dark">
			<div class="card p-4" style="width: 20rem;">
				<h3 class="card-title text-center mb-4">Sign In</h3>
				<form>
					<div class="form-group mb-3">
						<label for="username" class="form-label">Username</label>
						<input type="text" class="form-control" id="username" placeholder="Enter username" required>
					</div>
					<div class="form-group mb-3">
						<label for="password" class="form-label">Password</label>
						<input type="password" class="form-control" id="password" placeholder="Enter password" required>
					</div>
					<button type="submit" class="btn btn-primary w-100">Sign In</button>
				</form>
			</div>
		</div>
	`;
}
