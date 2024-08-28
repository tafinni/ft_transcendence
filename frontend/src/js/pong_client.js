// pong_client.js

export function loadRemote() {
    draw();
}
// const canvas = document.getElementById('pongCanvas');
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
canvas.id = 'pongCanvas';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username') || `player${Math.floor(Math.random() * 1000)}`;

let playerId;
// let paddleY = 250;
let paddleDir = 0;
let ball = { x: 400, y: 300 };
let paddles = [{ y: 250 }, { y: 250 }];
let scores = [0, 0];
let socket;
// const socket = new WebSocket('ws://192.168.86.28:8080');

fetch('/get-server-url')
    .then(response => response.json())
    .then(data => {
        socket = new WebSocket(`${data.serverUrl}?username=${username}`);
        // Handle WebSocket connection...

        socket.onopen = () => {
            console.log('Connected to server');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'playerId') {
                playerId = data.playerId;
                console.log('You are player', playerId);
            } else if (data.type === 'gameState') {
                ball.x = data.ball.x;
                ball.y = data.ball.y;
                paddles[0].y = data.playerLeft.paddlePos;
                paddles[1].y = data.playerRight.paddlePos;
                scores[0] = data.playerLeft.score;
                scores[1] = data.playerRight.score;
                draw();
            }
        };

        // document.addEventListener('keydown', (event) => {
        //     if (event.key === 'ArrowUp' && paddleY > 0) {
        //         paddleY -= 50;
        //     } else if (event.key === 'ArrowDown' && paddleY < 500) {
        //         paddleY += 50;
        //     }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                paddleDir = -1;
            } else if (event.key === 'ArrowDown') {
                paddleDir = 1;
            }

            socket.send(JSON.stringify({ type: 'move', playerId, y: paddleDir }));
        });

    });

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(10, paddles[0].y, 10, 100);
    ctx.fillRect(780, paddles[1].y, 10, 100);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw scores
    ctx.font = '36px Arial';
    ctx.fillText(scores[0], 360, 50);
    ctx.fillText(scores[1], 420, 50);
}


// draw();

