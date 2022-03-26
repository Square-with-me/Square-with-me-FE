import React, { useState } from "react";
import styled from "styled-components";
import "../../styles/banner.css"
import Event from "../Modal/Event";

const Banner =()=>{
  const [event, setEvent] = useState(false)
  const CoffeeEvent =()=>{
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSfjH1T4DhQp6fqdaB9Ordtpe3NMKw0bZAAl4IHTfc6e2ItN8w/viewform?usp=sf_link")  
  }
 return (
   <React.Fragment>
    <div className="slide">
    <ul>
      <li onClick={()=>{setEvent(true)}}></li>
      <li onClick={CoffeeEvent}></li>
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