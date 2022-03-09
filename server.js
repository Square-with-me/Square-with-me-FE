require('dotenv').config();
const express = require('express');
const https = require('https');
const app = express();
const server = https.createServer(app);
const socket = require('socket.io');
const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', (socket) => {
  socket.on('join room', (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit('room full');
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit('all users', usersInThisRoom);
  });

  socket.on('sending signal', (payload) => {
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on('returning signal', (payload) => {
    io.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id];

    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
      console.log(room);
    }
  });
    // 채팅
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(roomId)
    });
  
    socket.on('send_message', (data) => {
      // socket.to(data.roomId).emit('receive_message', data);
      // 나를 제외한 같은 방의 사람들에게 (socket.broadcast.to(방 아이디))
      socket.broadcast.to(data.roomId).emit('receive_message', data);
    });
    socket.on('disconnect', () => {
      console.log('User Disconnected', socket.id);
    });
  });

server.listen(process.env.PORT || 8000, () =>
  console.log('server is running on port 8000')
);
