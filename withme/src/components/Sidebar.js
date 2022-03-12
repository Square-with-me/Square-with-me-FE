import React, { useEffect, useState } from 'react';
import { Text, Grid } from '../elements/Index';
import styled from 'styled-components';

import SecretRoomModal from "../pages/SecretRoomModal";
import LoginModal from '../pages/LoginModal';
import SignupModal from '../pages/SignupModal';
import MakeRoomModal from '../pages/MakeRoomModal';

import { FaBars } from 'react-icons/fa';
// import MainLogo from '../image/MainLogo.png';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

const Sidebar = (props) => {
  const { open, close, header, setIsM} = props;
  const dispatch = useDispatch();

  const [MRooms, setMRooms] = useState(false);
  const [SRoomM, setSRoomM] = useState(false);

  const notUser_is_login = useSelector((state) => state.user.notUser_is_login);
  const notUser_is_local = localStorage.getItem('notUser_is_login')
    ? true
    : false;

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(userActions.logInCheckDB());
  }, []);

  if (open) {
    return (
      <>
      <ModalBackground onClick ={()=>{close()}}/>
      <OpenSidebar>
        <Section>
          <SidebarHeader>
            <Grid is_flex padding="0px" justifyContent="left" height="52px">
              {open ?
              <RightIcon>
                <FaBars
                  color="#000"
                  size="1rem"
                  onClick={close}
                  padding="0 20px"
                >
                  {header}
                </FaBars>
              </RightIcon> : " "}

            </Grid>
          </SidebarHeader>

          <SidebarContent>
            <MenuButton
              onClick={() => {
                setIsM(true);
                close();
              }}
            >
              <MenuText>로그인</MenuText>
            </MenuButton>

            <MenuButton
              onClick={() => {
                history.push(`/mypage/${user.id}`);
                close();
              }}
            >
              <MenuText>마이페이지</MenuText>
            </MenuButton>

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

              <MenuButton>
                <MenuText
                onClick={() => {
                  setSRoomM(true);
                  // close();
                }}>비공개 방 모달</MenuText>
                {SRoomM && <SecretRoomModal setSRoomM={setSRoomM} />}
              </MenuButton>
          </SidebarContent>
        </Section>
      </OpenSidebar>
      </>
    );
  }
  return null;
};

const ModalBackground = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const SidebarBox = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;

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

const OpenSidebar = styled.div`
  //위치 조정
  display: flex;
  justify-content: right;
  align-items: top;
  z-index: 100;
  padding: 1%;
  width: 300px;

  /* 팝업이 스르륵 열리는 효과 */
  animation: modal-bg-show 0.6s;

  position: fixed;
  top: 0;
  right: 0;

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
  padding: 5%;
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
  justify-content: right;
  padding: 0 84.8%;
`;

export default Sidebar;
