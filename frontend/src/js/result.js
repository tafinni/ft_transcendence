import { getCookie } from './csrf.js';
import { loadContent } from './router.js';

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

export async function loadTourneyResult(scoreLeft, scoreRight, name1, name2) {
    try {
        // Получаем идентификатор турнира
        const response = await fetch('http://localhost:8000/is_user_in_tournament/', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Failed to retrieve tournament ID:', response.statusText);
            return;
        }

        const data = await response.json();
        const tournament_id = data.tournament_id;

        // Проверяем, что tournament_id был получен
        if (!tournament_id) {
            console.error('Tournament ID not found');
            return;
        }

        // Отправляем результат турнира
        const csrftoken = getCookie('csrftoken');
        const resultResponse = await fetch('http://localhost:8000/add_tourney_result/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                scoreLeft,
                scoreRight,
                name1,
                name2,
                tournament_id // Добавляем tournament_id в запрос
            })
        });

        if (!resultResponse.ok) {
            console.error('Failed to submit tournament result:', resultResponse.statusText);
            return;
        }

        // Логируем успешный результат
      //  console.log('Tournament result successfully submitted');
        loadContent('tournament-lobby');

    } catch (error) {
        console.error('Error with tournament result', error);
    }
}