import React, { useState } from 'react';
import { Text, Grid } from '../elements/Index';
import styled from 'styled-components';

import MakeRoomModal from "../pages/MakeRoomModal";
import SecretRoomModal from "../pages/SecretRoomModal";

import { FaBars } from 'react-icons/fa';
// import MainLogo from '../image/MainLogo.png';

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

const Sidebar = (props) => {
  const { open, close, header, setIsM} = props;
  const dispatch = useDispatch();

  const [MRooms, setMRooms] = useState(false);
  const [SRoomM, setSRoomM] = useState(false);

  const notUser_is_login = useSelector((state)=>state.user.notUser_is_login)
  const notUser_is_local = localStorage.getItem("notUser_is_login")? true: false

  if (open) {
    return (
      <React.Fragment>
      <OpenSidebar>
        <Section>
          <SidebarHeader>
            <Grid is_flex padding="0px" justifyContent="left" height="52px">
            {/* <Grid is_flex justifyContent="left">
                <img
                  src={MainLogo}
                  style={{
                    width: '150px',
                    height: '35px',
                  }}
                />
              </Grid> */}
              
              <RightIcon>
                <FaBars
                  color="#000"
                  size="1rem"
                  onClick={close}
                  padding="0 20px"
                >
                  {header}
                </FaBars>
              </RightIcon>
            </Grid>
          </SidebarHeader>

          <SidebarContent>
              <MenuButton
                onClick={() => {
                  setIsM(true);
                  close();
                }}>
                <MenuText>로그인</MenuText>
              </MenuButton>

              <MenuButton
                onClick={() => {
                  history.push('/mypage/:id');
                  close();
                }}>
                <MenuText>마이페이지</MenuText>
              </MenuButton>

              {/* <MenuButton
                onClick={() => {
                  setMRooms(true);
                }}>
                  <MenuText>방 만들기</MenuText>
                </MenuButton>
                {MRooms && <MakeRoomModal setMRooms={setMRooms} />} */}

              {notUser_is_local===false ?
                <MenuButton 
                  onClick={()=>{
                    dispatch(userActions.NotMemberloginDB())
                  }}>
                    <MenuText>비회원으로 즐기기</MenuText>
                </MenuButton>:

                <MenuButton
                  onClick={()=>{
                    dispatch(userActions.notUserLogOut())
                  }}>
                    <MenuText>비회원은 그만할래요</MenuText>
                </MenuButton>
              }

              <MenuButton
                onClick={() => {
                  setSRoomM(true);
                }}>
                <MenuText>비공개 방 모달</MenuText>
                {SRoomM && <SecretRoomModal setSRoomM={setSRoomM} />}
              </MenuButton>
          </SidebarContent>
        </Section>
      </OpenSidebar>
      </React.Fragment>
    );
  }
  return null;
};

const SidebarBox = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-left: -300px;
    }
    to {
      opacity: 1;
      margin-left: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const OpenSidebar = styled(SidebarBox)`
  //위치 조정
  display: flex;
  justify-content: right;
  align-items: top;

  /* 팝업이 스르륵 열리는 효과 */
  animation: modal-bg-show 0.6s;
`;

const SidebarHeader = styled.header`
  position: relative;
  padding: 10px;
  background-color: #fff;
  font-weight: 700;
`;

const Section = styled.section`
  width: 100%;
  max-width: 350px;
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업이 스르륵 열리는 효과 */
  animation: modal-show 0.3s linear;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarContent = styled.div`
  padding: 0;
  //modal 배경색
  background-color: #fff;
  height: 100%;
`;

const MenuButton = styled.button`
  height: 40px;
  padding: 6px 12px;
  color: #fff;
  background-color: #fff;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  border: 0;

  //is_flex
  display: flex;
  justify-content: left;

  //가운데 오게
  align-items: center;
`;

const MenuText = styled.p`
  color: #000;
  font-size: 18px;
`;

//Header에서 가져온 로고 =이렇게 생긴거
const RightIcon = styled.button`
  cursor: pointer;
  border: none;
  background-color: #fff;
  display: flex;
  justifycontent: right;
  padding: 0 84.8%;
`;

export default Sidebar;
