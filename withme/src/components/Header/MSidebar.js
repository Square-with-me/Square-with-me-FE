import React, { useEffect, useState } from "react";
import { history } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

//style
import styled from "styled-components";

//svg
import { ReactComponent as SidebarIcon } from "../../assets/modals/sidebarIcon.svg";
import { ReactComponent as UserNickIcon } from "../../assets/modals/userNickIcon.svg";
import { ReactComponent as ExitIcon } from "../../assets/inRoom/exitIcon.svg";
import { ReactComponent as Signup } from "../../assets/inRoom/userListIcon.svg";

//redux
import { actionCreators as userActions } from "../../redux/modules/user";

const MSidebar = (props) => {
  const { open, close, header, setIsM, setIsSignup } = props;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  if (open) {
    return (
      <React.Fragment>
        <Wrap>
          <SidebarHeader>
            <SidebarIcon
              fill="#030000"
              width="32px"
              height="32px"
              className="sidebar"
              onClick={close}
            />
          </SidebarHeader>
          <div
            style={{ display: "flex", padding: "8px", alignItems: "center" }}
          >
            <UserNickIcon
              fill="#000000"
              width="32px"
              height="32px"
              style={{ marginRight: "8px" }}
            />
            {user.origin ? (
              <Text
                onClick={() => {
                  window.location.replace('/main');
                  close();
                }}
              >
                메인페이지
              </Text>
            ) : (
              <Text
                onClick={() => {
                  setIsM(true);
                  close();
                }}
              >
                로그인
              </Text>
            )}
          </div>
          <div
            style={{ display: "flex", padding: "8px", alignItems: "center" }}
          >
            {user.origin ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <ExitIcon
                  fill="#000000"
                  width="32px"
                  height="32px"
                  style={{ marginRight: "8px" }}
                />
                <Text
                  onClick={() => {
                    dispatch(userActions.logOut());
                  }}
                >
                  로그아웃
                </Text>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Signup
                  fill="#000000"
                  width="32px"
                  height="32px"
                  style={{ marginRight: "8px" }}
                />
                <Text
                  onClick={() => {
                    setIsSignup(true);
                  }}
                >
                  회원가입
                </Text>
              </div>
            )}
          </div>
        </Wrap>
        <ModalBackground
          onClick={() => {
            close();
          }}
        />
      </React.Fragment>
    );
  }
  return null;
};

const ModalBackground = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Wrap = styled.div`
  z-index: 30;
  padding: 16px;
  width: 200px;
  background-color: #f7f7f7;
  position: absolute;
  top: -25px;
  right: -26px;
  animation: modal-bg-show 0.6s;
  font-weight: 500;
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
  display: flex;
  justify-content: right;
  padding: 10px;
  font-weight: 700;
  background-color: #f7f7f7;
`;

const Text = styled.div`
  font-size: 18px;
  color: #000000;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
`;

export default MSidebar;
