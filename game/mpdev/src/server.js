import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

// Initialize app and socket.io server
const app = express();
const server = createServer(app);
const io = new Server(server);

/**
 * Make individual files available on http server
 */

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

/**
 * Socket.io connection and event handling
 */

const users = {left: '', right: ''}

io.on('connection', (socket) => {
  socket.username = ''
  socket.emit('requestlogin')
  socket.on('login', (username) => {
    if (socket.username !== '' || username === '') return
    socket.username = username
    if (users.left == '')
      users.left = username
    else if (username != users.left && users.right == '')
      users.right = username
    io.emit('users', users)
    socket.emit('logged', false, socket.username)
  })
  socket.on('logoff', (username) => {
    if (username === '') return
    if (username === 'boot') {
      users.left = ''
      users.right = ''
    }
    if (users.left == socket.username)
      users.left = ''
    else if (users.right == socket.username)
      users.right = ''
    socket.username = ''
    io.emit('users', users)
    socket.emit('logged', true, socket.username)
  })
  socket.on('startbutton', () => {
    if (!gamedata.run) {
      serverStart()
      gamedata.left += 10
      io.emit('startbutton');
    }
  });
  socket.on('requeststatus', () => {
    updateclient(socket)
  })
  socket.on('updown', (up, down) => updown(socket, up, down))
  socket.on('endgame', () => {
    if (gamedata.run)
      serverEnd()
  })
});

function updown(socket, up, down) {
  if (socket.username.charAt(0) === users.left.charAt(0) || socket.username.charAt(0) === users.right.charAt(0)) {
    if (socket.username == users.left) {
      moveUp = up
      moveDown = down
    } else if (socket.username == users.right) {
      rightUp = up
      rightDown = down
    }
  }
  updateclient(socket)
}

function updateclient(socket) {
  socket.emit('status', { left: ~~gamedata.left, right: ~~gamedata.right, ballX: ~~gamedata.ballX, ballY: ~~gamedata.ballY, run: gamedata.run})
}

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
let rightUp = false
let rightDown = false
let bounce = 0
var tick = 0
const gamedata = { tick: 0, left: 0, right: 0, ballX: 0, ballY: 0, ballDX: 0, ballDY: 0, ballpass: 0, run: false }
const score = { left: 0, right: 0 }

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
  { // move left paddle 
    if (moveUp) gamedata.left += playerspeed
    if (moveDown) gamedata.left -= playerspeed
    if (gamedata.left > xmax)
      gamedata.left = xmax
    else if (gamedata.left < -xmax)
      gamedata.left = -xmax
  }
  { // move right paddle 
    if (rightUp) gamedata.right += playerspeed
    if (rightDown) gamedata.right -= playerspeed
    if (gamedata.right > xmax)
      gamedata.right = xmax
    else if (gamedata.right < -xmax)
      gamedata.right = -xmax
  }
  if (!gamedata.run) return // stop here if game is not running
  gamedata.ballX += gamedata.ballDX
  if (gamedata.ballpass == 0 && (gamedata.ballX > xmax || gamedata.ballX < -xmax)) {
    if (checkHit()) {
      gamedata.ballX -= gamedata.ballDX
      if (gamedata.ballX > 0)
        gamedata.ballDY += (gamedata.ballY - gamedata.right) * gamedata.ballDY / hitTolerance
      else
        gamedata.ballDY += (gamedata.ballY - gamedata.left) * gamedata.ballDY / hitTolerance
      gamedata.ballDX *= -1.08
    } 
    else
      gamedata.ballpass = 1
  }
  gamedata.ballY += gamedata.ballDY
  if (gamedata.ballY > ymax || gamedata.ballY < -ymax) {
    gamedata.ballDY *= -1
    gamedata.ballY += gamedata.ballDY
  }
  if (gamedata.ballpass == 0) {
    // * right auto player
    if (users.right === '') {
      if (gamedata.right > gamedata.ballY) 
        gamedata.right -= Math.min(playerspeed * 0.8, gamedata.right - gamedata.ballY)
      else
        gamedata.right += Math.min(playerspeed * 0.8, gamedata.ballY - gamedata.right)
    }
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

setInterval(serverTick, 1000 / 120) // 120 Hz