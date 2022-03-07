import styled from 'styled-components';

const Video = () => {
  return (
    <Container>
      <video></video>
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
