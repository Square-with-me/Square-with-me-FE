import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { history } from "../redux/configureStore";
import { BackUrl } from "../shared/config";

//redux
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as roomActions } from "../redux/modules/room";
//pages
import Timer from "../components/Detail/Timer";
import Parti from "../components/Detail/Parti";
import Logo from "../components/Main/Logo";
import RoomInfo from "../components/Detail/RoomInfo";
// 방 입장
import io from "socket.io-client";
import Peer from "simple-peer";
// icons
import { ReactComponent as OnMic } from "../assets/inRoom/onMicIcon.svg";
import { ReactComponent as OffMic } from "../assets/inRoom/offMicIcon.svg";
import { ReactComponent as OnCamera } from "../assets/inRoom/onCameraIcon.svg";
import { ReactComponent as OffCamera } from "../assets/inRoom/offCameraIcon.svg";
import { ReactComponent as ChooseEmotion } from "../assets/inRoomEmotion/chooseEmotion.svg";
// emotion icons
import { ReactComponent as HappyEmoji } from "../assets/emoji/happy.svg";
import { ReactComponent as LoveEmoji } from "../assets/emoji/love.svg";
import { ReactComponent as BadEmoji } from "../assets/emoji/bad.svg";
import { ReactComponent as SadEmoji } from "../assets/emoji/sad.svg";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    function onStream(stream) {
      ref.current.srcObject = stream;
    }
    props.peer.on("stream", onStream);
    return () => {
      props.peer.off("stream", onStream);
    };
  }, [props.peer]);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const Message = (props) => {
  const {
    data: {
      chattingList: { sender, message, time = '오후 6:04' },
    },
  } = props;

  return (
    <MessageBox>
      <div id="userInfo">
        <p id="userName">{sender}님이</p>
        <p id="toText">모두에게</p>
        <p>{time}</p>
      </div>
      <p id="message">{message}</p>
    </MessageBox>
  );
};
// 내가 보냈을 때
const MyMessage = (props) => {
  const {
    data: {
      chattingList: { sender, message, time = '오후 6:04' },
    },
  } = props;

  return (
    <MyMessageBox>
      <div id="userInfo">
        <p id="userName">{sender}님이</p>
        <p id="toText">모두에게</p>
        <p>{time}</p>
      </div>
      <p id="message">{message}</p>
    </MyMessageBox>
  );
};

