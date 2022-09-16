import styled from "styled-components";

import { ReactComponent as HamburgerIcon } from "../../assets/modals/hamburgerIcon.svg";
import { ReactComponent as UserNickIcon } from "../../assets/modals/userNickIcon.svg";
import { ReactComponent as ExitIcon } from "../../assets/inRoom/exitIcon.svg";
import { ReactComponent as Signup } from "../../assets/inRoom/userListIcon.svg";

interface RoomsPageSideNavProps {
  isOpen: boolean;
  toggleInnerNav: any;
}

function RoomsPageToggleNav({ isOpen, toggleInnerNav }: RoomsPageSideNavProps) {

  return (
    <>
      {isOpen ?
        <>
          <Wrap>
            <SidebarHeader>
              <HamburgerIcon
                fill="#030000"
                width="32px"
                height="32px"
                className="sidebar"
                onClick={toggleInnerNav}
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
              {/* {user.origin ? (
                <Text
                  onClick={() => {
                    history.push(`/mypage/${user.id}`);
                    close();
                  }}
                >
                  마이페이지
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
              )} */}
            </div>
            <div
              style={{ display: "flex", padding: "8px", alignItems: "center" }}
            >
              {/* {user.origin ? (
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
                      close();
                    }}
                  >
                    회원가입
                  </Text>
                </div>
              )} */}
            </div>
          </Wrap>
          <ModalBackground
            // onClick={() => {
            //   close();
            // }}
          />
        </> : <></>
      }
    </>
  )
}

export default RoomsPageToggleNav;

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
  top: 19px;
  right: -26px;
  animation: modal-bg-show 0.6s;
  font-weight: 500;

  @media screen and (min-width: 813px) and (max-width: 1110px) {
    margin: 0px 12px;
  }
  @media screen and (min-width: 563px) and (max-width: 813px) {
    margin: 0px 12px;
  }
  @media screen and (max-width: 563px) {
    top: 25.8px;
    width: 150px;
    padding: 10px;
    margin: 0px 18px;
  }

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
  background-color: #f7f7f7;
`;

const Text = styled.div`
  font-size: 18px;
  color: #33344b;
  cursor: pointer;
  font-weight: 550;
  @media screen and (max-width: 563px) {
    font-size: 13px;
  }
`;