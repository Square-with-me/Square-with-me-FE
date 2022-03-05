import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Video from '../components/Video';

const Detail = () => {
  const [isSide, setIsSide] = useState(false); // 오른쪽 박스가 열려있는지
  const [sideCount, setCount] = useState(0); // 오른쪽 박스에 몇개가 열려 있는지

  const [isSW, setIsSW] = useState(false); // 스톱워치
  const [isPP, setIsPP] = useState(false); // 참가자 목록
  const [isCT, setIsCT] = useState(false); // 채팅

  // 사이드바 컨트롤
  useEffect(() => {
    const videoBox = document.getElementById('videoBox');
    console.log(sideCount);

    if (videoBox !== null && sideCount === 0) {
      videoBox.style.gridColumn = '1/13';
    } else if (videoBox !== null && sideCount > 0) {
      videoBox.style.gridColumn = '1/10';
    }
  }, [sideCount]);

  // 사이드바 여는 버튼 1개라도 눌렀을 경우
  const onClickRight = (e) => {
    // 스톱워치 버튼을 누른 경우
    if (e.target.outerText === '1') {
      // 이미 있는 경우
      if (isSW) {
        setIsSW(false);
        setCount(sideCount - 1);
      }
      // 없었던 경우
      else {
        setIsSW(true);
        setCount(sideCount + 1);
      }
    }

    // 참가자 목록 버튼을 누른 경우
    else if (e.target.outerText === '2') {
      // 이미 있는 경우
      if (isPP) {
        setIsPP(false);
        setCount(sideCount - 1);
      }
      // 없었던 경우
      else {
        setIsPP(true);
        setCount(sideCount + 1);
      }
    }

    // 채팅 버튼을 누른 경우
    else if (e.target.outerText === '3') {
      // 이미 있는 경우
      if (isCT) {
        setIsCT(false);
        setCount(sideCount - 1);
      }
      // 없었던 경우
      else {
        setIsCT(true);
        setCount(sideCount + 1);
      }
    }
  };

  return (
    <Container>
      <div id="top"></div>
      <div id="videoBox">
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
      <div id="rightBox">
        {isSW ? (
          <div className="rightState" id="stopwatch">
            <p>스톱워치</p>
            <button></button>
          </div>
        ) : (
          ''
        )}
        {isPP ? (
          <div className="rightState">
            <p>참가자</p>
            <button></button>
          </div>
        ) : (
          ''
        )}
        {isCT ? (
          <div className="rightState">
            <p>채팅</p>
            <button></button>
          </div>
        ) : (
          ''
        )}
      </div>
      <div id="bottom">
        <div id="centerButton">
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
        <div id="endButton">
          <button onClick={onClickRight}>1</button>
          <button onClick={onClickRight}>2</button>
          <button onClick={onClickRight}>3</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* 보완할 점 1. 반응형으로 바꾸기 calc 공부하기 */
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
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(40%, 1fr));
    gap: 30px;
    justify-content: space-between;
    align-content: space-between;
  }

  #rightBox {
    visibility: hidden;
    width: 100%;
    height: 100%;
    background-color: royalblue;
    grid-column: 10/13;

    animation: show 1s;
    animation-fill-mode: forwards;

    button {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    @keyframes show {
      from {
        visibility: hidden;
      }
      to {
        visibility: visible;
      }
    }

    @keyframes slide-in {
      from {
        visibility: hidden;
        margin-left: 50%;
      }
      to {
        visibility: visible;
      }
    }

    /* @keyframes slide-out {
      from {
        visibility: visible;
      }
      to {
        visibility: hidden;
        margin-left: 50%;
      }
    } */

    .rightState {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: red;

      animation: slide-in 1s;
      animation-fill-mode: forwards;

      margin: 5%;
      padding: 0 5%;
    }
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
      display: flex;
      justify-self: center;
      align-items: center;

      button {
        width: 32px;
        height: 32px;
        background-color: red;
        margin: 0 5px;
      }
    }

    #endButton {
      height: 60px;
      grid-column: 3/4;
      display: flex;
      justify-self: end;
      align-items: center;

      button {
        width: 32px;
        height: 32px;
        background-color: blue;
        border-radius: 50%;
        margin: 0 5px;
      }
    }
  }
`;

export default Detail;
