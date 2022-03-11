import Timer from '../components/Timer';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

// const socket = io.connect('/');

// package.json :  "proxy": "http://175.112.86.142:8000/",

const TimerTest = () => {
  const [roomId, setRoomId] = useState('123');

  // useEffect(() => {
  //   socket.emit('join_room', roomId);
  //   console.log(socket);
  // });
  return (
    <>
      <Timer roomId={roomId} />
    </>
  );
};

export default TimerTest;
