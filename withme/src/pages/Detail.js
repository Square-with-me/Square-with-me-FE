import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Chatting from '../components/Chatting';

import { history } from '../redux/configureStore';

// 방 입장
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io.connect('/');

const StyledVideo = styled.video`
  width: 100%;
  background-color: steelblue;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const Detail = (props) => {
  const [sideCount, setCount] = useState(0); // 오른쪽 박스에 몇개가 열려 있는지

  const [isSW, setIsSW] = useState(false); // 스톱워치
  const [isPP, setIsPP] = useState(false); // 참가자 목록
  const [isCT, setIsCT] = useState(false); // 채팅

  const [ischatting, setIsChatting] = useState(false);

  // 화상 채팅
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.id;

  // 사이드바 컨트롤
  useEffect(() => {
    const videoBox = document.getElementById('videoBox');

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

  // 채팅 열기, 닫기
  const openChatting = (e) => {
    if (ischatting) {
      setIsChatting(false);
    } else {
      setIsChatting(true);
    }
  };

  // 비디오 연결, 채팅 연결
  useEffect(() => {
    socket.emit('join_room', roomID);

    socketRef.current = io.connect('http://175.112.86.142:8000/');

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit('join room', roomID);
        //
        socketRef.current.on('all users', (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });
        socketRef.current.on('user joined', (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on('receiving returned signal', (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function exit() {
    console.log('나갈꺼임 말리지마라');
  }

  function leavingRoom() {
    socketRef.current.emit('byebye', exit);

    history.push('/');
  }

  return (
    <Container>
      <div id="top"></div>
      <div id="videoBox">
        <div id="videoContainer">
          {/* 본인 비디오 */}
          <StyledVideo muted ref={userVideo} autoPlay playsInline />
        </div>
        {peers.map((peer, index) => {
          return (
            <div id="videoContainer">
              <Video key={index} peer={peer} />
            </div>
          );
        })}
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
          <>
            <div className="rightState">
              <button
                onClick={(e) => {
                  openChatting(e);
                }}
              >
                C
              </button>
              <p>채팅</p>
              <button></button>
            </div>
            {ischatting ? <Chatting socket={socket} roomId={roomID} /> : ''}
          </>
        ) : (
          ''
        )}
      </div>
      <div id="bottom">
        <div id="centerButton">
          <button onClick={leavingRoom}>나가기</button>
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

  #videoContainer {
    display: flex;
    align-items: center;
    background-color: black;
    border-radius: 5px;
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
