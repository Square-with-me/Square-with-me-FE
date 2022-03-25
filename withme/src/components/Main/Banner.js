import React, { useState } from "react";
import styled from "styled-components";
import "../../styles/banner.css"
import Event from "../Modal/Event";

const Banner =()=>{
  const [event, setEvent] = useState(false)
 return (
   <React.Fragment>
    <div className="slide">
    <ul>
      <li onClick={()=>{setEvent(true)}}></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    {event=== true
    ?<Event setEvent={setEvent}/>
    :""}
  </div>
   </React.Fragment>
 )
}

export default Banner;