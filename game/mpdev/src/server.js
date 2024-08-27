import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
//import * as THREE from 'three';


const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.get('/client.js', (req, res) => {
  res.sendFile(join(__dirname, 'client.js'));
});

app.get('/game.js', (req, res) => {
  res.sendFile(join(__dirname, 'game.js'));
});

app.use('/build/three.module.js', 
  express.static(join(__dirname, '../node_modules/three/build/three.module.js'))
);

io.on('connection', (socket) => {
  socket.on('startbutton', () => {
    if (!gamedata.run) {
      serverStart()
      gamedata.left += 10
      io.emit('startbutton');
    }
  });
  socket.on('requeststatus', () => {
    socket.emit('status', gamedata)
  })
  socket.on('up', () => {
    gamedata.up = true
    gamedata.down = false
  })
  socket.on('down', () => {
    gamedata.up = false
    gamedata.down = true
  })
  socket.on('updown', (up, down) => {
    moveUp = up
    moveDown = down
    socket.emit('status', gamedata)
  })
  socket.on('endgame', () => {
    if (gamedata.run)
      serverEnd()
  })
});

server.listen(7000, () => {
  console.log('server running at http://localhost:7000');
});

/**
 * Serverside game logic
 */

const ballspeed = 10000
const playerspeed = 20000
const xmax = 1000000
const ymax = 1000000
const hitTolerance = 400000
const ticksToEnd = 200

let moveUp = false
let moveDown = false
const gamedata = { tick: 0, left: 0, right: 0, ballX: 0, ballY: 0, ballDX: 0, ballDY: 0, ballpass: 0, run: false }
const score = {left: 0, right: 0 }

function serverStart() {
  serverEnd()
  gamedata.ballDX = ballspeed
    gamedata.ballDY = Math.random() * ballspeed
    if (Math.floor(Math.random() * 2) == 1)
      gamedata.ballDX *= -1
    if (Math.floor(Math.random() * 2) == 1)
      gamedata.ballDY *= -1
    gamedata.run = true
}

function serverEnd() {
  const end = { tick: 0, left: 0, right: 0, ballX: 0, ballY: 0, ballDX: 0, ballDY: 0, ballpass: 0, run: false }
  Object.assign(gamedata, end)
}

function serverTick() {
  if (moveUp) gamedata.left += playerspeed
  if (moveDown) gamedata.left -= playerspeed
  if (gamedata.left > xmax)
    gamedata.left = xmax
  else if (gamedata.left < -xmax)
    gamedata.left = -xmax
  if (!gamedata.run) return
  gamedata.ballX += gamedata.ballDX
  if (gamedata.ballpass == 0 && (gamedata.ballX > xmax || gamedata.ballX < -xmax)) {
    if (checkHit()) {
      gamedata.ballDX *= -1.08
      gamedata.ballX += gamedata.ballDX
    } else
      gamedata.ballpass = 1
  }
  gamedata.ballY += gamedata.ballDY
  if (gamedata.ballY > ymax || gamedata.ballY < -ymax) {
    gamedata.ballDY *= -1
    gamedata.ballY += gamedata.ballDY
  }
  if (gamedata.ballpass == 0) {
    if (gamedata.right > gamedata.ballY) 
      gamedata.right -= Math.min(playerspeed * 0.9, gamedata.right - gamedata.ballY)
    else
      gamedata.right += Math.min(playerspeed * 0.9, gamedata.ballY - gamedata.right)
  }
  else {
    gamedata.ballpass += 1
    if (gamedata.ballpass > ticksToEnd) {
      if (gamedata.ballX < 0)
        score.right += 1
      else
        score.left += 1
      serverEnd()      
      io.emit('score', score)
    }
  }
}

function checkHit() {
  //console.log('left: ', gamedata.left)
  //console.log('right: ', gamedata.right)
  //console.log('ballX: ', gamedata.ballX)
  let x = gamedata.left
  if (gamedata.ballX > 0)
    x = gamedata.right
  //console.log('x: ', x)
  x -= gamedata.ballY
  //console.log('x-: ', x)
  if (x < 0) x *= -1
  //console.log('tolerance: ', x)
  if (x <= hitTolerance)
    return true
  return false
}

setInterval(serverTick, 1000 / 100) // 100 Hz