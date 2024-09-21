import { loadContent } from "./router.js";
import { tournamentSetUp } from "./tournament.js"
import { showAlert } from "./index.js";

// local tournament dropdown triggers double events, this is used to prevent the second event
var preventDuplicateLT = false

export async function loadHome() {
    const htmlContent = `<div class="row container-fluid d-flex justify-content-center align-items-start">
            <div class="row card p-4 align-items-start" style="width: 20rem; background-color: rgba(255, 255, 255, 0);">
                <div class="card-body d-flex flex-column align-items-center">
                    <h2 class="text-black bg-white px-3 py-2 mb-4 text-center rounded">2P Pong</h2>
                    <button class="btn btn-primary btn-lg mb-3" id="single-player-btn" translate="single player">Single Player</button>
                    <button class="btn btn-success btn-lg mb-3" id="local-multiplayer-btn" translate="local multiplayer">Local Multiplayer</button>
                    <div id="lt-event" class="dropdown d-flex flex-column">
                        <button class="btn btn-primary dropdown-toggle btn-lg mb-3" type="button" id="local-tournament" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Local Tournament</button>
                        <div class="dropdown-menu" aria-labelledby="local-tournament">
                        <a class="dropdown-item" href="#">2 players</a>
                        <a class="dropdown-item" href="#">4 players</a>
                        <a class="dropdown-item" href="#">8 players</a>
                        <a class="dropdown-item" href="#">16 players</a>
                    </div>
                    <button class="btn btn-warning btn-lg mb-3" id="tournament-btn" translate="tournament">Tournament</button>
                    <div id="tournament-options" class="d-none mt-3 flex-column align-items-center">
                        <p class="w-100 text-center mb-2" style="color: white;" translate="how many players?"></p>
                        <div id="num-players" class="d-flex justify-content-center w-100">
                            <button class="btn btn-light mx-1" id="four-players">4</button>
                            <button class="btn btn-light mx-1" id="eight-players">8</button>
                            <button class="btn btn-light mx-1" id="sixteen-players">16</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card p-4 align-items-start" style="width: 20rem; background-color: rgba(255, 255, 255, 0);">
                <div class="card-body d-flex flex-column align-items-center">
                    <h2 class="text-black bg-white px-3 py-2 mb-4 text-center rounded">4P Pong</h2>
                    <button class="btn btn-primary btn-lg mb-3" id="single-player4-btn" translate="single player">Single Player</button>
                    <button class="btn btn-success btn-lg mb-3" id="local-multiplayer4-btn" translate="local multiplayer">Local Multiplayer</button>
                </div>
            </div>
            <div class="card p-4 align-items-start" style="width: 20rem; background-color: rgba(255, 255, 255, 0);">
                <div class="card-body d-flex flex-column align-items-center">
                    <h2 class="text-black bg-white px-3 py-2 mb-4 text-center rounded">Tic-tac-toe</h2>
                    <button class="btn btn-primary btn-lg mb-3" id="single-player4-btn" translate="single player" disabled>Single Player</button>
                    <button class="btn btn-success btn-lg mb-3" id="local-multiplayer4-btn" translate="local multiplayer" disabled>Local Multiplayer</button>
                    <button class="btn btn-warning btn-lg mb-3" id="tournament-btn" translate="tournament" disabled>Tournament</button>
                    <div id="tournament-options" class="d-none mt-3 flex-column align-items-center">
                        <p class="w-100 text-center mb-2" style="color: white;" translate="how many players?"></p>
                        <div id="num-players" class="d-flex justify-content-center w-100">
                            <button class="btn btn-light mx-1" id="four-players">4</button>
                            <button class="btn btn-light mx-1" id="eight-players">8</button>
                            <button class="btn btn-light mx-1" id="sixteen-players">16</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    window.requestAnimationFrame(() => {
        const singlePlayer = document.getElementById('single-player-btn');
        const twoPlayer = document.getElementById('local-multiplayer-btn');
        //const tournamentButton = document.getElementById('tournament-btn');
        const localtourButton = document.getElementById('lt4')
        let options = false;

        if (singlePlayer) {
            singlePlayer.addEventListener('click', (event) => {
                event.preventDefault();
                loadContent('single');
            });
        }
        if (twoPlayer) {
            twoPlayer.addEventListener('click', (event) => {
                event.preventDefault();
                loadContent('localMulti');
            });
        }
        const dropdownContainer = document.getElementById('lt-event');
        
        dropdownContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('dropdown-item')) {
                event.preventDefault();
                if (!preventDuplicateLT) {
                    //console.log(`Selected option: ${event.target.textContent}`);
                    const option = event.target.textContent
                    if (option.indexOf('2') !== -1) startLocalTournament(2)
                    else if (option.indexOf('4') !== -1) startLocalTournament(4)
                    else if (option.indexOf('8') !== -1) startLocalTournament(8)
                    else if (option.indexOf('16') !== -1) startLocalTournament(16)
                    //console.log(event.target.textContent)
                    preventDuplicateLT = true
                }
                setTimeout(() => { preventDuplicateLT = false
                }, 200); // Adjust timeout as needed
                //console.log(event)
            }
        });
    });
    return htmlContent;
}

async function startLocalTournament(players) {
    loadContent('localtournament', players)
}

async function setTournamentButtons(options) {

    try
    {
        const tournamentOptions = document.getElementById('tournament-options');
        const tournamentWaiting = document.getElementById('tournament-waiting');
        const tournamentFormExists = document.getElementById('tournament-form-exists');
        const enterTournament = document.getElementById('enter-tournament');

        const backToInvitesButton = document.getElementById('back-to-invites');
        const enterTournamentButton = document.getElementById('enter-tournament-btn');
    
        const response = await fetch(`http://localhost:8000/is_user_in_tournament/`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Failed:', response.statusText);
            showAlert('Error occurred. Try again.', 'danger');
            return;
        }

        const data = await response.json();

        // second click closes options
        if (options === false) 
        {
            tournamentOptions.classList.add('d-none');
            tournamentOptions.classList.remove('d-flex');

            enterTournament.classList.add('d-none');
            enterTournament.classList.remove('d-flex');

            tournamentWaiting.classList.add('d-none');
            tournamentWaiting.classList.remove('d-flex');

            tournamentFormExists.classList.add('d-none');
            tournamentFormExists.classList.remove('d-flex');
        }
        // Player is in active tournament
        else if (data.in_tournament && data.status == 'Active')
        {
            enterTournament.classList.remove('d-none');
            enterTournament.classList.add('d-flex');

            tournamentWaiting.classList.add('d-none');
            tournamentWaiting.classList.remove('d-flex');

            tournamentOptions.classList.add('d-none');
            tournamentOptions.classList.remove('d-flex');

            tournamentFormExists.classList.add('d-none');
            tournamentFormExists.classList.remove('d-flex');
        }
        // Player is in a pending tournament
        else if (data.in_tournament && data.tournament_initiator !== data.user && data.status == 'Pending')
        {
            tournamentWaiting.classList.remove('d-none');
            tournamentWaiting.classList.add('d-flex');

            enterTournament.classList.add('d-none');
            enterTournament.classList.remove('d-flex');

            tournamentOptions.classList.add('d-none');
            tournamentOptions.classList.remove('d-flex');

            tournamentFormExists.classList.add('d-none');
            tournamentFormExists.classList.remove('d-flex');
        }
        // Player starter of pending tournament
        else if (data.in_tournament && data.tournament_initiator === data.user)
        {
            tournamentFormExists.classList.remove('d-none');
            tournamentFormExists.classList.add('d-flex');

            enterTournament.classList.add('d-none');
            enterTournament.classList.remove('d-flex');

            tournamentWaiting.classList.add('d-none');
            tournamentWaiting.classList.remove('d-flex');

            tournamentOptions.classList.add('d-none');
            tournamentOptions.classList.remove('d-flex');
        }
        // Player can start new tournament
        else 
        {
            tournamentOptions.classList.remove('d-none');
            tournamentOptions.classList.add('d-flex');

            enterTournament.classList.add('d-none');
            enterTournament.classList.remove('d-flex');

            tournamentWaiting.classList.add('d-none');
            tournamentWaiting.classList.remove('d-flex');

            tournamentFormExists.classList.add('d-none');
            tournamentFormExists.classList.remove('d-flex');
        }

        if (backToInvitesButton) {
            backToInvitesButton.addEventListener('click', (event) => {
                event.preventDefault();
                tournamentSetUp(4);
            });
        }
        if (enterTournamentButton) {
            enterTournamentButton.addEventListener('click', (event) => {
                event.preventDefault();
                loadContent('tournament-lobby');
            });
        }
    }
    catch (error)
    {
        console.error('Error during checking tournament status', error);
        showAlert('Error occurred. Try again.', 'danger');
    }
}
