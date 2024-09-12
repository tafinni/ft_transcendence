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
    if (scoreLeft > scoreRight)
    {
        return `
        <h1>Home</h1>
            <p>Player ${userData.display_name} wins!</p>
            <p>Final score is ${scoreLeft} - ${scoreRight}!</p>
        `;
    }
    else
    {
        if (oppIsHuman)
        {
            return `
            <h1>Home</h1>
                <p>Player red wins!<p>
                <p>Final score is ${scoreLeft} - ${scoreRight}!</p>
            `;
        }
        else
        {
        return `
        <h1>Home</h1>
        <p>AI wins!<p>
        <p>Final score is ${scoreLeft} - ${scoreRight}!</p>
        `;
        }
    }
}