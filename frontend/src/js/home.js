import { loadContent } from "./router.js";
import { tournamentSetUp } from "./tournament.js"

export async function loadHome() {
    const htmlContent = `
        <div class="container-fluid d-flex justify-content-center align-items-center">
            <div class="card p-4" style="width: 20rem; background-color: rgba(255, 255, 255, 0);">
                <div class="card-body d-flex flex-column align-items-center">
                    <button class="btn btn-primary btn-lg mb-3" id="single-player-btn" translate="single player">Single Player</button>
                    <button class="btn btn-success btn-lg mb-3" id="local-multiplayer-btn" translate="local multiplayer">Local Multiplayer</button>
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
        </div>

    `;

    window.requestAnimationFrame(() => {
        const singlePlayer = document.getElementById('single-player-btn');
        const twoPlayer = document.getElementById('local-multiplayer-btn');
        // const remote =  document.getElementById('remote-multiplayer-btn');
        const tournamentButton = document.getElementById('tournament-btn');
        const tournamentOptions = document.getElementById('tournament-options');



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
        if (tournamentButton && tournamentOptions)
        {
            let optionsVisible = false;

            tournamentButton.addEventListener('click', (event) => {
                event.preventDefault();
                console.log('Tournament button clicked');
                
                optionsVisible = !optionsVisible;
                
                if (optionsVisible)
                {
                    tournamentOptions.classList.remove('d-none');
                    tournamentOptions.classList.add('d-flex');
                }
                else
                {
                    tournamentOptions.classList.add('d-none');
                    tournamentOptions.classList.remove('d-flex');
                }

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


        } 
        // if (remote) {
        //     remote.addEventListener('click', (event) => {
        //         event.preventDefault();
        //         loadContent('remote');
        //     });
        // }
    });
    
    return htmlContent;
}
