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
      seconds:0,
      countDown : null
    }
    this.hoursInput = React.createRef();
    this.minutesInput= React.createRef();
    this.secondsInput = React.createRef();
    this.subscribeToTimer(data => this.setState({ countdown: data.countdown }))
    this.subscribeToTimer = this.subscribeToTimer.bind(this)
    this.setTimer = this.setTimer.bind(this)
  }

  subscribeToTimer(cb) {
    socket.on('timer', data => cb(data))
  }
  setTimer() {
    socket.emit('settimer', { time: this.state.newTime })
  }
  startStop(bool) {
    //takes bool
    socket.emit('event', { status: bool })
  }

  inputHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  convertToSeconds = ( hours, minutes,seconds) => {
    return seconds + minutes * 60 + hours * 60 * 60;
  }

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown = () => {
    const  { hours, minutes, seconds } = this.state;
    let c_seconds = this.convertToSeconds(hours, minutes, seconds);

    if(c_seconds) {

      // seconds change
      seconds ? this.setState({seconds: seconds-1}) : this.setState({seconds: 59});

      // minutes change
      if(c_seconds % 60 === 0 && minutes) {
        this.setState({minutes: minutes -1});
      }

      // when only hours entered
      if(!minutes && hours) {
        this.setState({minutes: 59});
      }

      // hours change
      if(c_seconds % 3600 === 0 && hours) {
        this.setState({hours: hours-1});
      }

    } else {
      clearInterval(this.timer);
    }
  }


  stopTimer = () => {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    this.hoursInput.current.value = 0;
    this.minutesInput.current.value = 0;
    this.secondsInput.current.value = 0;
  }


  render() {
    const { hours, minutes, seconds } = this.state;

    return (
      <div className="App">
         <div className="inputGroup">
            <Input ref={this.hoursInput} placeholder={0} name="hours"  onChange={(e)=>{ this.setState({ newTime: e.target.value })}}/>H:
            <Input ref={this.minutesInput} placeholder={0} name="minutes" onChange={this.inputHandler}/>M:
            <Input ref={this.secondsInput} placeholder={0} name="seconds" onChange={this.inputHandler}/>S
         </div>
         <div>
            <Btn onClick={(e)=>{this.setState({ newTime: e.target.value }); this.startTimer(true) ; this.setTimer()} } className="start">start</Btn>
            <Btn onClick={_ =>{ this.startStop(false); this.stopTimer()}}  className="stop">stop</Btn>
            <Btn onClick={this.resetTimer}  className="reset">reset</Btn>
         </div>
         <Text> {this.state.hours} : {this.state.minutes} : {this.state.seconds} </Text>
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
`
const Btn = styled.button`
padding: 10px;
margin: 9px 5px 5px 5px;
border: none;
background-color: #aaf;
border-radius: 4px;
`

const Text = styled.div`
font-weight: 600;
font-size: 2rem;
margin: 4px 0px ;
`

export default Timer;