import React, { useState } from 'react';
import styled from 'styled-components';
import Video from '../components/Video';

const Detail = () => {
  const [isSide, setIsSide] = useState(false);
  return (
    <Container>
      <div id="top"></div>
      <div id="videoBox">
        <Video />
        <Video />
        <Video />
      </div>
      {/* <div id="rightBox">
        <div id="stopWatchBox">
          <p>스톱워치</p>
        </div>
        <div id="participantBox">
          <p>참가자</p>
        </div>
        <div id="chattingBox">
          <p>스톱워치</p>
        </div>
      </div> */}
      <div id="bottom">
        <div id="centerButton">
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
        <div id="endButton">
          <button></button>
          <button></button>
          <button></button>
        </div>
      </div>
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
  grid-template-rows: 70px 1fr 75px;
  grid-template-columns: repeat(12, 1fr);

  #top {
    background-color: silver;
    grid-row: 1/2;
    grid-column: 1 / 13;
  }

  #videoBox {
    background-color: springgreen;
    grid-row: 2 / 3;
    grid-column: 1 / 13;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(540px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(284px, 1fr));
    gap: 30px;
    justify-content: space-between;
    align-content: space-between;
  }

  #rightBox {
    visibility: collapse;
    background-color: royalblue;
  }
  #bottom {
    background-color: tomato;
    grid-row: 3/4;
    grid-column: 1/13;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    #centerButton {
      height: 60px;
      grid-column: 2/3;
      justify-self: center;

      button {
        background-color: red;
        width: 32px;
        height: 32px;
        margin: 14px;
      }
    }

    #endButton {
      height: 60px;
      grid-column: 3/4;
      justify-self: end;

      button {
        background-color: blue;
        width: 28px;
        height: 28px;
        margin: 14px;
      }
    }
  }
`;

export default Detail;
