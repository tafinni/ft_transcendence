import { getCookie } from './csrf.js';
import { showAlert } from './index.js';
import { loadContent } from './router.js';

export async function loadResult(scoreLeft, scoreRight, oppIsHuman, oppName) {

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
                body: JSON.stringify({scoreLeft, scoreRight, oppIsHuman, oppName})
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

export async function loadTourneyResult(scoreLeft, scoreRight, nameLeft, nameRight) {
    console.log('game info: ', nameLeft, scoreLeft, nameRight, scoreRight);
	if (nameRight === 'guest_player')
    {
        if (scoreLeft > scoreRight)
            showAlert('Player on the left wins!', 'warning');
        else
            showAlert('Player on the right wins!', 'warning');

            if (scoreLeft > 0 || scoreRight > 0){
                const csrftoken = getCookie('csrftoken');
                await fetch('http://localhost:8000/add_result/',
                    {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
                        body: JSON.stringify({scoreLeft, scoreRight, oppIsHuman: 2, oppName: 'Guest Player'})
                    });
            }
    }
    else
    {
        try
        {
            const csrftoken = getCookie('csrftoken');
            const response = await fetch('http://localhost:8000/add_tourney_result/',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
                    body: JSON.stringify({scoreLeft, scoreRight, nameLeft, nameRight})
                });
                const data = await response.json();
                console.log(data);
        }
        catch (error)
        {
            console.log(error);
        }
    }
    loadContent('home')
}