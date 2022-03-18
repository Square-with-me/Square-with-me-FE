import React from "react";
import styled from "styled-components";

const BugModal=({setBug})=>{
  return (
    <React.Fragment>
      <div>버그모달</div>
      
      <ModalBackground
       onClick={()=>{
        setBug(false)
       }}/>
    </React.Fragment>
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
  justify-content: space-between;
  padding: 26px;
  position: fixed;
  width: 540px;
  min-height: 555px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fafafa;
  z-index: 100;
`;
export default BugModal;