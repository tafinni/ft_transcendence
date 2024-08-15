import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
//const io = new Server(server);

const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this to restrict access to specific origins if needed
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

//const io = require('socket.io')(http, {
//  origins: '*:*'
//});
//const io = require('socket.io')(server, { origins: '*:*'})

//io.origins('*:*'); 
//io.set('origins', '*:*')

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('start game', (value) => {
    io.emit('game start', value)
  }) 
});

server.listen(8001, () => {
  console.log('server running at http://localhost:8001');
});
