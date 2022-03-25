import React, { Component } from 'react';
import styled from 'styled-components';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.hoursInput = React.createRef();
    this.minutesInput = React.createRef();
    this.secondsInput = React.createRef();
    console.log(props.socketRef.current)
    ///////// 
  }

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  convertToSeconds = (hours, minutes, seconds) => {
    return seconds + minutes * 60 + hours * 60 * 60;
  };

  startTimer = async () => {
    this.timer = setInterval(this.countDown, 1000);

    const data = {
      roomId: this.props.roomId,
      hours: this.hoursInput.current.value,
      minutes: this.minutesInput.current.value,
      seconds: this.secondsInput.current.value,
    };

    console.log('스타트 버튼 누름', data);
    this.props.socketRef.current.emit('start_timer', data);
  };

  receiveStartTimer = () => {
    console.log(this.state.hours); // 2. 언디파인드 나옴
    this.timer = setInterval(this.countDown, 1000);
  };

  componentWillMount() {
    this.props.socketRef.current.emit('join_room', this.props.roomId);

    // 시작 신호 받음
    this.props.socketRef.current.on('start_receive', (data) => {
      this.setState({ hours: Number(data.hours) });
      this.setState({ minutes: Number(data.minutes) });
      this.setState({ seconds: Number(data.seconds) });

      this.receiveStartTimer();
      console.log('시작 신호 받음 ', data);

    });
  }

  componentDidUpdate() { // 1. 생명주기함수 잘못됨
    this.props.socketRef.current.on('stop_receive', () => {
      console.log("스탑 받음")
      this.receiveStopTimer();
    });

    this.props.socketRef.current.on('reset_receive', () => {
      console.log("리셋 받음")
      this.receiverSetTimer();
    });
  }

  countDown = () => {
    const { hours, minutes, seconds } = this.state;
    console.log('타이머 시작 : ',hours, minutes, seconds)
    let c_seconds = this.convertToSeconds(hours, minutes, seconds);

    if (c_seconds) {
      // seconds change
      seconds
        ? this.setState({ seconds: seconds - 1 })
        : this.setState({ seconds: 59 });

      if (hours && minutes && seconds) {
        this.setState({ seconds: seconds - 1 });
      } else if (!minutes && hours && seconds) {
        this.setState({ seconds: seconds - 1 });
      }

      // minutes change -> 분단위로 떨어지는데
      else if (c_seconds % 60 === 0 && minutes) {
        this.setState({ minutes: minutes - 1 });
      }

      // when only hours entered
      else if (!minutes && hours) {
        this.setState({ minutes: 59 });
        this.setState({ hours: hours - 1 });
      }

      // hours change
      else if (c_seconds % 3600 === 0 && hours) {
        this.setState({ hours: hours - 1 });
      }
    } else {
      clearInterval(this.timer);
      alert("시간 끝!")
    }
  };

  stopTimer = async () => {
    clearInterval(this.timer);
    this.props.socketRef.current.emit('stop_time', this.props.roomId);
  };

  resetTimer = async () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    this.hoursInput.current.value = 0;
    this.minutesInput.current.value = 0;
    this.secondsInput.current.value = 0;

    this.props.socketRef.current.emit('reset_time', this.props.roomId);
  };

  receiveStopTimer = () => {
    clearInterval(this.timer);
  };

  receiverSetTimer = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    console.log('리셋받음 함수', this.state)
    console.log('시간 벨류!!!!!!!!')
  };

  render() {
    const { hours, minutes, seconds } = this.state;

    return (
      <Container>
        <div className="inputGroup">
          <Input
            ref={this.hoursInput}
            placeholder={0}
            name="hours"
            onChange={this.inputHandler}
          />
          <p>H</p>
          <Input
            ref={this.minutesInput}
            placeholder={0}
            name="minutes"
            onChange={this.inputHandler}
          />
          <p>M</p>
          <Input
            ref={this.secondsInput}
            placeholder={0}
            name="seconds"
            onChange={this.inputHandler}
          />
          <p>S</p>
        </div>
        <div className="outputGroup">
          <Text>
            {hours}
            <span>H</span>
            {minutes}
            <span>M</span> {seconds}
            <span>S</span>
          </Text>
        </div>
        <div className="buttonGroup">
          <Btn onClick={this.startTimer} className="start">
            <div>start</div>
          </Btn>
          <Btn onClick={this.stopTimer} className="stop">
            <div>stop</div>
          </Btn>
          <Btn onClick={this.resetTimer} className="reset">
            <div>reset</div>
          </Btn>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Noto Sans';
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
    /* line-height: 150%; */
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
    font-family: 'Noto Sans';
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
  @media screen and (max-width: 820px) and (orientation: portrait) {
    font-size: 15px;
    margin: 3px 3px 3px 1px;
  }
`;

export default Timer;
