import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
//const s = require('./srv-lib') // require doesn't work in ES
import * as s from './srv-lib.js';

console.log('libvar:', s.libvar)
console.log('libtest:', s.libtest(0))

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
var conns = 0
const maxconns = 3

io.use((socket, next) => {
  conns++
  if (conns > maxconns) {
    next(new Error('maximum connections reached'));
  } else {
    next()
  }
})

function userlogin(socket, username) {
  if (socket.logged) return

}

io.on('connection', (socket) => {
  io.emit('logmsg', 'socket ' + socket.id + ' connected')
  //let padToFour = 9999 ? `000${conns}`.slice(-4) : conns; // some complicated code example for padding
  //socket.username = 'guest' + (9999 ? `000${conns}`.slice(-4) : conns)
  socket.username = ''
  socket.logged = false
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
    io.emit('logmsg', 'user ' + socket.username + ' login')
    socket.emit('loginresult', 'login success')
  })
  socket.on('logoff', (username) => {
    if (username === '') return
    if (username === 'boot') {
      users.left = ''
      users.right = ''
      return
    }
    if (users.left == socket.username)
      users.left = ''
    else if (users.right == socket.username)
      users.right = ''
    socket.username = ''
    io.emit('users', users)
    socket.emit('logged', true, socket.username)
    io.emit('logmsg', 'user ' + username + ' logoff')
    socket.emit('loginresult', 'logout success')
  })
  socket.on('requeststatus', () => {
    socket.emit('info', socket.id, socket.username, io.engine.clientsCount)
  })
  socket.on('findgame', () => findgame(socket))
});

function findgame(socket) {
  if (socket) {}
}

server.listen(7000, () => {
  console.log('server running at http://localhost:7000');
});