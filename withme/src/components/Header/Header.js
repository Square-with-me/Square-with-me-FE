import React, { useState } from "react";
import styled from "styled-components";
import "../../styles/RoomInfoDrop.css";

//pages/components
import LoginModal from "../Modal/LoginModal";
import SignupModal from "../Modal/SignupModal";
import Sidebar from "./Sidebar";

//icons
import { ReactComponent as UserNickIcon } from "../../assets/modals/sidebarIcon.svg";

const Header = (props) => {
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
        <Sidebar
          open={sidebaropen}
          close={closeSidebar}
          setIsM={setIsM}
          setIsSignup={setIsSignup}
        ></Sidebar>
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
  margin: 45px 0px 0px 0px;
`;

export default Header;
