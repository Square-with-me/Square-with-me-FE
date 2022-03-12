import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { Button, Grid, Input } from '../elements/Index';
import '../styles/RoomInfoDrop.css';

//pages/components
import LoginModal from "../pages/LoginModal";
import SignupModal from "../pages/SignupModal";
import Sidebar from './Sidebar';

//icons
import { FaBars } from 'react-icons/fa';

const Header = (props) => {
  const dispatch = useDispatch();
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

  //드롭다운 부분
  const dropdownRef = useRef(null);

  //드롭여부 확인
  const [isActive, setIsActive] = useState(false);
  const Visible = (active) => {
    setIsActive(active);
  };
  
  const [RoomInfo, setRoomInfo] = useState('');

  const [LoginM, setIsM] = useState(false);
  const [SignupM, setIsSignup] = useState(false);

  return (
    <>
      <div className="container">
        <div className="rMenu-container">
          <DropBtn
            onClick={() => setIsActive(!isActive)}
            className="roomMenu-trigger"
          >
            <Text>방 정보</Text>
          </DropBtn>
          <nav
            ref={dropdownRef}
            className={`roomMenu ${isActive ? 'active' : 'inactive'}`}
          >
          <ul>
            <li>
              <a
                onChange={(e) => setRoomInfo(e.target.value)}
                onClick={() => {
                  isActive(false);
                }}
              >
                <h2>수학문제 풀자!</h2> <br/> #고1 수학
              </a>
            </li>
            <li>
              <a
                onChange={(e) => setRoomInfo(e.target.value)}
                onClick={() => {
                  isActive(false);
                }}
              >
                방 링크 복사
              </a>
            </li>
          </ul>
          </nav>
        </div>
      </div>

			<Grid is_flex padding="20px">
        <RightIcon>
          <FaBars size="1rem" onClick={openSidebar}></FaBars>
        </RightIcon>
        <Sidebar
          open={sidebaropen}
          close={closeSidebar}
          setIsM={setIsM} setIsSignup={setIsSignup}
        ></Sidebar>
      {LoginM && <LoginModal setIsM={setIsM} setIsSignup={setIsSignup}/>}
      {SignupM && <SignupModal setIsSignup={setIsSignup} />}
			</Grid>
    </>
  );
};

const Text = styled.div`
  size: 2rem;
  color: #2f2e2e;
`;

const DropBtn = styled.button`
  justify-content: center;
  position: absolute;
  background-color: #aaf;
  border: none;
  width: 65px;
  height: 38px;
  top: 14px;
  left: 85%;
`;

const RightIcon = styled.button`
  cursor: pointer;
  border: none;
  background-color: #fff;
  display: flex;
  width: 1634.5px;
  padding: 8px;
  justify-content: right;
`;

export default Header;