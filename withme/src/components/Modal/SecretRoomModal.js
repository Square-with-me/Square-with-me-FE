import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as roomActions } from "../../redux/modules/room";

//svg
import { ReactComponent as Lock } from "../../assets/modals/lockIcon.svg";

//modal
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const SecretRoomModal = (props) => {
  const [LoginM, setIsM] = React.useState(false);
  const [SignupM, setIsSignup] = React.useState(false);
  const history = useHistory()
  const userId = useSelector((store) => store.user.user.id);
  const dispatch = useDispatch();

  const [pwd, setPwd] = useState("");

  useEffect(()=>{
    if (!localStorage.getItem('login-token')) {
      alert('로그인 후 이용 가능 합니다');
      props.setSecret(false)
      setIsM(true)
    }
  },[])

  return (
    <React.Fragment>
      <ModalBackground onClick={() => props.setSecret(false)} />
      <SecretRoomWrap>
        <Headers
          onClick={() => {
            props.setSecret(false);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L20 20"
              stroke="#33344B"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M20 4L4 20"
              stroke="#33344B"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </Headers>
        <Contents>
          <HelloText>
            '{props.data.title}' 방은 비공개 방입니다 <br /> 입장하시려면
            비밀번호를 입력해주세요
          </HelloText>
          <div style={{ position: "relative" }}>
            <Lock
              fill="#8A8BA3"
              width="32px"
              height="32px"
              style={{ position: "absolute", left: "12", top: "8" }}
            />
            <Input
              label=""
              placeholder="비밀번호를 입력해주세요."
              type="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
            />
          </div>

          <Button
            onClick={() =>
              dispatch(roomActions.CheckPwdDB(pwd, props.data.id, userId))
            }
          >
            입장
          </Button>
        </Contents>
        {LoginM && <LoginModal setIsM={setIsM} setIsSignup={setIsSignup} />}
        {SignupM && <SignupModal setIsSignup={setIsSignup} />}
      </SecretRoomWrap>
    </React.Fragment>
  );
};
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
//모달창 전체
const SecretRoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 26px;
  position: fixed;
  width: 540px;
  height: 393px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fafafa;
  z-index: 100;
  @media screen and (max-width: 767px) {
    width: 350px;
  }
`;
//모달창 헤더
const Headers = styled.div`
  position: fixed;
  right: 26px;
  cursor: pointer;
`;
//모달창 안에 내용 감싸기
const Contents = styled.div`
  width: 100%;
`;

const HelloText = styled.div`
  align-self: stretch;
  margin-top: 50px;
  margin-bottom: 32px;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
  align-items: center;
  color: #33344b;
  @media screen and (max-width: 767px) {
    font-size: 19px;
  }
`;
const Input = styled.input`
  border: 1px solid #8a8ba3;
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  padding: 12px 12px 12px 50px;
  border-radius: 4px;
  @media screen and (max-width: 767px) {
    ::placeholder {
      font-size: 11px;
    }
  }
`;
const Button = styled.button`
  display: block;
  background-color: #7179f0;
  margin: 24px auto;
  border: none;
  height: 51px;
  width: 300px;
  border-radius: 4px;
  color: #fafaff;
  font-size: 18px;
  @media screen and (max-width: 767px) {
    font-size: 14px;
    padding: 0;
    width: 100%;
  }
`;

export default SecretRoomModal;
