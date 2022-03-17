import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// redux import
import { actionCreators as userActions } from "../../redux/modules/user";

//svg
import { ReactComponent as UserNickIcon } from "../../assets/modals/userNickIcon.svg";
import { ReactComponent as EmailIcon } from "../../assets/modals/emailIcon.svg";
import {ReactComponent as Lock} from "../../assets/modals/lockIcon.svg"

const LoginModal = ({ setIsM, setIsSignup }) => {
  const dispatch = useDispatch();

  const redirectURI = "http://localhost:3000/api/auth/kakao/callback";
  // const KAKAO_REST_API_KEY = "받은키값";

  const [origin, setOrigin] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const LoginModal = () => {
    dispatch(userActions.logInDB(origin, pwd));
  };
  return (
    <>
      <ModalBackground
        onClick={() => {
          setIsM(false);
        }}
      />
      <LoginWrap>
        <Headers          
        onClick={() => {
          setIsM(false);
          }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L20 20" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
        <path d="M20 4L4 20" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
        </Headers>
        <Contents>
          <HelloText>
            반갑습니다 <br /> 오늘도 즐거운 만남을 위해 잘 오셨어요
          </HelloText>
          <div style={{position:"relative"}}>          
            <EmailIcon fill="#8A8BA3" width="32px" height="32px" style={{position:"absolute", left:"12", top:"8"}}/>
            <Input
            label=""
            placeholder="이메일을 입력해주세요."
            onChange={(e) => {
              setOrigin(e.target.value);
            }}
            value={origin}
          />
        </div>
        <div style={{position:"relative"}}>
          <Lock fill="#8A8BA3" width="32px" height="32px" style={{position:"absolute", left:"12", top:"8"}}/>
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


          <LoginButton onClick={LoginModal}>로그인</LoginButton>
          <LineWrap>
            <Line />
            <div>또는</div>
          </LineWrap>
          <LoginButtonWrap>
            <div style={{position:"relative"}}>
              <UserNickIcon fill="#DFE310" width="32px" height="32px" style={{position:"absolute", left:"12", top:"8"}}/>
              <SocalLoginBtn
                onClick={() => {
                  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${redirectURI}&response_type=code`;
                  // console.log(process.env.REACT_APP_KAKAO_REST_API_KEY)
                }}
              > 
                카카오로 로그인
              </SocalLoginBtn>
            </div>
            <div style={{position:"relative"}}>
              <UserNickIcon fill="#4DEF5D" width="32px" height="32px" style={{position:"absolute", left:"12", top:"8"}}/>
              <SocalLoginBtn>네이버로 로그인</SocalLoginBtn>
            </div>
          </LoginButtonWrap>
          <SignupWrap>
            <div>
              아직회원이 아니신가요?
              <a
                onClick={() => {
                  setIsSignup(true);
                  setIsM(false);
                }}
              >
                회원가입
              </a>
            </div>
          </SignupWrap>
        </Contents>
      </LoginWrap>
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
const LoginWrap = styled.div`
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
  color: #575765;
`;
const Input = styled.input`
  border: 1px solid #8a8ba3;
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  padding: 12px 12px 12px 50px;
  border-radius: 4px;
`;

const LoginButton = styled.button`
  display: block;
  background-color: #7179f0;
  margin: 24px auto;
  border: none;
  height: 51px;
  padding: 12px 151px 12px 151px;
  border-radius: 4px;
  color: #fafaff;
  font-size: 18px;
`;
const LoginButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  margin: 13px auto 0px auto;
`;
const SocalLoginBtn = styled.button`
  width: 173px;
  border: 1px solid #e4e2eb;
  padding: 12px 15px 12px 40px;
  color: #8a8ba3;
  background-color: white;
  margin: 0px 8px 0px 8px;
  font-size: 16px;
`;
const LineWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 14px;
  div {
    background-color: #fafafa;
    padding: 0px 5px;
    color: #c7c8db;
    z-index: 3;
  }
`;
const Line = styled.hr`
  width: 300px;
  border: 0.7px solid #c7c8db;
  padding: 0px;
  position: absolute;
`;

//회원가입 문장쪽
const SignupWrap = styled.div`
  width: 228px;
  height: 37px;
  margin: 40px auto 8px auto;
  div {
    color: #8a8ba3;
    font-size: 14px;
  }
  a {
    padding-left: 21px;
    text-decoration: underline;
    color: #58596a;
    cursor: pointer;
  }
`;

export default LoginModal;
