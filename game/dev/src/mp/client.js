//import { startGame } from './script.js'
import * as game from './script.js'

const socket = io.connect('http://localhost:8001');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

document.getElementById("start").addEventListener("click", function() {
    socket.emit('start game');
});

socket.on('game start', (value) => {
    //const element = document.getElementById("score");
    //element.textContent = "GAME START";
    document.querySelector('#test-comp').changeContent("GAME START")
    game.startGame();
})

