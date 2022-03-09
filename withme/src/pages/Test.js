import Chatting from '../components/Chatting';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('/');

// package.json :  "proxy": "http://175.112.86.142:8000/",

const Test = () => {
  const [roomId, setRoomId] = useState('123');

  useEffect(() => {
    socket.emit('join_room', roomId);
  });
  return (
    <>
      <Chatting socket={socket} roomId={roomId} />
    </>
  );
};

export default Test;
