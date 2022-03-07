import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid, Input } from '../elements/Index';
// import MainLogo from '../image/MainLogo.png';
import { FaBars } from 'react-icons/fa';

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import { actionCreators as userActions } from '../redux/modules/user';

import { history } from '../redux/configureStore';

import Sidebar from './Sidebar';

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

  //방 만들기
  const [MRooms, setMRooms] = useState(false);

  const notUser_is_login = useSelector((state)=>state.user.notUser_is_login)
  const notUser_is_local = localStorage.getItem("notUser_is_login")? true: false

  return (
    <>
			<Grid is_flex padding="20px">
        <LeftIcon>
          <FaBars size="1rem" onClick={openSidebar}></FaBars>
        </LeftIcon>
        <Sidebar
          open={sidebaropen}
          close={closeSidebar}
        ></Sidebar>
			</Grid>
    </>
  );
};

const LeftIcon = styled.button`
  // width: 70px;
  cursor: pointer;
  border: none;
  background-color: #fff;
  display: flex;
  justifycontent: left;
  padding: 0 20px;
`;

export default Header;