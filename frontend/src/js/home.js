export async function loadHome() {
    return `
		<div class="container">
            <div class="start-game-buttons">
                <button class="btn btn-primary btn-lg mb-3" id="single-player-btn">Single Player</button>
                <button class="btn btn-secondary btn-lg mb-3" id="local-multiplayer-btn">Local Multiplayer</button>
                <button class="btn btn-success btn-lg mb-3" id="remote-multiplayer-btn">Remote Multiplayer</button>
            </div>

        </div>
    `;
}

