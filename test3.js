import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Timer = ({ socket, roomId }) => {
  console.log(socket);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const hoursInput = React.useRef();
  const minutesInput = React.useRef();
  const secondsInput = React.useRef();

  const [testText, setTestText] = useState(['타이머']);

  const [timer, setTimer] = useState(null);

  const convertToSeconds = (hours, minutes, seconds) => {
    console.log('초로 바꾸기', hours, minutes, seconds);
    return seconds + minutes * 60 + hours * 60 * 60;
  };

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        countDown();
      }, 1000)
    );

    // console.log(this.props.roomId);
    console.log('스타트 버튼 누름');
    setTestText((list) => [...list, '누름']);

    const data = {
      roomId,
      hours,
      minutes,
      seconds,
    };

    socket.emit('start_timer', data);
  };

  useEffect(() => {
    socket.on('start_receive', (data) => {
      console.log('타이머 시작!!!!!!!!!!');
      setTestText((list) => [...list, '받음']);
    });
  }, [socket]);

  const countDown = () => {
    console.log('Start countDown');
    let c_seconds = convertToSeconds(hours, minutes, seconds);

    console.log('초로 바꾼 시간: ', c_seconds);

    if (c_seconds) {
      // seconds change
      seconds
        ? setSeconds((seconds) => seconds - 1)
        : setSeconds((seconds) => 59);

      // minutes change
      if (c_seconds % 60 === 0 && minutes) {
        console.log('분');
        setMinutes((minutes) => minutes - 1);
      }

      // when only hours entered
      if (!minutes && hours) {
        setMinutes((minutes) => 59);
      }

      // hours change
      if (c_seconds % 3600 === 0 && hours) {
        setHours((hours) => hours - 1);
      }
    } else if (c_seconds <= 0) {
      clearInterval(timer);
    }
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const resetTimer = () => {
    console.log(timer);
    clearInterval(timer);

    setSeconds(0);
    setMinutes(0);
    setHours(0);

    hoursInput.current.value = 0;
    minutesInput.current.value = 0;
    secondsInput.current.value = 0;
  };

  return (
    <div className="App">
      <div className="inputGroup">
        <Input
          ref={hoursInput}
          placeholder={0}
          name="hours"
          onChange={(e) => {
            setHours(e.target.value);
          }}
        />
        H:
        <Input
          ref={minutesInput}
          placeholder={0}
          name="minutes"
          onChange={(e) => {
            setMinutes(e.target.value);
          }}
        />
        M:
        <Input
          ref={secondsInput}
          placeholder={0}
          name="seconds"
          onChange={(e) => {
            setSeconds(e.target.value);
          }}
        />
        S
      </div>
      <div>
        <Btn onClick={startTimer} className="start">
          start
        </Btn>
        <Btn onClick={stopTimer} className="stop">
          stop
        </Btn>
        <Btn onClick={resetTimer} className="reset">
          reset
        </Btn>
      </div>
      <Text>
        {hours} : {minutes} : {seconds}
      </Text>
      <div
        style={{ width: '100px', height: '300px', backgroundColor: 'tomato' }}
      >
        {testText.map((data, index) => {
          return <p key={index}>{data}</p>;
        })}
      </div>
    </div>
  );
};

const Input = styled.input`
  width: 20px;
  height: 40px;
  margin: 0px 10px;
  border: none;
  border-radius: 4px;
`;
const Btn = styled.button`
  padding: 10px;
  margin: 9px 5px 5px 5px;
  border: none;
  background-color: #aaf;
  border-radius: 4px;
`;
const Text = styled.div`
  font-weight: 600;
  font-size: 2rem;
  margin: 4px 0px;
`;

export default Timer;
