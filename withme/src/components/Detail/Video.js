import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <Container>
      <video playsInline autoPlay ref={ref}></video>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  border-radius: 5px;

  video {
    width: 100%;
    background-color: steelblue;
  }
`;

export default Video;
