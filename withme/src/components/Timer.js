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
<<<<<<< HEAD
      seconds:0
    }
    console.log(props)
=======
      seconds: 0,
      testText: [],
    };
>>>>>>> 20ffc00379da1f79f74639e87b7d78814117e93c
    this.hoursInput = React.createRef();
    this.minutesInput = React.createRef();
    this.secondsInput = React.createRef();
  }

  //  subscribeToTimer(cb) {
  //    socket.on('timer', (data) => cb(data));
  //  }
  //  setTimer() {
  //    socket.emit('settimer', { time: this.state.newTime });
  //  }

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  convertToSeconds = (hours, minutes, seconds) => {
    return seconds + minutes * 60 + hours * 60 * 60;
  };

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
    // console.log(this.props.roomId);
    console.log('스타트 버튼 누름');
    socket.emit('start_timer', this.props.roomId);
  };

  componentDidMount() {
    socket.on('start_receive', (data) => {
      console.log('타이머 시작!!!!!!!!!!');
      this.testText.push('실행');
    });
  }
  componentDidUpdate() {
    socket.on('start_receive', (data) => {
      console.log('타이머 시작!!!!!!!!!!');
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

      // minutes change
      if (c_seconds % 60 === 0 && minutes) {
        this.setState({ minutes: minutes - 1 });
      }

      // when only hours entered
      if (!minutes && hours) {
        this.setState({ minutes: 59 });
      }

      // hours change
      if (c_seconds % 3600 === 0 && hours) {
        this.setState({ hours: hours - 1 });
      }
    } else {
      clearInterval(this.timer);
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    this.hoursInput.current.value = 0;
    this.minutesInput.current.value = 0;
    this.secondsInput.current.value = 0;
<<<<<<< HEAD
  }
=======
  };
>>>>>>> 20ffc00379da1f79f74639e87b7d78814117e93c

  render() {
    const { hours, minutes, seconds } = this.state;

    return (
      <div className="App">
<<<<<<< HEAD
         <div className="inputGroup">
            <Input ref={this.hoursInput} placeholder={0} name="hours"  onChange={this.inputHandler} type="number" min="0" max="23"/>H:
            <Input ref={this.minutesInput} placeholder={0} name="minutes" onChange={this.inputHandler} type="number" min="0" max="59"/>M:
            <Input ref={this.secondsInput} placeholder={0} name="seconds" onChange={this.inputHandler} type="number" min="0" max="59"/>S
         </div>
         <div>
            <Btn onClick={this.startTimer} className="start">start</Btn>
            <Btn onClick={this.resetTimer} className="reset">reset</Btn>
            <Btn onClick={this.stopTimer}  className="stop">stop</Btn>
         </div>
         <Text> {hours} : {minutes} : {seconds} </Text>
=======
        <div className="inputGroup">
          <Input
            ref={this.hoursInput}
            placeholder={0}
            name="hours"
            onChange={this.inputHandler}
          />
          H:
          <Input
            ref={this.minutesInput}
            placeholder={0}
            name="minutes"
            onChange={this.inputHandler}
          />
          M:
          <Input
            ref={this.secondsInput}
            placeholder={0}
            name="seconds"
            onChange={this.inputHandler}
          />
          S
        </div>
        <div>
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
        <Text>
          {hours} : {minutes} : {seconds}
        </Text>
        <div
          style={{ width: '100px', height: '300px', backgroundColor: 'tomato' }}
        >
          {this.testText}
        </div>
>>>>>>> 20ffc00379da1f79f74639e87b7d78814117e93c
      </div>
    );
  }
}

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
