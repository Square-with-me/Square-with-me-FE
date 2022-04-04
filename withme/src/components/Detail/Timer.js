import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Timer = ({ socket, roomId }) => {

  const hours = useRef(0);
  const minutes = useRef(0);
  const seconds = useRef(0);

  const [hoursInput, setHoursInput] = useState(0);
  const [minutesInput, setMinutesInput] = useState(0);
  const [secondsInput, setSecondsInput] = useState(0);
  const [isStart, setIsStart] = useState(false);

  const timer = useRef(null);

  const convertToSeconds = (hours, minutes, seconds) => {
    return seconds + minutes * 60 + hours * 60 * 60;
  };

  const startTimer = async () => {
    timer.current = setInterval(() => {
      countDown();
    }, 1000);

    const data = {
      roomId: roomId,
      hours: hoursInput,
      minutes: minutesInput,
      seconds: secondsInput,
    };
    //시작신호 소켓으로 보내기
    socket.emit("start_timer", data);
    
    //각 인풋 값을 0으로 만들기!
    setHoursInput(0);
    setMinutesInput(0);
    setSecondsInput(0);

    //시작 버튼 안눌리게
    setIsStart(true);
  };

  //스타트 받았을때 
  useEffect(() => {
    socket.on("start_receive", (data) => {
      hours.current = Number(data.hours);
      minutes.current = Number(data.minutes);
      seconds.current = Number(data.seconds);

      timer.current = setInterval(() => {
        countDown();
      }, 1000);

      setHoursInput(0);
      setMinutesInput(0);
      setSecondsInput(0);

      setIsStart(true);
    });
  }, [socket]);

  //리셋 받았을때 
  useEffect(() => {
    socket.on("reset_receive", () => {
      hours.current = 0;
      minutes.current = 0;
      seconds.current = 0;
      setIsStart(false);
      clearInterval(timer.current);
    });
  }, [socket]);

  const countDown = () => {
    let c_seconds = convertToSeconds(
      Number(hours.current),
      Number(minutes.current),
      Number(seconds.current)
    );
    //전체 0일때 
    if (hours.current === 0 && minutes.current === 0 && seconds.current === 0) {
      clearInterval(timer.current);
      setIsStart(false);
      alert("시간 끝!")
    }
    // 타이머 알고리즘
    if (c_seconds) {
      if (c_seconds % 3600 === 0) {
        // 시간 단위로 떨어질 때
        hours.current = hours.current - 1;
        minutes.current = 59;
        seconds.current = 59;
      } else if (c_seconds % 60 === 0) {
        // 분 단위로 떨어질 때
        minutes.current = minutes.current - 1;
        seconds.current = 59;
      } else {
        seconds.current = seconds.current - 1;
      }
    }
  };

  const resetTimer = () => {
    hours.current = 0;
    minutes.current = 0;
    seconds.current = 0;

    setHoursInput(0);
    setMinutesInput(0);
    setSecondsInput(0);
    setIsStart(false);

    clearInterval(timer.current);

    socket.emit("reset_time", roomId);
  };

  return (
    <Container>
      <div className="inputGroup">
        <Input
          value={hoursInput}
          placeholder={0}
          name="hours"
          onChange={(e) => {
            setHoursInput(e.target.value);
            hours.current = e.target.value;
          }}
          disabled={isStart}
          maxLength="2"
        />
        <p>H</p>
        <Input
          value={minutesInput}
          placeholder={0}
          name="minutes"
          onChange={(e) => {
            setMinutesInput(e.target.value);
            minutes.current = e.target.value;
          }}
          disabled={isStart}
          maxLength="2"
        />
        <p>M</p>
        <Input
          value={secondsInput}
          placeholder={0}
          name="seconds"
          onChange={(e) => {
            setSecondsInput(e.target.value);
            seconds.current = e.target.value;
          }}
          disabled={isStart}
          maxLength="2"
        />
        <p>S</p>
      </div>
      <div className="outputGroup">
        <Text>
          {hours.current}
          <span>H</span>
          {minutes.current}
          <span>M</span>
          {seconds.current}
          <span>S</span>
        </Text>
      </div>
      <div className="buttonGroup">
        <Btn onClick={startTimer} className="start" disabled={isStart}>
          start
        </Btn>
        <Btn onClick={resetTimer} className="reset">
          reset
        </Btn>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: "Noto Sans";
  margin-top: 20px;

  .inputGroup {
    display: flex;
    align-items: end;

    p {
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 19px;
      margin: 0 5%;
    }
  }

  .outputGroup {
    width: 100%;
    height: 60px;
    box-sizing: border-box;

    padding: 8px 10px;
    background-color: #e3e5ff;

    display: flex;
    flex-direction: row;
    align-items: center;

    // 세로가 더 긴 기기가 세로로 있을 때 .outputGroup이 밀려보이는 부분 조절
    @media screen and (max-width: 820px) and (orientation: portrait) {
      width: 98%;
    }
  }
  .buttonGroup {
    display: flex;
    justify-content: space-between;
  }
`;

const Input = styled.input`
  width: 20%;
  height: 42px;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  background: #ffffff;
  text-align: center;
  margin: auto;

  color: #8a8ba3;
  font-weight: 800;
  font-size: 16px;
  line-height: 150%;

  &::placeholder {
    color: #8a8ba3;
    font-weight: 800;
    font-size: 16px;
  }
  &:focus {
    border: none;
    outline: 1px solid #7179f0;
    box-shadow: 0px 0px 6px rgba(113, 121, 240, 0.3);
  }
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;

  font-weight: 400;
  font-size: 36px;
  line-height: 36px;
  text-align: center;
  color: #8a8ba3;

  span {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 19px;
    margin: 0 5%;
  }
`;

const Btn = styled.button`
  width: 100%;
  margin: auto 5px;
  padding: 4px;
  border: none;
  border-radius: 4px;
  background-color: #7179f0;
  align-items: center;
  align-content: center;
  color: #fafaff;
  font-size: 18px;
  font-weight: 400;
  /* line-height: 27px; */

  // 세로가 더 긴 기기가 세로로 있을 때 버튼 밀리는 부분 조절
  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 15px;
    margin: 3px 3px 3px 1px;
  }
`;

export default Timer;
