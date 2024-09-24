import { getCookie } from './csrf.js';
import { loadContent } from './router.js';

export async function loadResult(scoreLeft, scoreRight, oppIsHuman, oppName) {
    try
    {
        const response = await fetch('http://localhost:8000/profile/', {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) { console.error('Failed loading profile:', response.statusText); return `<h1>Error loading profile</h1>`; }

	const userData = await response.json();
    if (scoreLeft > 0 || scoreRight > 0){
        try
        {
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
        catch (error)
        {
            console.log(error)
        }
    }

    if (oppIsHuman == false)
        loadContent('home');

    if (scoreLeft > scoreRight)
    {
        return `
            <p class="w-100" style="color: white;">${userData.display_name} wins!</p>
            <p class="w-100" style="color: white;">Final score is ${scoreLeft} - ${scoreRight}!</p>
        `;
    }
    else
    {
        if (oppIsHuman)
        {
            return `
                <p class="w-100" style="color: white;">${oppName} wins!<p>
                <p class="w-100" style="color: white;">Final score is ${scoreLeft} - ${scoreRight}!</p>
            `;
        }
        else
        {
        return `
        <p class="w-100" style="color: white;>AI wins!<p>
        <p class="w-100" style="color: white;>Final score is ${scoreLeft} - ${scoreRight}!</p>
        `;
        }
    }
    }
    catch (error)
    {
        console.log(error);
    }
}

export async function loadTourneyResult(scoreLeft, scoreRight, nameLeft, nameRight) {
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
        console.log(error)
    }    
    loadContent('home')
}