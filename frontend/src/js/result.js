import { getCookie } from './csrf.js';

export async function loadResult(scoreLeft, scoreRight, oppIsHuman) {

	const response = await fetch('http://localhost:8000/profile/', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const userData = await response.json();
    if (scoreLeft > 0 || scoreRight > 0){
        const csrftoken = getCookie('csrftoken');
        await fetch('http://localhost:8000/add_result/',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
                body: JSON.stringify({scoreLeft, scoreRight, oppIsHuman})
            });
    }
    const prefixHTML = `<div class="container mt-5"><div class="d-flex justify-content-center">
    <div class="d-flex card text-black bg-light border border-secondary m-4 justify-content-center" style="max-width: 300px;">
        <div class="card-header text-center">
            <h3>Result</h3>
        </div>
        <div class="card-body d-flex flex-column align-items-center justify-content-center">
            <h4 class="mb-3">`
    let midHTML = ``
    if (scoreLeft > scoreRight) midHTML = `Left player wins!`;
    else if (oppIsHuman) midHTML = `Right player wins!`;
    else midHTML = 'AI wins!'
    midHTML += `</h4><p class="fs-5">Final score is ${scoreLeft} - ${scoreRight}</p></div></div></div></div>`    
    return prefixHTML + midHTML;
}