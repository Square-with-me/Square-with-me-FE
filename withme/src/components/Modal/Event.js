import React from "react";
import styled from "styled-components";
import event from "../../assets/banner/event.jpeg"
const Event =({setEvent})=>{
  return (
    <ModalBackground onClick={()=>{setEvent(false)}}>
      <LoginWrap>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjH1T4DhQp6fqdaB9Ordtpe3NMKw0bZAAl4IHTfc6e2ItN8w/viewform?usp=sf_link" target="_blank"><Image src= {event} onClick={()=>{setEvent(false)}}/></a>
      </LoginWrap>
    </ModalBackground>
  )
}
// 모달창 뒷배경
const ModalBackground = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
`;
//모달창 전체
const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 26px;
  position: fixed;
  width: 900px;
  height: 900px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fafafa;
  z-index: 100;
  @media screen and (max-width:767px){ 
	  width: 350px;
    height: 350px;
}
`;

const Image = styled.img`
 width: 100%;
 height: 100%;
`
export default Event