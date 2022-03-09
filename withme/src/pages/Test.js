import Chatting from '../components/Chatting';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const socket = io.connect('/');

// package.json :  "proxy": "http://175.112.86.142:8000/",

const Test = () => {
  const [roomId, setRoomId] = useState('123');

  useEffect(() => {
    socket.emit('join_room', roomId);
  });
  return (
    <Container>
      <Box>
        <Chatting socket={socket} roomId={roomId} />
      </Box>
    </Container>
  );
};

const Container = styled.div`
  width: 1110px;
  height: 100vh;
  background-color: gold;
  margin: auto;
  display: grid;
  column-gap: 30px;
  grid-template-columns: repeat(12, 1fr);
`;

const Box = styled.div`
  grid-column: 10 / 14;
`;
export default Test;
