import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Timer from '../components/Detail/Timer';
import Chatting from '../components/Detail/Chatting';
import { useParams } from 'react-router-dom';

import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';

// 방 입장
import io from 'socket.io-client';
import Peer from 'simple-peer';

// icons
import {ReactComponent as OnMic} from "../assets/inRoom/onMicIcon.svg"
import {ReactComponent as OffMic} from "../assets/inRoom/offMicIcon.svg"
import {ReactComponent as OnCamera} from "../assets/inRoom/onCameraIcon.svg"
import {ReactComponent as OffCamera} from "../assets/inRoom/offCameraIcon.svg"
// import {ReactComponent as Timer} from "../assets/inRoom/timerIcon.svg"
// import {ReactComponent as UserList} from "../assets/inRoom/userListIcon.svg"
// import {ReactComponent as Chatting} from "../assets/inRoom/chattingIcon.svg"

// emotion icons
import {ReactComponent as ChooseEmotion} from "../assets/inRoomEmotion/chooseEmotion.svg"
import RoomInfo from '../components/Detail/RoomInfo';
import { useDispatch, useSelector } from 'react-redux';
import Parti from '../components/Detail/Parti';
import Logo from '../components/Main/Logo';
// import {ReactComponent as Angry} from "../assets/inRoomEmotion/angryFaceIcon.svg"
// import {ReactComponent as Heart} from "../assets/inRoomEmotion/heartIcon.svg"
// import {ReactComponent as Like} from "../assets/inRoomEmotion/likeIcon.svg"
// import {ReactComponent as LoveEyes} from "../assets/inRoomEmotion/loveEyesFaceIcon.svg"
// import {ReactComponent as Sad} from "../assets/inRoomEmotion/sadFaceIcon.svg"
// import {ReactComponent as Smile} from "../assets/inRoomEmotion/smileFaceIcon.svg"

// sadFaceIcon (inRoomEmotion)

