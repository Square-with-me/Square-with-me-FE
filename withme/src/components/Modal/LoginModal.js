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
        <path d="M4 4L20 20" stroke="#33344B" strokeWidth="2" strokeMiterlimit="10"/>
        <path d="M20 4L4 20" stroke="#33344B" strokeWidth="2" strokeMiterlimit="10"/>
        </svg>
        </Headers>
        <Contents>
          <HelloText>
            반갑습니다 <br /> 오늘도 즐거운 만남을 위해 잘 오셨어요
          </HelloText>
          <div style={{position:"relative"}}>       
            <EmailIcon fill="#8A8BA3" width="32px" height="32px" style={{position:"absolute",margin: '8px 12px'}}/>
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
          <Lock fill="#8A8BA3" width="32px" height="32px" style={{position:"absolute",margin: '8px 12px'}}/>
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
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute",margin: '8px 12px'}}>
                  <path d="M27.9498 4.05005H4.0498V27.9501H27.9498V4.05005Z" fill="#F0DB24"/>
                  <path d="M15.9302 7.76001C10.8302 7.76001 6.7002 11.02 6.7002 15.05C6.7002 17.67 8.4502 19.97 11.0802 21.26C10.8902 21.98 10.3802 23.87 10.2802 24.26C10.1802 24.65 10.4602 24.76 10.6702 24.62L14.2202 22.21C14.7863 22.2946 15.3578 22.338 15.9302 22.34C21.0302 22.34 25.1602 19.07 25.1602 15.04C25.1602 11.01 21.0002 7.76001 15.9302 7.76001Z" fill="#381B1A"/>
                  <path d="M12.2201 12.8999H9.52006C9.39886 12.9025 9.28333 12.9517 9.19761 13.0375C9.11189 13.1232 9.06261 13.2387 9.06006 13.3599C9.06006 13.4203 9.07196 13.4801 9.09507 13.5359C9.11819 13.5917 9.15207 13.6425 9.19479 13.6852C9.2375 13.7279 9.28821 13.7618 9.34402 13.7849C9.39983 13.808 9.45965 13.8199 9.52006 13.8199H10.4001V17.0499C10.3978 17.1094 10.4082 17.1687 10.4306 17.2239C10.4531 17.2791 10.4869 17.3288 10.5301 17.3699C10.6133 17.4508 10.724 17.4972 10.8401 17.4999H10.9401C11.0592 17.4978 11.1732 17.4514 11.2601 17.3699C11.3433 17.2842 11.3899 17.1694 11.3901 17.0499V13.8199H12.2201C12.3421 13.8199 12.4591 13.7714 12.5453 13.6852C12.6316 13.5989 12.6801 13.4819 12.6801 13.3599C12.6775 13.2387 12.6282 13.1232 12.5425 13.0375C12.4568 12.9517 12.3413 12.9025 12.2201 12.8999Z" fill="#F0DB24"/>
                  <path d="M18.6999 16.6401H17.4499V13.3401C17.4499 13.2075 17.3973 13.0803 17.3035 12.9865C17.2097 12.8928 17.0825 12.8401 16.9499 12.8401C16.8173 12.8401 16.6901 12.8928 16.5964 12.9865C16.5026 13.0803 16.4499 13.2075 16.4499 13.3401V16.9001C16.4451 16.9232 16.4451 16.947 16.4499 16.9701C16.4456 16.9966 16.4456 17.0236 16.4499 17.0501C16.4499 17.1615 16.4942 17.2683 16.5729 17.3471C16.6517 17.4258 16.7585 17.4701 16.8699 17.4701H18.6999C18.8113 17.4701 18.9181 17.4258 18.9969 17.3471C19.0757 17.2683 19.1199 17.1615 19.1199 17.0501C19.1199 16.9954 19.109 16.9412 19.0878 16.8908C19.0666 16.8404 19.0355 16.7948 18.9963 16.7566C18.9572 16.7184 18.9108 16.6884 18.8599 16.6684C18.809 16.6484 18.7546 16.6388 18.6999 16.6401Z" fill="#F0DB24"/>
                  <path d="M22.7101 16.7901L21.3101 15.0001L22.5801 13.7401C22.6267 13.7008 22.6647 13.6523 22.6915 13.5976C22.7184 13.5429 22.7336 13.4832 22.7362 13.4224C22.7388 13.3615 22.7287 13.3007 22.7066 13.2439C22.6845 13.1872 22.6508 13.1356 22.6077 13.0925C22.5646 13.0494 22.5131 13.0157 22.4563 12.9936C22.3995 12.9715 22.3388 12.9614 22.2779 12.964C22.217 12.9666 22.1573 12.9818 22.1026 13.0087C22.0479 13.0356 21.9994 13.0735 21.9601 13.1201L20.3901 14.6801V13.3401C20.3901 13.2075 20.3375 13.0803 20.2437 12.9865C20.1499 12.8928 20.0227 12.8401 19.8901 12.8401C19.7575 12.8401 19.6304 12.8928 19.5366 12.9865C19.4428 13.0803 19.3901 13.2075 19.3901 13.3401V17.0001C19.3901 17.1327 19.4428 17.2599 19.5366 17.3536C19.6304 17.4474 19.7575 17.5001 19.8901 17.5001C20.0227 17.5001 20.1499 17.4474 20.2437 17.3536C20.3375 17.2599 20.3901 17.1327 20.3901 17.0001V15.8701L20.6801 15.5901L22.0001 17.3201C22.0704 17.4142 22.1752 17.4766 22.2915 17.4935C22.4078 17.5104 22.526 17.4804 22.6201 17.4101C22.7143 17.3398 22.7767 17.235 22.7935 17.1187C22.8104 17.0025 22.7804 16.8842 22.7101 16.7901Z" fill="#F0DB24"/>
                  <path d="M16.08 16.9101L14.73 13.2301C14.6761 13.1095 14.5872 13.0079 14.4749 12.9383C14.3626 12.8688 14.232 12.8346 14.1 12.8401C13.9553 12.8302 13.8115 12.8706 13.6931 12.9544C13.5747 13.0382 13.4888 13.1603 13.45 13.3001V13.3601L12.1 16.9101C12.081 16.9652 12.073 17.0236 12.0765 17.0819C12.08 17.1401 12.095 17.1971 12.1205 17.2495C12.146 17.302 12.1816 17.3489 12.2253 17.3876C12.269 17.4263 12.3199 17.456 12.375 17.4751C12.4302 17.4941 12.4885 17.5021 12.5468 17.4986C12.605 17.4951 12.662 17.4801 12.7145 17.4546C12.7669 17.4291 12.8138 17.3934 12.8525 17.3498C12.8912 17.3061 12.921 17.2552 12.94 17.2001L13.17 16.5501H15L15.23 17.2001C15.248 17.2566 15.2772 17.3089 15.3159 17.3539C15.3547 17.3988 15.4021 17.4355 15.4553 17.4616C15.5086 17.4878 15.5665 17.5029 15.6258 17.5061C15.685 17.5092 15.7443 17.5004 15.8 17.4801C15.9126 17.4414 16.0052 17.3597 16.0577 17.2529C16.1102 17.1461 16.1182 17.0228 16.08 16.9101ZM13.46 15.7201L14.08 14.0001L14.7 15.7601L13.46 15.7201Z" fill="#F0DB24"/>
                </svg>
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
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute",margin: '8px 12px'}}>
              <path d="M27.9498 4.05005H4.0498V27.9501H27.9498V4.05005Z" fill="#3DAF43"/>
              <path d="M14.0898 15.94V21.52H10.0098V10.48H14.0898L17.9698 16V10.48H21.9898V21.52H17.9098L14.0898 15.94Z" fill="white"/>
            </svg>
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
  font-weight: 600;
  line-height: 28px;
  align-items: center;
  color: #4a4a58;
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
  font-weight: 600;
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
  font-weight: 600;
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
  width: fit-content;
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
