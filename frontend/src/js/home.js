import { loadContent } from "./router.js";
import { tournamentSetUp } from "./tournament.js"
import { showAlert } from "./index.js";


export async function loadHome() {
    const htmlContent = `
        <div class="container-fluid d-flex justify-content-center align-items-center">
            <div class="card p-4" style="width: 20rem; background-color: rgba(255, 255, 255, 0);">
                <div class="card-body d-flex flex-column align-items-center">
                    <button class="btn btn-primary btn-lg mb-3" id="single-player-btn" translate="single player">Single Player</button>
                    <button class="btn btn-success btn-lg mb-3" id="local-multiplayer-btn" translate="local multiplayer">Local Multiplayer</button>
                    <button class="btn btn-default btn-lg mb-3" id="4player-btn" translate="4player">4 Player Local</button>
                    <button class="btn btn-warning btn-lg mb-3" id="tournament-btn" translate="tournament">Tournament</button>

                    <div id="tournament-waiting" class="d-none mt-3 flex-column align-items-center">
                    <p class="w-100 text-center mb-2" style="color: white;" translate="wait for tournament to start">Wait for tournament to start</p>
                    </div>

                    <div id="tournament-form-exists" class="d-none mt-3 flex-column align-items-center">
                        <button class="btn btn-link btn-md mb-3" id="back-to-invites" style="color: white" translate="back to invites">Back to invites</button>
                    </div>

                    <div id="enter-tournament" class="d-none mt-3 flex-column align-items-center">
                        <button class="btn btn-light btn-md mb-3" id="enter-tournament-btn" translate="enter tournament">Enter tournament</button>
                    </div>

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
        </div>

    `;

    window.requestAnimationFrame(() => {
        const singlePlayer = document.getElementById('single-player-btn');
        const twoPlayer = document.getElementById('local-multiplayer-btn');
        const fourPlayer = document.getElementById('4player-btn');
        const tournamentButton = document.getElementById('tournament-btn');
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
        if (fourPlayer) {
            fourPlayer.addEventListener('click', (event) => {
                event.preventDefault();
                loadContent('local4');
            });
        }
        
        tournamentButton.addEventListener('click', async (event) => {
            event.preventDefault();
            if (options === false)
                options = true;
            else if (options === true)
                options = false;
            setTournamentButtons(options);

            const fourPlayersButton = document.getElementById('four-players');
            const eightPlayersButton = document.getElementById('eight-players');
            const sixteenPlayersButton = document.getElementById('sixteen-players');

            if (fourPlayersButton) {
                fourPlayersButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    tournamentSetUp(4);
                });
            }
            if (eightPlayersButton) {
                eightPlayersButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    tournamentSetUp(8);
                });
            }
            if (sixteenPlayersButton) {
                sixteenPlayersButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    tournamentSetUp(16);
                });
            }


        });
    });
    return htmlContent;
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
