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


  const user = useSelector((store) => store.user.user);
  console.log(user)
  

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
      userId,
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

const userId = useSelector((store) => store.user.user.id);
const room = useSelector((store) => store.room.myRoom);

function handleEnd() {
  window.location.replace('/')
};

// useEffect(() => {
//   console.log('peers table')
//   console.table(peers);
// }, [peers]);

  return (
    <Container>
      {/* <Back/> */}
      <div id="top">
      <div className="logo">
        <div style={{display:"flex",alignItems:"center"}}>
        <svg
            width="130"
            height="42"
            viewBox="0 0 130 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M129.182 0.798613L0.267578 0.12207L-0.000104766 40.7085L128.914 41.385L129.182 0.798613Z"
              fill="#7179F0"
            />
          </svg>
          <svg
            width="133"
            height="30"
            viewBox="0 0 133 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: '35px'}}
          >
            <path
              d="M22.5925 3.28134L20.4541 28.2734C18.9289 28.5274 16.4665 28.5777 14.798 28.4393C14.798 28.4393 14.798 28.4393 14.7985 28.3775C13.6626 24.8741 12.3194 20.2701 11.5484 16.3148C9.24701 23.7538 8.63081 28.0256 8.41301 28.3476C6.8878 28.6016 4.42689 28.4595 2.54344 28.2583L0.336043 3.11535C0.336043 3.11535 3.89418 2.61654 6.13729 3.08062C6.13729 3.08062 7.38311 11.5052 7.35637 15.1338C8.25626 10.9939 8.93026 8.27554 9.00188 7.95287C10.8199 7.63837 12.7754 7.45508 14.8714 8.04218C15.1504 9.85782 15.2092 11.2807 15.8368 14.8505C16.1564 11.1614 16.9344 3.7153 16.9388 3.13117C18.7563 2.87852 20.9258 2.88869 22.5237 3.21917C22.5237 3.2123 22.593 3.21262 22.5925 3.28134Z"
              fill="#7179F0"
            />
            <path
              d="M31.0865 3.20472C31.0079 4.49591 30.7162 13.8859 30.7048 15.4384C30.6238 17.0594 30.4731 27.0958 30.4636 28.3873C30.4632 28.4491 30.3936 28.5175 30.3168 28.5172C28.6487 28.8322 26.7684 28.7616 24.6746 28.4907C24.6055 28.4904 24.5292 28.4282 24.5302 28.2977C24.6079 27.1301 24.8066 19.945 24.8199 18.1314C24.8333 16.3178 25.2112 4.59927 25.2217 3.17722C25.2226 3.0467 25.2922 2.98519 25.369 2.98555C27.1816 2.86352 29.0627 2.81051 30.8648 3.07314C31.0107 3.07383 31.087 3.13602 31.0865 3.20472Z"
              fill="#7179F0"
            />
            <path
              d="M49.1595 3.29412C49.2956 4.65531 49.2063 6.33842 48.9103 7.88999C48.9098 7.95183 48.7632 8.01986 48.694 8.01954C48.1172 8.01684 46.2334 7.94618 44.4184 7.93769C44.3268 10.9813 44.2231 14.609 44.2164 15.516C44.1353 17.1373 43.9835 27.2995 43.9749 28.4676C43.9744 28.5295 43.9047 28.5979 43.8278 28.5975C42.1584 28.6516 40.1276 28.7108 38.0982 28.5707C38.029 28.5704 38.0294 28.5085 38.03 28.4398C38.1073 27.3407 38.3073 20.0235 38.3207 18.2095C38.3293 17.0414 38.4362 11.9295 38.5422 7.97888C36.658 7.97007 34.3354 7.95919 33.6894 7.95617C33.5433 7.95549 33.4745 7.89332 33.4755 7.76277C33.0457 6.5926 33.2114 3.94097 33.4401 3.16557C33.4406 3.10372 33.5872 3.03569 33.7333 3.03638C34.8946 3.04181 41.5629 3.01118 41.5629 3.01118C41.5629 3.01118 47.292 3.09984 49.0296 3.17669C49.0835 3.1632 49.16 3.22541 49.1595 3.29412Z"
              fill="#7179F0"
            />
            <path
              d="M68.1015 3.39289C68.092 4.68471 67.8075 14.0769 67.796 15.6298C67.7148 17.2511 67.5639 27.2898 67.5544 28.5816C67.554 28.6435 67.4842 28.7119 67.4073 28.7115C65.736 29.0267 63.8521 28.956 61.7544 28.6851C61.6852 28.6847 61.6087 28.6225 61.6097 28.492C61.6875 27.3242 61.8857 20.2679 61.8995 18.3921C60.9612 18.3877 59.8695 18.3207 59.2153 18.3795C58.9231 18.3781 58.1309 18.3744 57.2622 18.3085C57.236 21.8679 57.1248 27.5708 57.1176 28.5397C57.1172 28.6015 57.0474 28.6699 56.9705 28.6695C55.2992 28.9847 53.4154 28.914 51.3176 28.6431C51.2484 28.6427 51.172 28.5805 51.1729 28.45C51.2507 27.2822 51.4498 20.0954 51.4632 18.2814C51.4766 16.4673 51.8552 4.74614 51.8657 3.32377C51.8667 3.19321 51.9363 3.13169 52.0132 3.13205C53.8293 3.00999 55.7141 2.95699 57.5196 3.21969C57.6657 3.22037 57.7345 3.28252 57.734 3.35123C57.6576 4.31977 57.5396 9.8921 57.4456 13.2587C58.53 13.2638 59.5453 13.2686 59.5453 13.2686C59.5453 13.2686 60.7071 13.2122 62.0145 13.2183C62.1133 9.20573 62.2958 4.27963 62.3024 3.37261C62.3034 3.24205 62.3731 3.18054 62.45 3.1809C64.266 3.05884 66.1508 3.00583 67.9563 3.26853C68.1025 3.26234 68.1713 3.3245 68.1015 3.39289Z"
              fill="#7179F0"
            />
            <path
              d="M103.651 4.03075C103.706 5.84529 103.723 14.0715 103.707 16.2706C103.622 18.3456 103.418 26.2478 103.325 28.3159C103.323 28.577 103.176 28.7069 102.961 28.7678C101.513 28.9534 99.6973 28.9449 98.0986 28.745C97.8832 28.744 97.7384 28.5509 97.7399 28.3516C97.7523 26.668 97.8736 19.6107 97.9739 16.4362C97.0845 19.1534 96.4808 21.7415 96.1827 23.5543C96.1813 23.7468 96.0342 23.8767 95.8183 23.9444C93.9302 24.3891 92.2622 24.1889 90.6712 23.9821C90.4563 23.9193 90.2341 23.7877 90.2356 23.5884C90.0269 22.6802 89.4623 19.9562 88.4754 16.0687C88.3824 19.3051 88.3269 26.8232 88.315 28.4381C88.3136 28.6305 88.1665 28.7604 87.9506 28.8281C86.1336 29.012 83.6733 28.8081 82.8049 28.6735C82.6588 28.6728 82.5136 28.5415 82.515 28.3491C82.5952 26.8582 82.8699 19.8635 82.8833 18.0492C82.8961 16.3037 83.5504 5.81282 83.7119 3.73814C83.7129 3.60758 83.7831 3.47733 83.9292 3.47801C85.6688 3.35558 87.7776 3.23487 89.223 3.37221C89.4379 3.43506 89.66 3.56668 89.7278 3.76629C90.1582 4.86788 91.7201 9.01917 93.6259 15.5705C95.0316 11.6874 96.5911 6.77411 97.8444 3.73555C97.915 3.54345 98.0617 3.47542 98.2853 3.41461C99.8089 3.35989 101.84 3.36939 103.284 3.63043C103.515 3.63838 103.652 3.83146 103.651 4.03075Z"
              fill="#7179F0"
            />
            <path
              d="M121.689 18.2422C121.687 18.4346 121.47 18.6329 121.178 18.6934C119.723 18.8171 115.083 19.1802 111.533 18.7101C111.806 21.3019 112.44 24.026 114.178 24.0342C116.355 23.9825 116.735 21.4556 116.81 20.6107C116.88 20.4805 117.028 20.3506 117.174 20.3513C118.188 20.4179 118.986 20.6827 119.561 21.0084C121.507 22.0551 121.928 24.3865 120.685 26.0024C118.123 29.2956 114.211 28.9544 114.211 28.9544C104.206 28.7151 105.904 15.3785 105.904 15.3785C106.355 3.26605 114.544 3.5655 114.544 3.5655C114.544 3.5655 123.912 2.51676 121.689 18.2422ZM114.514 8.69156C112.775 8.81398 111.953 11.7237 111.644 14.0517C114.327 14.2566 116.643 14.0751 116.643 14.0751C116.815 11.6777 116.614 8.57083 114.514 8.69156Z"
              fill="#7179F0"
            />
            <path
              d="M126.662 26.1747C126.894 23.9087 132.033 23.1566 132.152 26.8462C132.152 26.8462 132.136 28.9209 129.097 28.9685C129.097 28.9753 126.421 28.7017 126.662 26.1747ZM127.2 2.09142C127.203 1.69985 127.497 1.31654 127.782 1.18734C128.437 0.867529 129.305 0.741069 130.103 0.744812C130.97 0.810705 131.834 1.1445 132.339 1.33922C132.553 1.47075 132.774 1.73285 132.772 1.98702C133.183 5.54755 132.207 19.2759 132.049 22.0574C132.046 22.3803 131.83 22.6404 131.537 22.7695C130.813 23.089 130.161 23.1547 129.508 23.1516C128.711 23.086 128.06 22.8837 127.631 22.8199C127.34 22.688 127.127 22.4259 127.13 22.1031C127.176 14.78 127.251 4.55108 127.2 2.09142Z"
              fill="#7179F0"
            />
          </svg>
        </div>
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
                      <path d="M5 2.06689L10.9333 8.00023L5 13.9336" stroke="#8A8BA3" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                  </div>
                ) : (
                  <div onClick={() => openTimer(true)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999" stroke="#8A8BA3" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                  </div>
                )}
              </Button>
                <p>타이머</p>
                <Button>
                  <div onClick={() => setIsSW(false) < setCount(sideCount - 1)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.66675 2.6665L13.3334 13.3332" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
                      <path d="M13.3334 2.6665L2.66675 13.3332" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
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
                      <path d="M5 2.06689L10.9333 8.00023L5 13.9336" stroke="#8A8BA3" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                  </div>
                ) : (
                  <div onClick={() => openUserList(true)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999" stroke="#8A8BA3" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                  </div>
                )}
              </Button>
              <p>참가자</p>
              <Button>
              <div onClick={() => setIsPP(false) < setCount(sideCount - 1)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.66675 2.6665L13.3334 13.3332" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
                  <path d="M13.3334 2.6665L2.66675 13.3332" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
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
                        <path d="M5 2.06689L10.9333 8.00023L5 13.9336" stroke="#8A8BA3" stroke-width="2" stroke-miterlimit="10"/>
                      </svg>
                    </div>
                  ) : (
                    <div onClick={() => openChatting(true)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999" stroke="#8A8BA3" stroke-width="2" stroke-miterlimit="10"/>
                      </svg>
                    </div>
                  )}
                </Button>
                <p>채팅</p>
                <Button>
                <div onClick={() => setIsCT(false) < setCount(sideCount - 1)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.66675 2.6665L13.3334 13.3332" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
                    <path d="M13.3334 2.6665L2.66675 13.3332" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
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
  );
};
// const Back = styled.div`
// width: 100%;
// height: 100%;
// z-index: -100;
// background-color: #F7F7F7;
// `

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
    position: relative;
    overflow: hidden;
    // max-width: 100%;
    object-fit: cover;
  }
  .videoContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F7F7F7;
    border-radius: 5px;
    // position: relative;
    // overflow: hidden;
    // max-width: 100%;
    // object-fit: cover;
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