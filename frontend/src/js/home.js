import { startQuickGame } from "./game";

export async function loadHome() {
    return `
        <button type="submit" id="solo-game-button" class="btn btn-info" translate="sologame"></button>
    `;
}

export function initializeHome() {
    const contentdiv = document.getElementById("content");
    //const canvas = document.getElementById("webgl"); // for zIndex but maybe not needed
    console.log('initialize home');

    // move this to game script
    document.addEventListener("keydown", onDocumentKeyDown, true);
    function onDocumentKeyDown(event) {
        var key_code = event.which
        if (key_code === 27) {
            if (contentdiv.style.visibility === "visible") {
                contentdiv.style.visibility = "hidden";
                //webgl.style.zIndex = 1;
            }
            else
                contentdiv.style.visibility = "visible";
        }
        //console.log(event.which);
    }

    const sologameButton = document.getElementById("solo-game-button");
    sologameButton.addEventListener('click', () => {
        console.log('Pressed solo game button'); // Debugging
		contentdiv.style.visibility = "hidden";
        startQuickGame();
	})
}