const StyledVideo = styled.video`
  width: 100%;
  background-color: steelblue;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    function onStream(stream) {
      ref.current.srcObject = stream;
    }
    props.peer.on('stream', onStream);
    return () => {
      props.peer.off('stream', onStream);
    }
  }, [props.peer]);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};


const Detail = (props) => {
  const user = useSelector((store) => store.user.user);
  const room = useSelector((store) => store.room.myRoom);

  const dispatch =useDispatch()
  // const [mic, setMic] = useState("ok");
  // const [camera, setCamera] = useState("ok");
  const [sideCount, setCount] = useState(0); // 오른쪽 박스에 몇개가 열려 있는지

  const [isSW, setIsSW] = useState(false); // 스톱워치
  const [isPP, setIsPP] = useState(false); // 참가자 목록
  const [isCT, setIsCT] = useState(false); // 채팅

  const [isTimer, setIsTimer] = useState(false); // 스톱워치
  const [isUserList, setIsUserList] = useState(false); // 참가자 목록
  const [ischatting, setIsChatting] = useState(false); // 채팅
  
  // 화상 채팅
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  const [stream, setStream] = useState(null)

  let params = useParams();

  // 사이드바 컨트롤
  useEffect(() => {
    const videoBox = document.getElementById('videoBox');

    if (videoBox !== null && sideCount === 0) {
      videoBox.style.gridColumn = '1/13';
    } else if (videoBox !== null && sideCount > 0) {
      videoBox.style.gridColumn = '1/10';
    }
  }, [sideCount]);

  // 스톱워치 rightBox에 나타내기 없애기
  const onClickSW = (e) => {
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

  // 참여자 명단 rightBox에 나타내기 없애기
  const onClickPP = (e) => {
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

  // 채팅 rightBox에 나타내기 없애기
  const onClickCT = (e) => {
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

  // rightBox에서 스톱워치, 참여자 명단, 채팅 중 하나만 열리게 하기
  // 스톱워치 열기, 닫기
  const openTimer = (e) => {
    if (isTimer) {
      setIsTimer(false);
    } else {
      setIsTimer(true);
      setIsUserList(false);
      setIsChatting(false);
    }
  };

  // 참여자 명단 열기, 닫기
  const openUserList = (e) => {
    if (isUserList) {
      setIsUserList(false);
    } else {
      setIsTimer(false);
      setIsUserList(true);
      setIsChatting(false);
    }
  };

  // 채팅 열기, 닫기
  const openChatting = (e) => {
    if (ischatting) {
      setIsChatting(false);
    } else {
      setIsTimer(false);
      setIsUserList(false);
      setIsChatting(true);
    }
  };

/** @memo stream 받는 effect */
useEffect(() => {
  // socketRef.current = io.connect('http://175.112.86.142:8088/');
  socketRef.current = io.connect('15.164.48.35:80');
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  }).then(stream => {
    setStream(stream);
    userVideo.current.srcObject = stream;

    const roomId = params.id;
    const nickname = user.nickname;

    const today = new Date()
    const date = today.getDate()

    const data = {
      roomId,
      nickname,
      userId:user.id,
      categoryId:room.category.id,
      date,
      profileImg:user.profileImg,
      statusMsg: user.statusMsg,
    };

    socketRef.current.emit('join room', data, roomFull);
  });
}, [params.id]);

/** @memo join room 했을 때 데이터 제대로 전달 안 됐을 경우 */
useEffect(() => {
  function noData() {
    alert("데이터 전달 오류");
    history.push("/");
  };

  socketRef.current.on("no data", noData);

  return () => {
    socketRef.current.off("no data", noData);
  };
}, []);

/** @memo 새로 들어온 사람이 다른 유저 목록 받는 effect */
useEffect(() => {
  if(stream == null) {
    return ;
  };

  function onSendUsers(payload) {
    console.log(payload.otherUsers)
    if(payload.otherUsers.length !== 0) {
      dispatch(userActions.userInfo(payload.otherUsers))
    }
    payload.otherSockets.map((user) => {
      const peer = createPeer(user.socketId, socketRef.current.id, stream);

      const peerObj = {
        peerId: user.socketId,
        peerNickname: user.nickname,
        peer,
      };

      peersRef.current.push(peerObj);
      setPeers(prevPeers => [...prevPeers, peerObj]);
    });
  }
  socketRef.current.on("send users", onSendUsers);

  return () => {
    socketRef.current.off("send users", onSendUsers);
  };
}, [stream]);

/** @memo 피어 연결 위해 새로 들어온 유저 정보 받는 effect */
useEffect(() => {
  if(stream == null) {
    return ;
  };

  const onUserJoined = (payload) => {
    // console.log(payload.userInfo)
    dispatch(userActions.userInfo( [ payload.userInfo ] ))
    const peer = addPeer(payload.signal, payload.callerId, stream);
    const newPeer = {
      peerId: payload.callerId,
      peerNickname: payload.callerNickname,
      peer,
    };

    peersRef.current.push(newPeer);

    setPeers(prevPeers => [...prevPeers, newPeer]);
  };

  socketRef.current.on("user joined", onUserJoined);

  return () => {
    socketRef.current.off("user joined", onUserJoined);
  }
}, [stream, peers])

/** @memo return signal effect */
useEffect(() => {
  if(stream == null) {
    return ;
  };

  const onReturnSignal = (payload) => {
    const item = peersRef.current.find((p) => p.peerId === payload.id);
    item.peer.signal(payload.signal);
  };

  socketRef.current.on("receive returned signal", onReturnSignal);

  return () => {
    socketRef.current.off("receive returned signal", onReturnSignal);
  };
}, [stream]);

/** @memo exit effect */
useEffect(() => {
  if(stream == null) {
    return ;
  };

  const onUserLeft = (payload) => {
    console.log(payload.userInfo, "님이 나갔습니다.");  // 참가자 나감 알림 용
    dispatch(userActions.deleteUserInfo(payload.userInfo.id))
    const peerObj = peersRef.current.find(p => p.peerId === payload.socketId);
    if(peerObj) {
      peerObj.peer.on("close", () => {
        peerObj.peer.destroy();
      });
    };
    const newPeers = peersRef.current.filter(p => p.peerId !== payload.socketId);
    peersRef.current = newPeers;

    setPeers(oldPeers => oldPeers.filter(p => p.peerId !== payload.socketId));
  };

  socketRef.current.on("user left", onUserLeft);

  return () => {
   socketRef.current.off("user left", onUserLeft);
  };
}, [stream, peers]);

function createPeer(userToSignal, callerId, stream) {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  peer.on('signal', (signal) => {
    socketRef.current.emit('send signal', {
      config: { iceServers: [{ url: "stun:stun.l.google.com:19302" }] },
      userToSignal,
      callerId,
      signal,
    });
  });

  return peer;
}

function addPeer(incomingSignal, callerId, stream) {
  const peer = new Peer({
    config: { iceServers: [{ url: "stun:stun.l.google.com:19302" }] },
    initiator: false,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal) => {
    socketRef.current.emit("returning signal", { signal, callerId });
  });

  peer.signal(incomingSignal);

  return peer;
}

const roomFull = () => {
  alert("꽉 찼단다 애송아");
  history.push("/");
};

const [videoOn, setVideoOn] = useState(true);
const [audioOn, setAudioOn] = useState(false);

const handleVideoOnOff = () => {

  userVideo.current.srcObject.getVideoTracks().forEach(track => (
    track.enabled = !track.enabled
  ));
  if (videoOn) {
    setVideoOn(false);
  } else {
    setVideoOn(true);
  }
}
const handleAudioOnOff = () => {
  userVideo.current.srcObject.getAudioTracks().forEach(track => (
    track.enabled = !track.enabled
  ));
  if (audioOn) {
    setAudioOn(false);
  } else {
    setAudioOn(true);
  }
}

//흐른 시간 체크
const [openTime, setOpenTime] = useState(new Date().toString())
const [diffTime, setDiffTime] = useState();

const interval = useRef();

function saveTime() {
  const closeTime = new Date();

  setDiffTime(Math.abs( closeTime - Date.parse(openTime) ) / 60000);

  const prevTime = localStorage.getItem("time")
  if(prevTime){
    const today =new Date().getDate();
    if(prevTime.date === today){
      //기존 데이터에 새운 데이터 추가해서 저장
      const newTime = prevTime[room.category.id]+ diffTime
      localStorage.setItem("time", JSON.stringify(newTime))
    }else{
      //기존 데이터 초기화 하고 새로 저장
      const data ={
        date : new Date().getDate(),
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
      }
      data[room.category.id] = diffTime;
      localStorage.setItem("time", JSON.stringify(data))
    }
  }
  else{
    const data ={
      date : new Date().getDate(),
      1:0,
      2:0,
      3:0,
      4:0,
      5:0,
      6:0,
    }
    data[room.category.id] = diffTime;
    localStorage.setItem("time", JSON.stringify(data))
  }


  setTimeout(() => {
    socketRef.current.emit("save_time", diffTime)
  }, [1500])
}

useEffect(() => {
  interval.current = setInterval(saveTime, 180000);

  return () => {
    clearInterval(interval.current);
  }
}, [diffTime])
  
const [date, setDate] = useState(0)

useEffect(()=>{
  const today = new Date()
  const date = today.getDate()
  setDate(date)
},[])

function handleEnd() {
  window.location.replace('/')
};

// useEffect(() => {
//   console.log('peers table')
//   console.table(peers);
// }, [peers]);

  return (
    <Back>
    <Container>
      {/* <Back/> */}
      <div id="top">
      <div className="logo" onClick={() => history.replace('/')}>
        <Logo/>
      <div>
          <RoomInfo room={room}/>
        </div>
        </div>
      </div>
      <div id="videoBox">
      <div key="my-video" className="videoContainer">
          {/* 본인 비디오 */}
          <StyledVideo muted ref={userVideo} autoPlay playsInline />
        </div>
        {peers.map((peer) => {
          return (
            <div key={peer.peerId} className="videoContainer">
               <Video peer={peer.peer} />
            </div>
          );
        })}
      </div>
      <div id="rightBox">
        {isSW ? (
          <>
            <div className="designBox" id="stopwatch">
              <div className="flex">
              <Button>
                { isTimer === false ? (
                  <div onClick={() => openTimer(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 2.06689L10.9333 8.00023L5 13.9336" stroke="#8A8BA3" strokeWidth="2" strokeMiterlimit="10"/>
                    </svg>
                  </div>
                ) : (
                  <div onClick={() => openTimer(true)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999" stroke="#8A8BA3" strokeWidth="2" strokeMiterlimit="10"/>
                    </svg>
                  </div>
                )}
              </Button>
                <p>타이머</p>
                <Button>
                  <div onClick={() => setIsSW(false) < setCount(sideCount - 1)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.66675 2.6665L13.3334 13.3332" stroke="#33344B" strokeWidth="2" strokeMiterlimit="10"/>
                      <path d="M13.3334 2.6665L2.66675 13.3332" stroke="#33344B" strokeWidth="2" strokeMiterlimit="10"/>
                    </svg>
                  </div>
                </Button>
              </div>
              {isTimer ? <Timer socketRef={socketRef} roomId={params.id} /> : ''}
            </div>
          </>
        ) : (
          ''
        )}
        {isPP ? (
          <div className="designBox">
            <div className="flex">
              <Button>
                { isUserList === false ? (
                  <div onClick={() => openUserList(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 2.06689L10.9333 8.00023L5 13.9336" stroke="#8A8BA3" strokeWidth="2" strokeMiterlimit="10"/>
                    </svg>
                  </div>
                ) : (
                  <div onClick={() => openUserList(true)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999" stroke="#8A8BA3" strokeWidth="2" strokeMiterlimit="10"/>
                    </svg>
                  </div>
                )}
              </Button>
              <p>참가자</p>
              <Button>
              <div onClick={() => setIsPP(false) < setCount(sideCount - 1)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.66675 2.6665L13.3334 13.3332" stroke="#33344B" strokeWidth="2" strokeMiterlimit="10"/>
                  <path d="M13.3334 2.6665L2.66675 13.3332" stroke="#33344B" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
              </div>
              </Button>
            </div>
            {isUserList?<Parti me={user} />:null}
          </div>
        ) : (
          ''
        )}
        {isCT ? (
          <>
            <div className="designBox">
              <div className="flex">
                <Button>
                  { ischatting === false ? (
                    <div onClick={() => openChatting(false)}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 2.06689L10.9333 8.00023L5 13.9336" stroke="#8A8BA3" strokeWidth="2" strokeMiterlimit="10"/>
                      </svg>
                    </div>
                  ) : (
                    <div onClick={() => openChatting(true)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999" stroke="#8A8BA3" strokeWidth="2" strokeMiterlimit="10"/>
                      </svg>
                    </div>
                  )}
                </Button>
                <p>채팅</p>
                <Button>
                <div onClick={() => setIsCT(false) < setCount(sideCount - 1)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.66675 2.6665L13.3334 13.3332" stroke="#33344B" strokeWidth="2" strokeMiterlimit="10"/>
                    <path d="M13.3334 2.6665L2.66675 13.3332" stroke="#33344B" strokeWidth="2" strokeMiterlimit="10"/>
                  </svg>
                </div>
                </Button>
              </div>
              {ischatting ? <Chatting socketRef={socketRef} roomId={params.id} /> : ''}
            </div>
          </>
        ) : (
          ''
        )}
      </div>
      <div id="bottom">
        <div id="centerButton">
          <div
            style={{
              display: "flex",
              margin: " 0px 16px",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {audioOn ? (
              <OnMic
                width="32px"
                fill="#8A8BA3"
                onClick={handleAudioOnOff}
              />
            ) : (
              <OffMic
                width="32px"
                fill="#8A8BA3"
                onClick={handleAudioOnOff}
              />
            )}
          </div>

          <div
            style={{
              display: "flex",
              marginRight: "20px",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {videoOn ? (
              <OnCamera
                width="32px"
                fill="#8A8BA3"
                onClick={handleVideoOnOff}
              />
            ) : (
              <OffCamera
                width="32px"
                fill="#8A8BA3"
                onClick={handleVideoOnOff}
              />
            )}
          </div>

          <ChooseEmotion
            style={{ marginRight: "15px" }}
            width="32px"
            fill="#8A8BA3"
          />

          <button>
            <a href="/">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L20 20" stroke="#8A8BA3" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M20 4L4 20" stroke="#8A8BA3" stroke-width="2" stroke-miterlimit="10"/>
              </svg>
            </a>
          </button>
        </div>

        <div id="endButton">
          <button onClick={onClickSW}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.05 28H4V4H28.05V28ZM6 26H26.05V6H6V26Z" fill="#8A8BA3"/>
              <path d="M21.4999 18.04H14.9399V8H16.9399V16.04H21.4999V18.04Z" fill="#8A8BA3"/>
            </svg>
          </button>

          <button onClick={onClickPP}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.0001 12H11.1001V2.08002H21.0001V12ZM13.1001 10H19.0001V4.08002H13.1001V10Z" fill="#8A8BA3"/>
              <path d="M24.96 29.98H6.04004V14.02H24.96V16.02H8.04004V27.98H24.96V29.98Z" fill="#8A8BA3"/>
              <path d="M30.0001 24H21.3601V26H30.0001V24Z" fill="#8A8BA3"/>
              <path d="M30.0001 21H21.3601V23H30.0001V21Z" fill="#8A8BA3"/>
              <path d="M30.0001 17.99H21.3601V19.99H30.0001V17.99Z" fill="#8A8BA3"/>
            </svg>
          </button>

          <button onClick={onClickCT}>
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 20L20.4 17H0V0H28V20ZM2 15H20.78L26 17.05V2H2V15Z" fill="#8A8BA3"/>
            </svg>
          </button>
        </div>
      </div>
    </Container>
    </Back>
  );
};
const Back =styled.div`
height: 100%;
background-color: #F7F7F7;
`

const Container = styled.div`
  box-sizing: border-box;
  /* 보완할 점 1. 반응형으로 바꾸기 calc 공부하기 */
  width: 1110px;
  height: 100vh;
  background-color: #F7F7F7;
  margin: auto;
  display: grid;
  column-gap: 30px;
  grid-template-rows: 70px 1fr 75px;
  grid-template-columns: repeat(12, 1fr);
  #top {
    background-color: #F7F7F7;
    grid-row: 1/2;
    grid-column: 1 / 13;
  }
  .logo {
    grid-column: 1/13;
    margin: 0px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  #videoBox {
    background-color: #F7F7F7;
    grid-row: 2 / 3;
    grid-column: 1 / 13;
    box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(40%, 1fr));
    gap: 30px;
    justify-content: space-between;
    align-content: space-between;
  }
  .videoContainer {
    display: flex;
    align-items: center;
    background-color: #F7F7F7;
    border-radius: 5px;
  }
  #rightBox {
    visibility: hidden;
    width: 100%;
    height: 100%;
    background-color: #F7F7F7;
    grid-column: 10/13;
    box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
    animation: show 1s;
    animation-fill-mode: forwards;
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
    .designBox {
      background: #F7F7F7;
      animation: slide-in 1s;
      animation-fill-mode: forwards;
      margin: 5%;
      padding: 5%;
      border-radius: 13px;
      filter: drop-shadow(-6px -6px 8px #ffffff)
        drop-shadow(6px 6px 8px rgba(0, 0, 0, 0.15));
      .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  #bottom {
    background-color: #F7F7F7;
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
        background-color: #F7F7F7;
        margin: 2px 0px 0px 0px;
        border: none;
      }
    }
    #endButton {
      height: 60px;
      grid-column: 3/4;
      display: flex;
      justify-self: end;
      align-items: center;
      margin-right: 50px;
      padding: 10px;
      button {
        width: 32px;
        height: 32px;
        background-color: #F7F7F7;
        margin: 2px 0px 0px 15px;
        border: none;
      }
    }
  }
`;

const Button = styled.button`
  width: 16px;
  height: 16px;
  background-color: #F7F7F7;
  margin: 0px;
  border: none;
`;

export default Detail;