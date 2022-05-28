import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

//svg
import { ReactComponent as Lock } from "../../assets/modals/lockIcon.svg";
import { ReactComponent as UserNickIcon } from "../../assets/modals/userNickIcon.svg";
import { ReactComponent as EmailIcon } from "../../assets/modals/emailIcon.svg";

const SignupModal = ({ setIsSignup }) => {
  const dispatch = useDispatch();

  const [origin, setOrigin] = React.useState("");
  const [nickname, setNickName] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");

  const Signup = () => {
    if (nickname.length > 8 || nickname.length < 2) {
      window.alert(
        "닉네임은 영문, 숫자 또는 한글로 이루어진 2~8자를 사용하세요"
      );
    }

    if (pwd.length > 16 || pwd.length < 8) {
      window.alert(
        "비밀번호는 영문(필수), 숫자(필수), 특수문자(자유)로 이루어진 8~16자를 사용하세요"
      );
    }

    dispatch(userActions.signUpDB(origin, nickname, pwd, pwd_check));
  };

    const login = () => {
    if (nickname.length > 8 || nickname.length < 2) {
      window.alert(
        "닉네임은 영문, 숫자 또는 한글로 이루어진 2~8자를 사용하세요"
      );
    }

    if (pwd.length > 16 || pwd.length < 8) {
      window.alert(
        "비밀번호는 영문(필수), 숫자(필수), 특수문자(자유)로 이루어진 8~16자를 사용하세요"
      );
    }

    dispatch(userActions.logInDB(origin, pwd));
  };

  return (
    <>
      <ModalBackground
        onClick={() => {
          setIsSignup(false);
        }}
      />
      <SignUpWrap>
        <Headers
          onClick={() => {
            setIsSignup(false);
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
            환영합니다 <br /> 저희와 재미있는 만남을 만들어봐요!
          </HelloText>
          <div style={{ position: "relative" }}>
            <EmailIcon
              fill="#8A8BA3"
              width="32px"
              height="32px"
              style={{ position: "absolute", margin: "8px 12px" }}
            />
            <Input
              label=""
              placeholder="이메일을 입력해주세요."
              onChange={(e) => {
                setOrigin(e.target.value);
              }}
              value={origin}
            />
          </div>
          <div style={{ display: "flex", position: "relative" }}>
            <UserNickIcon
              fill="#8A8BA3"
              width="32px"
              height="32px"
              style={{ position: "absolute", margin: "8px 12px" }}
            />
            <Input
              label=""
              placeholder="영문, 숫자 또는 한글로 이루어진 2~8자의 닉네임을 입력해주세요"
              onChange={(e) => {
                setNickName(e.target.value);
              }}
              value={nickname}
            />
          </div>
          <div style={{ position: "relative" }}>
            <Lock
              fill="#8A8BA3"
              width="32px"
              height="32px"
              style={{ position: "absolute", margin: "8px 12px" }}
            />
            <Input
              label=""
              placeholder="영문(필수), 숫자(필수), 특수문자(자유)로 이루어진 8~16자의 비밀번호"
              type="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
            />
          </div>
          <div style={{ position: "relative" }}>
            <Lock
              fill="#8A8BA3"
              width="32px"
              height="32px"
              style={{ position: "absolute", margin: "8px 12px" }}
            />
            <Input
              label=""
              placeholder="비밀번호를 다시 입력해주세요."
              type="password"
              onChange={(e) => {
                setPwdCheck(e.target.value);
              }}
              value={pwd_check}
            />
          </div>
          <SignUpButton onClick={() => { Signup(); login(); }}>회원가입</SignUpButton>
        </Contents>
      </SignUpWrap>
    </>
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
const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 26px;
  position: fixed;
  width: 540px;
  height: 595px;
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
  font-weight: 600;
  line-height: 28px;
  align-items: center;
  color: #4a4a58;
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
  &:focus {
    border: none;
    outline: 1px solid #7179f0;
    box-shadow: 0px 0px 6px rgba(113, 121, 240, 0.3);
  }
  @media screen and (max-width: 767px) {
    ::placeholder {
      font-size: 11px;
    }
  }
`;
const SignUpButton = styled.button`
  display: block;
  background-color: #7179f0;
  margin: 24px auto;
  border: none;
  height: 51px;
  width: 351px;
  border-radius: 4px;
  color: #fafaff;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s;
  &:hover {
    background-color: #bcc0ff;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 15px;
  }
`;
export default SignupModal;
