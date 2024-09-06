import { loadContent } from "./router.js";

export async function loadHome() {
    const htmlContent = `
		<div class="container">
            <div class="start-game-buttons">
                <button class="btn btn-primary btn-lg mb-3" id="single-player-btn">Single Player</button>
                <button class="btn btn-secondary btn-lg mb-3" id="local-multiplayer-btn">Local Multiplayer</button>
                <button class="btn btn-success btn-lg mb-3" id="remote-multiplayer-btn">Remote Multiplayer</button>
            </div>
        </div>
    `;

    window.requestAnimationFrame(() => {
        const singlePlayer = document.getElementById('single-player-btn');
        const twoPlayer = document.getElementById('local-multiplayer-btn');
        // const remote =  document.getElementById('remote-multiplayer-btn');
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
        // if (remote) {
        //     remote.addEventListener('click', (event) => {
        //         event.preventDefault();
        //         loadContent('remote');
        //     });
        // }
    });
    
    return htmlContent;
}
