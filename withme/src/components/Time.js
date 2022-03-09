import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Time =(props)=>{
  const [hours, seHours] = useState(0)
  const [minutes, setMiuntes] = useState(0)
  const [seconds, setSedonds] = useState(0)

  const hoursInput = useRef()
  const minutesInput = useRef()
  const secondsInput = useRef()

  const convertToSeconds = () => {
    return seconds + minutes * 60 + hours * 60 * 60;
  }

  const startTimer = () => {
    setInterval(countDown(), 1000);
  }

  const stopTimer = () => {
    clearInterval();
  }

  const countDown=()=>{
    const c_seconds = convertToSeconds(hours,minutes,seconds)

    if(c_seconds){
      
      if(seconds){
        {seconds -= 1} 
      } else{
        {seconds = 59}
      }

      if(c_seconds % 60 ===0 && minutes){
        {minutes -= 1}
      }

      if(!minutes && hours){
       { minutes = 59}
      }

      if(c_seconds %3600 ===0 && hours){
        hours -=1
      }
    } else{
      clearInterval()
    }
  }

  const resetTimer =()=>{
    hoursInput.current.value = 0
    minutesInput.current.value = 0
    secondsInput.current.value = 0
  }


  return(
    <React.Fragment>
      <div>
        <Input ref={hoursInput} placeholder={0} name="hours"  onChange={(e)=>{seHours(e.target.value)}}/>H:
        <Input ref={minutesInput} placeholder={0} name="minutes" onChange={(e)=>{setMiuntes(e.target.value)}}/>M:
        <Input ref={secondsInput} placeholder={0} name="seconds" onChange={(e)=>{setSedonds(e.target.value)}}/>S
      </div>
      <div>
        <Btn onClick={startTimer} className="start">start</Btn>
        <Btn onClick={resetTimer}  className="reset">reset</Btn>
        <Btn onClick={stopTimer}  className="stop">stop</Btn>
      </div>
      <Text> {hours} : {minutes} : {seconds} </Text>
    </React.Fragment>
  )
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

export default Time;