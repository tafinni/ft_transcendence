const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const os = require('os');

function getServerIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback to localhost
}

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const serverIP = getServerIP();
console.log(serverIP);

const clients = [];

app.get('/get-server-url', (req, res) => {
    res.json({ serverUrl: `ws://${serverIP}:${PORT}` });
});

app.use(express.static('public'));

let games = new Map();

function createGameState(ball, playerLeft, playerRight, status = "running") {
    return {
        ball,
        playerLeft,
        playerRight,
        status,
    };
}

wss.on('connection', (ws, req) => {
    const queryParams = url.parse(req.url, true).query;
    const username = queryParams.username || `player${Math.floor(Math.random() * 1000)}`;
    const playerId = username;

    clients.push({ playerId, ws });
    console.log(`Player connected with username: ${username}`);

    ws.send(JSON.stringify({ type: 'playerId', playerId }));
    console.log("Sent id, clients length = ", clients.length);

    if (clients.length === 2) {
        const game1 = createGameState(
            { x: 400, y: 300, vx: 5, vy: 5 },
            { paddlePos: 250, score: 0, playerId: clients[0].playerId, socket: clients[0].ws },
            { paddlePos: 250, score: 0, playerId: clients[1].playerId, socket: clients[1].ws }
        );
        games.set(0, game1);
        console.log("Game initialized");
        startGameLoop();
    }

    ws.on('message', (message) => {
        const gState = games.get(0);
        const data = JSON.parse(message);
        if (data.type === 'move') {
            if (data.playerId === gState.playerLeft.playerId) {
                gState.playerLeft.paddleDir = data.y;
            }
            if (data.playerId === gState.playerRight.playerId) {
                gState.playerRight.paddleDir = data.y;
            }
        }
    });
});

function startGameLoop() {
    console.log("Game starts");
    setInterval(() => {
        updateGameState();
        sendGameState();
    }, 16); // ~60 FPS
}

function updateGameState() {
    const gState = games.get(0);
    gState.ball.x += gState.ball.vx;
    gState.ball.y += gState.ball.vy;

    if (gState.ball.y <= 0 || gState.ball.y >= 600) {
        gState.ball.vy = -gState.ball.vy;
    }

    if (gState.ball.x < 0) {
        gState.playerRight.score++;
        resetBall(gState);
    } else if (gState.ball.x > 800) {
        gState.playerLeft.score++;
        resetBall(gState);
    }

    if (
        (gState.ball.x <= 20 && gState.ball.y >= gState.playerLeft.paddlePos && gState.ball.y <= gState.playerLeft.paddlePos + 100) ||
        (gState.ball.x >= 780 && gState.ball.y >= gState.playerRight.paddlePos && gState.ball.y <= gState.playerRight.paddlePos + 100)
    ) {
        gState.ball.vx = -gState.ball.vx;
    }
    gState.playerLeft.paddlePos += gState.playerLeft.paddleDir * 10;
    gState.playerRight.paddlePos += gState.playerRight.paddleDir * 10;
}

function sendGameState() {
    const gState = games.get(0);

    const gameStateMessage = {
        type: 'gameState',
        ball: {
            x: gState.ball.x,
            y: gState.ball.y
        },
        playerLeft: {
            paddlePos: gState.playerLeft.paddlePos, // Changed from paddlePos to paddlePos
            score: gState.playerLeft.score
        },
        playerRight: {
            paddlePos: gState.playerRight.paddlePos, // Changed from paddlePos to paddleY
            score: gState.playerRight.score
        }
    };

    gState.playerLeft.socket.send(JSON.stringify(gameStateMessage));
    gState.playerRight.socket.send(JSON.stringify(gameStateMessage));
}

// function sendGameState() {
//     const gState = games.get(0);
//     const gStateObject = Object.fromEntries(gState);
//     const message = {
//         type: "gameState",
//         ...gStateObject,
//     };
//     gState.playerLeft.socket.send(JSON.stringify(message));
//     gState.playerRight.socket.send(JSON.stringify(message));
// }

function resetBall(gState) {
    gState.ball = { x: 400, y: 300, vx: 5 * (Math.random() > 0.5 ? 1 : -1), vy: 5 * (Math.random() > 0.5 ? 1 : -1) };
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