const Detail = (props) => {
  const user = useSelector((store) => store.user.user);
  const room = useSelector((store) => store.room.myRoom);

  const dispatch = useDispatch();
  // const [mic, setMic] = useState("ok");
  // const [camera, setCamera] = useState("ok");
  const [sideCount, setCount] = useState(0); // 오른쪽 박스에 몇개가 열려 있는지

  const [isSW, setIsSW] = useState(false); // 스톱워치 박스
  const [isPP, setIsPP] = useState(false); // 참가자 목록 박스
  const [isCT, setIsCT] = useState(false); // 채팅 박스

  const [isTimer, setIsTimer] = useState(false); // 스톱워치
  const [isUserList, setIsUserList] = useState(false); // 참가자 목록
  const [ischatting, setIsChatting] = useState(false); // 채팅

  const [isEmoji, setIsEmoji] = useState(false);

  // 화상 채팅
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  const [stream, setStream] = useState(null);

  let params = useParams();

  // 사이드바 컨트롤
  useEffect(() => {
    const videoBox = document.getElementById("videoBox");

    if (videoBox !== null && sideCount === 0) {
      videoBox.style.gridColumn = "1/13";
    } else if (videoBox !== null && sideCount > 0) {
      videoBox.style.gridColumn = "1/10";
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
  };

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
  };

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
  };

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

  useEffect(() => {
    const myRoomInLS = JSON.parse(localStorage.getItem("myRoom"));
    if (!room && myRoomInLS) {
      dispatch(roomActions.setMyRoom(myRoomInLS));
    }
  }, []);

  /** @memo stream 받는 effect */
  useEffect(() => {
    if (!room || !user) {
      return;
    }
    // socketRef.current = io.connect('http://175.112.86.142:8088/');
    socketRef.current = io.connect(`${BackUrl}`);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStream(stream);
        userVideo.current.srcObject = stream;

        const roomId = params.id;
        const nickname = user.nickname;

        const today = new Date();
        const date = today.getDate();

        const data = {
          roomId,
          nickname,
          userId: user.id,
          categoryId: room.category.id,
          date,
          profileImg: user.profileImg,
          statusMsg: user.statusMsg,
        };

        socketRef.current.emit("join room", data, roomFull);
      });
  }, [params.id, room, user]);

  /** @memo join room 했을 때 데이터 제대로 전달 안 됐을 경우 */
  useEffect(() => {
    if (!socketRef.current) {
      return;
    }
    function noData() {
      alert("데이터 전달 오류");
      history.push("/main");
    }

    socketRef.current.on("no data", noData);

    return () => {
      socketRef.current.off("no data", noData);
    };
  }, []);

  /** @memo 새로 들어온 사람이 다른 유저 목록 받는 effect */
  useEffect(() => {
    if (stream == null) {
      return;
    }

    function onSendUsers(payload) {
      if (payload.otherUsers.length !== 0) {
        dispatch(userActions.userInfo(payload.otherUsers));
      }
      payload.otherSockets.map((user) => {
        const peer = createPeer(user.socketId, socketRef.current.id, stream);

        const peerObj = {
          peerId: user.socketId,
          peerNickname: user.nickname,
          peer,
        };

        peersRef.current.push(peerObj);
        setPeers((prevPeers) => [...prevPeers, peerObj]);
      });
    }
    socketRef.current.on("send users", onSendUsers);

    return () => {
      socketRef.current.off("send users", onSendUsers);
    };
  }, [stream]);

  /** @memo 피어 연결 위해 새로 들어온 유저 정보 받는 effect */
  useEffect(() => {
    if (stream == null) {
      return;
    }

    const onUserJoined = (payload) => {
      dispatch(userActions.userInfo([payload.userInfo]));
      const peer = addPeer(payload.signal, payload.callerId, stream);
      const newPeer = {
        peerId: payload.callerId,
        peerNickname: payload.callerNickname,
        peer,
      };

      peersRef.current.push(newPeer);

      setPeers((prevPeers) => [...prevPeers, newPeer]);
    };

    socketRef.current.on("user joined", onUserJoined);

    return () => {
      socketRef.current.off("user joined", onUserJoined);
    };
  }, [stream, peers]);

  /** @memo return signal effect */
  useEffect(() => {
    if (stream == null) {
      return;
    }

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
    if (stream == null) {
      return;
    }

    const onUserLeft = (payload) => {
      alert(payload.userInfo, "님이 나갔습니다."); // 참가자 나감 알림 용
      dispatch(userActions.deleteUserInfo(payload.userInfo.id));
      const peerObj = peersRef.current.find(
        (p) => p.peerId === payload.socketId
      );
      if (peerObj) {
        peerObj.peer.on("close", () => {
          peerObj.peer.destroy();
        });
      }
      const newPeers = peersRef.current.filter(
        (p) => p.peerId !== payload.socketId
      );
      peersRef.current = newPeers;

      setPeers((oldPeers) =>
        oldPeers.filter((p) => p.peerId !== payload.socketId)
      );
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

    peer.on("signal", (signal) => {
      socketRef.current.emit("send signal", {
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
    alert("정원이 다 찬 방입니다. 메인화면으로 이동합니다.");
    history.push("/main");
  };

  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  const handleVideoOnOff = () => {
    userVideo.current.srcObject
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (videoOn) {
      setVideoOn(false);
    } else {
      setVideoOn(true);
    }
  };
  const handleAudioOnOff = () => {
    userVideo.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (audioOn) {
      setAudioOn(false);
    } else {
      setAudioOn(true);
    }
  };

  //흐른 시간 체크
  const [openTime, setOpenTime] = useState(new Date().toString());
  const [diffTime, setDiffTime] = useState();

  const interval = useRef();

  function saveTime() {
    const closeTime = new Date();

    setDiffTime(Math.abs(closeTime - Date.parse(openTime)) / 60000);

    const prevTime = JSON.parse(localStorage.getItem("time"));
    const today = new Date().getDate();

    console.log('투데이 시간 : ',today)

    if (prevTime) {
      if (prevTime.date === today) {
        //기존 데이터에 새운 데이터 추가해서 저장
        prevTime[room.category.id] = diffTime;
        localStorage.setItem("time", JSON.stringify(prevTime));
        console.log("프리브타임 날짜 같을때", prevTime)
      } else {
        //기존 데이터 초기화 하고 새로 저장
        const data = {
          date: new Date().getDate(),
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
        };
        data[room.category.id] = diffTime; 
        localStorage.setItem("time", JSON.stringify(data));
        console.log("열두시 지났어?", data[room.category.id])
      }
    } else { // 시간데이터가 없을 때
      const data = {
        date: new Date().getDate(),
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      };
      data[room.category.id] = diffTime;
      localStorage.setItem("time", JSON.stringify(data));
      console.log('시간데이터 업따!!!')
    }

    setTimeout(() => {
      socketRef.current.emit("save_time", parseInt(diffTime) + 1);
    }, [1500]);
  }

  useEffect(() => {
    interval.current = setInterval(saveTime, 60000);


    return () => {
      clearInterval(interval.current);
    };
  }, [diffTime]);

  const [date, setDate] = useState(0);

  useEffect(() => {
    const today = new Date();
    const date = today.getDate();
    setDate(date);
  }, []);

  function handleEnd() {
    window.location.replace("/");
  }

  // 이모티콘 보내기
  const sendEmoji = (emojiId) => {
    const data = {
      roomId: params.id,
      id: socketRef.current.id,
      emoji: emojiId,
    };
    socketRef.current.emit("send_emoji", data);
    showEmoji(data);
  };

  // 아모티콘 보여주기
  const showEmoji = (data) => {
    const { id, emoji } = data;
    //소켓아이디가 감싸고있는 디브테그에 있음 그래서 같이 확인하게 위치 확인을 위해서
    const targetVideo = document.getElementById(id);
    if (emoji === "happy") {
      targetVideo.childNodes[1].classList.remove("hidden");
      setTimeout(() => targetVideo.childNodes[1].classList.add("hidden"), 3000);
    } else if (emoji === "love") {
      targetVideo.childNodes[2].classList.remove("hidden");
      setTimeout(() => targetVideo.childNodes[2].classList.add("hidden"), 3000);
    } else if (emoji === "bad") {
      targetVideo.childNodes[3].classList.remove("hidden");
      setTimeout(() => targetVideo.childNodes[3].classList.add("hidden"), 3000);
    } else if (emoji === "sad") {
      targetVideo.childNodes[4].classList.remove("hidden");
      setTimeout(() => targetVideo.childNodes[4].classList.add("hidden"), 3000);
    }
  };
  // 상대방 이모티콘 받기
  useEffect(() => {
    if (!socketRef.current) {
      return;
    }
    socketRef.current.on("receive_emoji", showEmoji);

    //이벤트를 해제를 해줘야 하는데 return안에서 해제를 해줘야 함
    return () => {
      socketRef.current.off("receive_emoji", showEmoji);
    };
  }, []);

  // 채팅
  const saveList = useSelector((store) => store.room.chattingList);

  //작성하는 채팅 내용
  const [userMessage, setUserMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    setMessageList(saveList);
  }, [saveList]);

  // 채팅 받기
  useEffect(() => {
    if(!socketRef.current){
      return
    }
    socketRef.current.on('receive_message', (data) => {
      dispatch(roomActions.savechat(data));
    });

    return socketRef.current.off('receive_message',(data) => {
      dispatch(roomActions.savechat(data));
    } )
  }, []);

  // 채팅 보내기
  const sendMessage = () => {
    const today = new Date();
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    var timeString = hours + ':' + minutes;

    if (userMessage === '' || userMessage === '\n') return;
    const data = {
      roomId: params.id,
      sender: user.nickname,
      message: userMessage,
      time: timeString,
      id: user.id,
    };
    dispatch(roomActions.savechat(data));

    socketRef.current.emit('send_message', data);
  };

  // 엔터키로 채팅 보내기
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
      setUserMessage('');
    }
  };

  // 채팅시 스크롤바 마지막으로 내리기
  useEffect(() => {
    moveScrollEnd();
  }, [messageList]);

  const moveScrollEnd = () => {
    if ( !document.getElementById('messageBox') ) {
      return
    }
    const scrollBox = document.getElementById('messageBox');
    scrollBox.scrollTop = scrollBox.scrollHeight;
  };


  return (
    <Back>
      {room && (
        <Container>
          {/* <Back/> */}
          <div id="top">
            <div className="logo">
              <Logo />
              <div>
                <RoomInfo room={room} />
              </div>
            </div>
          </div>
          <div id="videoBox">
            {socketRef.current ? (
              <div
                key="my-video"
                className="videoContainer"
                id={socketRef.current.id}
              >
                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                <div className="myEmoji myHappyEmoji hidden">
                  <HappyEmoji width="40px" height="40px" />
                </div>
                <div className="myEmoji myLoveEmoji hidden">
                  <LoveEmoji width="40px" height="40px" />
                </div>
                <div className="myEmoji myBadEmoji hidden">
                  <BadEmoji width="40px" height="40px" />
                </div>
                <div className="myEmoji mySadEmoji hidden">
                  <SadEmoji width="40px" height="40px" />
                </div>
                <div className="nameLable">{user.nickname}</div>
              </div>
            ) : (
              ""
            )}
            {peers.map((peer) => {
              return (
                <div
                  key={peer.peerId}
                  className="videoContainer"
                  id={peer.peerId}
                >
                  <Video peer={peer.peer} />
                  <div className="myEmoji myHappyEmoji hidden">
                    <HappyEmoji width="40px" height="40px" />
                  </div>
                  <div className="myEmoji myLoveEmoji hidden">
                    <LoveEmoji width="40px" height="40px" />
                  </div>
                  <div className="myEmoji myBadEmoji hidden">
                    <BadEmoji width="40px" height="40px" />
                  </div>
                  <div className="myEmoji mySadEmoji hidden">
                    <SadEmoji width="40px" height="40px" />
                  </div>
                  {/* <div className="nameLable">{peer.peerNickname}</div> */}
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
                      {isTimer === false ? (
                        <div onClick={() => openTimer(false)}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 2.06689L10.9333 8.00023L5 13.9336"
                              stroke="#8A8BA3"
                              strokeWidth="2"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div onClick={() => openTimer(true)}>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999"
                              stroke="#8A8BA3"
                              strokeWidth="2"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        </div>
                      )}
                    </Button>
                    <p>타이머</p>
                    <Button>
                      <div
                        onClick={() => setIsSW(false) < setCount(sideCount - 1)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.66675 2.6665L13.3334 13.3332"
                            stroke="#33344B"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                          <path
                            d="M13.3334 2.6665L2.66675 13.3332"
                            stroke="#33344B"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                    </Button>
                  </div>
                  {isTimer ? (
                    <Timer socketRef={socketRef} roomId={params.id} />
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            {isPP ? (
              <div className="designBox">
                <div className="flex">
                  <Button>
                    {isUserList === false ? (
                      <div onClick={() => openUserList(false)}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 2.06689L10.9333 8.00023L5 13.9336"
                            stroke="#8A8BA3"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div onClick={() => openUserList(true)}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999"
                            stroke="#8A8BA3"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                    )}
                  </Button>
                  <p>참가자</p>
                  <Button>
                    <div
                      onClick={() => setIsPP(false) < setCount(sideCount - 1)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.66675 2.6665L13.3334 13.3332"
                          stroke="#33344B"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M13.3334 2.6665L2.66675 13.3332"
                          stroke="#33344B"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    </div>
                  </Button>
                </div>
                {isUserList ? <Parti me={user} /> : null}
              </div>
            ) : (
              ""
            )}
            {isCT ? (
              <>
                <div className="designBox">
                  <div className="flex">
                    <Button>
                      {ischatting === false ? (
                        <div onClick={() => openChatting(false)}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 2.06689L10.9333 8.00023L5 13.9336"
                              stroke="#8A8BA3"
                              strokeWidth="2"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div onClick={() => openChatting(true)}>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999"
                              stroke="#8A8BA3"
                              strokeWidth="2"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        </div>
                      )}
                    </Button>
                    <p>채팅</p>
                    <Button>
                      <div
                        onClick={() => setIsCT(false) < setCount(sideCount - 1)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.66675 2.6665L13.3334 13.3332"
                            stroke="#33344B"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                          <path
                            d="M13.3334 2.6665L2.66675 13.3332"
                            stroke="#33344B"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                    </Button>
                  </div>
                  {ischatting ? (
                    <ChattingBox>
                        <div id="messageBox">
                          {messageList.map((data, index) =>
                            data.chattingList.id === user.id ? (
                              <MyMessage key={index} data={data}></MyMessage>
                            ) : (
                              <Message key={index} data={data}></Message>
                            )
                          )}
                        </div>
                        <div className="inputBox">
                          <form action="#" className="flex">
                            <label htmlFor="choiceReceiver">TO.</label>
                            <div name="receiver" id="lang">모두
                              <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.9001 6.54999L12.0001 15.45L3.1001 6.54999"
                                stroke="#8A8BA3"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                              />
                            </svg>
                          </div>
                          </form>
                          <div style={{position:"relative"}}>
                          <textarea
                            type="text"
                            onChange={(e) => {
                              setUserMessage(e.target.value);
                            }}
                            value={userMessage}
                            onKeyPress={onKeyPress}
                            placeholder="메시지를 입력하세요"
                          />
                          <svg className="icon" width="12" height="16" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute", right:"7%", top:"20%", cursor:"pointer"}}>
                          <path d="M0.880005 19.21V0.790039L12 10L0.880005 19.21ZM2.88 5.00004V15L8.88 10L2.88 5.00004Z" fill="#8A8BA3"/>
                          </svg>
                          </div>
                        </div>
                      </ChattingBox>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          <div id="bottom">
            <div id="centerButton" style={{ position: "relative" }}>
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

              <div>
                <ChooseEmotion
                  style={{ marginRight: "15px" }}
                  width="32px"
                  fill="#8A8BA3"
                  onClick={() => setIsEmoji(!isEmoji)}
                />
                {isEmoji ? (
                  <div className="emojiBox">
                    <HappyEmoji
                      onClick={(e) => {
                        sendEmoji(e.target.id);
                      }}
                    />
                    <LoveEmoji
                      onClick={(e) => {
                        sendEmoji(e.target.id);
                      }}
                    />
                    <BadEmoji
                      onClick={(e) => {
                        sendEmoji(e.target.id);
                      }}
                    />
                    <SadEmoji
                      onClick={(e) => {
                        sendEmoji(e.target.id);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button>
                <a href="/main">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4L20 20"
                      stroke="#8A8BA3"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M20 4L4 20"
                      stroke="#8A8BA3"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </a>
              </button>
            </div>

            <div id="endButton">
              <button onClick={onClickSW}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.05 28H4V4H28.05V28ZM6 26H26.05V6H6V26Z"
                    fill="#8A8BA3"
                  />
                  <path
                    d="M21.4999 18.04H14.9399V8H16.9399V16.04H21.4999V18.04Z"
                    fill="#8A8BA3"
                  />
                </svg>
              </button>

              <button onClick={onClickPP}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.0001 12H11.1001V2.08002H21.0001V12ZM13.1001 10H19.0001V4.08002H13.1001V10Z"
                    fill="#8A8BA3"
                  />
                  <path
                    d="M24.96 29.98H6.04004V14.02H24.96V16.02H8.04004V27.98H24.96V29.98Z"
                    fill="#8A8BA3"
                  />
                  <path d="M30.0001 24H21.3601V26H30.0001V24Z" fill="#8A8BA3" />
                  <path d="M30.0001 21H21.3601V23H30.0001V21Z" fill="#8A8BA3" />
                  <path
                    d="M30.0001 17.99H21.3601V19.99H30.0001V17.99Z"
                    fill="#8A8BA3"
                  />
                </svg>
              </button>

              <button onClick={onClickCT}>
                <svg
                  width="28"
                  height="20"
                  viewBox="0 0 28 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 20L20.4 17H0V0H28V20ZM2 15H20.78L26 17.05V2H2V15Z"
                    fill="#8A8BA3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      )}
    </Back>
  );
};
const Back = styled.div`
  height: 100%;
  background-color: #f7f7f7;
  @media screen and (max-width: 820px) and (orientation: portrait) {
    height: fit-content;
  }
  @media screen and (min-width: 320px) and (max-width: 550px) {
    height: fit-content;
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 1110px;
  height: 100vh;
  background-color: #f7f7f7;
  margin: auto;
  display: grid;
  column-gap: 30px;
  grid-template-rows: 70px 1fr 70px;
  grid-template-columns: repeat(12, 1fr);
  #top {
    background-color: #f7f7f7;
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

  // 세로가 더 긴 기기가 세로로 있을 때 가로로 화면 나오게 하는 부분
  @media screen and (min-width: 600px) and (max-width: 767px) and (orientation: portrait) {
    -ms-transform: rotate(-90deg); // IE 9 이상
    -webkit-transform: rotate(-90deg); // 사파리, 크롬, 오페라 브라우저
    transform: rotate(-90deg);
    transform-origin: left top;
    margin: auto;
    display: grid;
    column-gap: 30px;
    grid-template-rows: 70px 1fr 70px;
    grid-template-columns: repeat(12, 1fr);
    box-sizing: border-box;
    background-color: #f7f7f7;
    width: 100vh;
    height: 100vw;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
  }

  @media screen and (min-width: 525px) and (max-width: 600px) and (orientation: portrait) {
    -ms-transform: rotate(-90deg); // IE 9 이상
    -webkit-transform: rotate(-90deg); // 사파리, 크롬, 오페라 브라우저
    transform: rotate(-90deg);
    transform-origin: left top;
    margin: auto;
    display: grid;
    column-gap: 30px;
    grid-template-rows: 50px 1fr 60px;
    grid-template-columns: repeat(12, 1fr);
    box-sizing: border-box;
    background-color: #f7f7f7;
    width: 100vh;
    height: 100vw;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
    .logo {
      height: 28px;
    }
    #bottom {
      height: 45px;
    }
    #endButton {
      height: 45px;
    }
  }

  @media screen and (min-width: 485px) and (max-width: 525px) and (orientation: portrait) {
    -ms-transform: rotate(-90deg); // IE 9 이상
    -webkit-transform: rotate(-90deg); // 사파리, 크롬, 오페라 브라우저
    transform: rotate(-90deg);
    transform-origin: left top;
    margin: auto;
    display: grid;
    column-gap: 30px;
    grid-template-rows: 45px 1fr 60px;
    grid-template-columns: repeat(12, 1fr);
    box-sizing: border-box;
    background-color: #f7f7f7;
    width: 100vh;
    height: 100vw;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
    .logo {
      height: 10px;
      margin-top: 15px;
    }
    #bottom {
      height: 28px;
    }
    #endButton {
      height: 28px;
    }
  }

  @media screen and (max-width: 485px) and (orientation: portrait) {
    -ms-transform: rotate(-90deg); // IE 9 이상
    -webkit-transform: rotate(-90deg); // 사파리, 크롬, 오페라 브라우저
    transform: rotate(-90deg);
    transform-origin: left top;
    margin: auto;
    display: grid;
    column-gap: 20px;
    grid-template-rows: 43px 1fr 60px;
    grid-template-columns: repeat(12, 1fr);
    box-sizing: border-box;
    background-color: #f7f7f7;
    width: 100vh;
    height: 100vw;
    overflow-x: hidden;
    position: absolute;
    top: 100%;
    left: 0;
    .logo {
      height: 10px;
      margin-top: 13px;
    }
    #bottom {
      height: 15px;
    }
    #endButton {
      height: 15px;
    }
  }

  #videoBox {
    height: 81vh;
    background-color: #f7f7f7;
    grid-row: 2 / 3;
    grid-column: 1 / 13;
    box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(40%, 1fr));
    gap: 30px;
    justify-content: space-between;
    align-content: space-between;

    // 세로가 더 긴 기기가 세로로 있을 때 스크롤 생기지 않도록 화면 크기 조절
    @media screen and (min-width: 755px) and (max-width: 767px) and (orientation: portrait) {
      height: 74vh;
    }
    @media screen and (min-width: 715px) and (max-width: 755px) and (orientation: portrait) {
      height: 70vh;
    }
    @media screen and (min-width: 675px) and (max-width: 715px) and (orientation: portrait) {
      height: 65vh;
    }
    @media screen and (min-width: 635px) and (max-width: 675px) and (orientation: portrait) {
      height: 60vh;
    }
    @media screen and (min-width: 595px) and (max-width: 635px) and (orientation: portrait) {
      height: 55vh;
    }
    @media screen and (min-width: 565px) and (max-width: 595px) and (orientation: portrait) {
      height: 53vh;
    }
    @media screen and (min-width: 525px) and (max-width: 565px) and (orientation: portrait) {
      height: 49vh;
    }
    @media screen and (min-width: 485px) and (max-width: 525px) and (orientation: portrait) {
      height: 46vh;
    }
    @media screen and (min-width: 440px) and (max-width: 485px) and (orientation: portrait) {
      height: 40vh;
    }
    @media screen and (min-width: 400px) and (max-width: 440px) and (orientation: portrait) {
      height: 33vh;
    }
    @media screen and (max-width: 400px) and (orientation: portrait) {
      height: 30vh;
    }
  }
  .videoContainer {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
    border-radius: 5px;
    position: relative;
    .nameLable {
      position: absolute;
      width: 160px;
      height: 30px;
      background-color: #e3e5ff;
      border-radius: 4px;
      left: 0;
      bottom: 0;
      margin: 5px;
      text-align: center;
      font-size: 15px;
      font-weight: 700;
      line-height: 30px;
      color: #33344b;
    }
    .myEmoji {
      background-color: #f7f7f7;
      border-radius: 5px;
      z-index: 999;
      position: absolute;
      display: flex;
      align-items: center;
      box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.25);
      bottom: 50px;
      left: 5px;
    }
    .hidden {
      display: none;
    }
  }
  #rightBox {
    visibility: hidden;
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
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
      background: #f7f7f7;
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
  .emojiBox {
    width: 200px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #f7f7f7;
    box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.25);
    position: absolute;
    bottom: 65px;
    left: 10px;
    .emoji {
      width: 100px;
      display: flex;
      justify-content: center;
    }
  }
  #bottom {
    position: relative;
    background-color: #f7f7f7;
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
        background-color: #f7f7f7;
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
        background-color: #f7f7f7;
        margin: 2px 0px 0px 15px;
        border: none;
      }
    }
  }
`;
const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Button = styled.button`
  width: 16px;
  height: 16px;
  background-color: #f7f7f7;
  margin: 0px;
  border: none;
`;

//채팅 css
const ChattingBox = styled.div`
  width: 100%;
  // 높이
  height: 57vh;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Noto Sans';
  margin-top: 20px;

  #messageBox {
    width: 100%;
    height: 100%;
    background-color: transparent;
    overflow-y: scroll;
  }
  .inputBox {
    margin: 5%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    label {
      font-weight: 700;
      }
    #lang {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      border: 1px solid #8A8BA3;
      border-radius: 4px;
      background-color: #fff;
      width: 75%;
      height: 30px;
      padding: 3px;
      margin-right: 4px;
      &:hover {
        box-shadow: 0 1px 5px #8A8BA3;
      }
    }
    textarea {
      font-size: 1rem;
      width: 98%;
      height: 69px;
      padding: 10px;
      border-radius: 4px;
    }
  }

  // 가로모드 일 때 채팅창 높이 조절
  @media screen and (min-height: 700px) and (max-height: 755px) and (orientation: landscape) {
    height: 55vh;
    textarea {
        font-size: 0.5rem;
      }
  }
  @media screen and (min-height: 640px) and (max-height: 700px) and (orientation: landscape) {
    height: 48vh;
    .inputBox {
      #lang {
        height: 27px;
      }
      textarea {
        height: 58px;
        font-size: 0.5rem;
      }
    }
  }
  @media screen and (min-height: 600px) and (max-height: 640px) and (orientation: landscape) {
    height: 44vh;
    .inputBox {
      #lang {
        height: 26px;
      }
      textarea {
        height: 55px;
      }
    }
  }
  @media screen and (min-height: 565px) and (max-height: 600px) and (orientation: landscape) {
    height: 45vh;
    .inputBox {
      #lang {
        height: 26px;
      }
      textarea {
        height: 54px;
      }
    }
  }
  @media screen and (max-height: 565px) and (orientation: landscape) {
    height: 40vh;
    .inputBox {
      #lang {
        height: 25px;
      }
      textarea {
        height: 46px;
      }
    }
  }

  // 세로가 더 긴 기기가 세로로 있을 때 채팅창 열리면 화면 길이 늘어나는 부분 조절
  @media screen and (min-width: 755px) and (max-width: 767px) and (orientation: portrait) {
    height: 55vh;
  }
  @media screen and (min-width: 715px) and (max-width: 755px) and (orientation: portrait) {
    height: 50vh;
  }
  @media screen and (min-width: 675px) and (max-width: 715px) and (orientation: portrait) {
    height: 45vh;
  }
  @media screen and (min-width: 635px) and (max-width: 675px) and (orientation: portrait) {
    height: 40vh;
    .inputBox {
      #lang {
        height: 28px;
      }
      textarea {
        height: 58px;
      }
    }
  }
  @media screen and (min-width: 595px) and (max-width: 635px) and (orientation: portrait) {
    height: 36vh;
    .inputBox {
      #lang {
        height: 27px;
      }
      textarea {
        height: 57px;
      }
    }
  }
  @media screen and (min-width: 565px) and (max-width: 595px) and (orientation: portrait) {
    height: 35vh;
    .inputBox {
      #lang {
        height: 27px;
      }
      textarea {
        height: 57px;
      }
    }
  }
  @media screen and (min-width: 525px) and (max-width: 565px) and (orientation: portrait) {
    height: 31vh;
    .inputBox {
      #lang {
        height: 25px;
      }
      textarea {
        height: 55px;
      }
    }
  }
  @media screen and (min-width: 485px) and (max-width: 525px) and (orientation: portrait) {
    height: 27vh;
    .inputBox {
      #lang {
        height: 24px;
      }
      textarea {
        height: 52px;
      }
    }
  }
  @media screen and (min-width: 440px) and (max-width: 485px) and (orientation: portrait) {
    height: 21vh;
    font-size: 0.5rem;
    .inputBox {
      #lang {
        height: 22px;
      }
      textarea {
        height: 45px;
        font-size: 0.2rem;
      }
    }
  }
  @media screen and (min-width: 400px) and (max-width: 440px) and (orientation: portrait) {
    height: 14vh;
    .inputBox {
      #lang {
        height: 22px;
      }
      textarea {
        height: 45px;
        font-size: 0.2rem;
      }
    }
  }
  @media screen and (max-width: 400px) and (orientation: portrait) {
    height: 13vh;
    .inputBox {
      #lang {
        height: 20px;
      }
      textarea {
        height: 43px;
        font-size: 0.3rem;
      }
    }
  }
`;

const MessageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 58px;
  justify-content: center;
  padding: 2.5% 5% 2.5%;
  font-family: 'Noto Sans';

  #userInfo {
    display: flex;
    justify-content: space-between;
    margin: 0 0 2.5%;

    font-size: 12px;
    line-height: 12px;
    font-weight: 400;
    color: #8a8ba3;
    font-style: normal;

    #userName {
      text-align: center;
    }
    #toText {
      font-family: 'Noto Sans';
      font-style: normal;
    }
  }

  #message {
    padding: 1%;
    word-break: break-all;
  }

  p#message {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    color: #000;
  }
`;

const MyMessageBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 58px;
  justify-content: center;
  padding: 2.5% 5% 2.5%;
  font-family: 'Noto Sans';
  background-color: #e3e5ff;

  #userInfo {
    display: flex;
    justify-content: space-between;
    margin: 0 0 2.5%;

    font-size: 12px;
    line-height: 12px;
    font-weight: 400;
    color: #8a8ba3;
    font-style: normal;

    #userName {
      text-align: center;
    }
    #toText {
      font-family: 'Noto Sans';
      font-style: normal;
    }
  }

  #message {
    padding: 1%;
    word-break: break-all;
  }

  p#message {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    color: #000;
  }
`;
export default Detail;
