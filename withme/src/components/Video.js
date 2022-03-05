import styled from 'styled-components';

const Video = () => {
  return (
    <Container>
      <video></video>
    </Container>
  );
};

const Container = styled.div`
  min-width: 540px;
  min-height: 284px;
  display: flex;
  align-items: center;
  background-color: black;

  video {
    width: 100%;
    background-color: steelblue;
  }
`;

export default Video;
