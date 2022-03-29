import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import "../../styles/RoomInfoDrop.css";

//pages/components
import LoginModal from "../Modal/LoginModal";
import SignupModal from "../Modal/SignupModal";
import MSidebar from "./MSidebar";

//icons
import { ReactComponent as UserNickIcon } from "../../assets/modals/sidebarIcon.svg";

const MHeader = (props) => {
  //사이드바
  let [sidebaropen, setSidebarOpen] = useState(false);

  //사이드 탭 열기
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  //사이드 탭 닫기
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const [LoginM, setIsM] = useState(false);
  const [SignupM, setIsSignup] = useState(false);

  return (
    <React.Fragment>
      <RightIcon>
      <UserNickIcon
          fill="#030000"
          width="32px"
          height="32px"
          className="sidebar"
          onClick={()=>openSidebar(true)}
        />
      </RightIcon>
        <MSidebar
          open={sidebaropen}
          close={closeSidebar}
          setIsM={setIsM}
          setIsSignup={setIsSignup}
        ></MSidebar>
      {LoginM && <LoginModal setIsM={setIsM} setIsSignup={setIsSignup} />}
      {SignupM && <SignupModal setIsSignup={setIsSignup} />}
    </React.Fragment>
  );
};

const RightIcon = styled.button`
  cursor: pointer;
  border: none;
  max-width: 100%;
  justify-content: right;
  background-color: transparent;
`;

export default MHeader;