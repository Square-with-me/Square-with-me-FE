import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid, Input } from '../elements/Index';
// import MainLogo from '../image/MainLogo.png';
import { FaBars } from 'react-icons/fa';

import { useDispatch, useSelector } from "react-redux";

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

  return (
    <>
			<Grid is_flex padding="20px">
        <RightIcon>
          <FaBars size="1rem" onClick={openSidebar}></FaBars>
        </RightIcon>
        <Sidebar
          open={sidebaropen}
          close={closeSidebar}
        ></Sidebar>
			</Grid>
    </>
  );
};

const RightIcon = styled.button`
  // width: 70px;
  cursor: pointer;
  border: none;
  background-color: #fff;
  display: flex;
  justifycontent: right;
  padding: 8px 97.58%;
`;

export default Header;