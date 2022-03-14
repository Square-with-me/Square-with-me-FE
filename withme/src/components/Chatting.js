import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userEditActions } from '../redux/modules/userEdit';

const Message = (props) => {
  const {
    data: { sender, message, time = '오후 6:04' },
  } = props;

  return (
    <MessageBox>
      <div id="userInfo">
        <p id="userName">{sender}</p>
        <p id="toText">모두에게</p>
        <p>{time}</p>
      </div>
      <p id="message">{message}</p>
    </MessageBox>
  );
};

const Chatting = ({ socket, roomId }) => {
  const dispatch = useDispatch();

  const [userMessage, setUserMessage] = useState('');
  const [nickname, setnickName] = useState('네모네모');
  const [messageList, setMassageList] = useState([]);
  const userNickname = useSelector((store) => store.user.user.nickname);

  useEffect(() => {
    dispatch(userEditActions.logInCheckDB());
  }, []);

  useEffect(() => {
    setnickName(userNickname);
  }, [userNickname]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMassageList((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (userMessage === '') return;
    const data = {
      roomId: roomId,
      sender: nickname,
      message: userMessage,
    };
    setMassageList((list) => [...list, data]);
    await socket.emit('send_message', data);
  };

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
    const scrollBox = document.getElementById('messageBox');
    scrollBox.scrollTop = scrollBox.scrollHeight;
  };

  return (
    <ChattingBox>
      <div id="messageBox">
        {messageList.map((data, index) => {
          return <Message key={index} data={data}></Message>;
        })}
      </div>
      <div className="inputBox">
        <form action="#" className="flex">
          <label for="choiceReceiver">TO.</label>
          <select name="receiver" id="lang">
            <option value="all">모두에게</option>
          </select>
        </form>
        <textarea
          type="text"
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          value={userMessage}
          onKeyPress={onKeyPress}
          placeholder="메시지를 입력하세요"
        />
      </div>
    </ChattingBox>
  );
};

const ChattingBox = styled.div`
  width: 100%;
  // 높이
  height: 50vh;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Noto Sans';

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

    select {
      width: 80%;
      height: 30px;
    }
    textarea {
      width: 100%;
      height: 62px;
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

export default Chatting;
