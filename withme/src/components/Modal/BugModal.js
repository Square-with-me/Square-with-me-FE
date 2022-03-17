import React from "react";
import styled from "styled-components";

const BugModal=()=>{
  return (
    <React.Fragment>
      <div>버그모달</div>
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

export default BugModal;