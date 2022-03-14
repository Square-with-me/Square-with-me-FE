import React, { Component } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
const socket = io.connect('/');

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

    console.log('스타트 버튼 누름');
    await socket.emit('start_timer', data);
  };

  receiveStartTimer = () => {
    console.log(this.hours, this.minutes, this.seconds);
    this.timer = setInterval(this.countDown, 1000);
  };

  componentWillMount() {
    socket.emit('join_room', this.props.roomId);

    // 시작 신호 받음
    socket.on('start_receive', (data) => {
      this.setState({ hours: data.hours });
      this.setState({ minutes: data.minutes });
      this.setState({ seconds: data.seconds });

      this.receiveStartTimer();
    });
  }

  componentDidUpdate() {
    socket.on('stop_receive', () => {
      this.receiveStopTimer();
    });

    socket.on('reset_receive', () => {
      this.receiveresetTimer();
    });
  }

  countDown = () => {
    const { hours, minutes, seconds } = this.state;
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
    }
  };

  stopTimer = async () => {
    clearInterval(this.timer);
    await socket.emit('stop_time', this.props.roomId);
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

    await socket.emit('reset_time', this.props.roomId);
  };

  receiveStopTimer = () => {
    clearInterval(this.timer);
  };

  receiveresetTimer = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    this.hoursInput.current.value = 0;
    this.minutesInput.current.value = 0;
    this.secondsInput.current.value = 0;
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
            start
          </Btn>
          <Btn onClick={this.stopTimer} className="stop">
            stop
          </Btn>
          <Btn onClick={this.resetTimer} className="reset">
            reset
          </Btn>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  height: 180px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Noto Sans';

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

    padding: 9px 20px 9px 20px;
    background-color: #e3e5ff;

    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .buttonGroup {
    display: flex;
    justify-content: space-between;
    height: 30px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  background: #ffffff;
  text-align: center;

  color: #8a8ba3;
  font-weight: 800;
  font-size: 16px;
  line-height: 150%;

  &::placeholder {
    color: #8a8ba3;
    font-weight: 800;
    font-size: 16px;
    line-height: 150%;
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
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: #7179f0;

  color: #fafaff;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
`;

export default Timer;
