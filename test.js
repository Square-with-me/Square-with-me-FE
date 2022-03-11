const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { disconnect } = require('process');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`유저아이디 : ${socket.id} 방이름 : ${data}`);
  });
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
    console.log(data);
  });
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});
