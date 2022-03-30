import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// redux import
import { actionCreators as userActions } from "../../redux/modules/user";

//svg
import { ReactComponent as EmailIcon } from "../../assets/modals/emailIcon.svg";
import { ReactComponent as Lock } from "../../assets/modals/lockIcon.svg";

const LoginModal = ({ setIsM, setIsSignup }) => {
  const dispatch = useDispatch();

  const redirectURI = "https://nemowithme.com/api/auth/kakao/callback";
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
            반갑습니다 <br /> 오늘도 즐거운 만남을 위해 잘 오셨어요
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
          <div style={{ position: "relative" }}>
            <Lock
              fill="#8A8BA3"
              width="32px"
              height="32px"
              style={{ position: "absolute", margin: "8px 12px" }}
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
          <LoginButton onClick={LoginModal}>로그인</LoginButton>
          <LineWrap>
            <Line />
            <div>또는</div>
          </LineWrap>
          <LoginButtonWrap>
            <KaKaoLoginBtn
              className="kakao"
              onClick={() => {
                window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${redirectURI}&response_type=code`;
              }}
            >
              <svg width="26" height="26" viewBox="0 0 26 23" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 3.25C6.99238 3.25 2.16663 6.99718 2.16663 11.5825C2.3636 14.7381 4.33329 17.4498 7.18935 18.6332L6.15526 22.3803C6.10602 22.4789 6.15526 22.6269 6.25375 22.6757C6.35223 22.7748 6.5492 22.7748 6.64769 22.6757L11.0303 19.7672C11.6704 19.8658 12.3106 19.9151 13 19.9151C18.9583 19.9151 23.8333 16.1679 23.8333 11.5825C23.8333 6.99718 19.0075 3.25 13 3.25"
                  fill="black"
                  fillOpacity="0.9"
                ></path>
              </svg>
              카카오 로그인
            </KaKaoLoginBtn>
            <NaverLoginBtn>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.9498 4.05005H4.0498V27.9501H27.9498V4.05005Z"
                  fill="none"
                />
                <path
                  d="M14.0898 15.94V21.52H10.0098V10.48H14.0898L17.9698 16V10.48H21.9898V21.52H17.9098L14.0898 15.94Z"
                  fill="white"
                />
              </svg>
              네이버로 로그인
            </NaverLoginBtn>
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

const LoginButton = styled.button`
  display: block;
  background-color: #7179f0;
  margin: 24px auto;
  border: none;
  height: 51px;
  padding: 12px 155px;
  border-radius: 4px;
  color: #fafaff;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s;
  &:hover {
    background-color: #bcc0ff;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
    padding: 0;
    width: 100%;
  }
`;
const LoginButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  margin: 13px auto 0px auto;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const KaKaoLoginBtn = styled.button`
  position: relative;
  width: 173px;
  border: none;
  padding: 12px 15px;
  color: #191919;
  background-color: #fee500;
  margin: 0px 8px 0px 8px;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 767px) {
    padding: 10px 15px;
    width: 130px;
    font-size: 12px;
  }
`;

const NaverLoginBtn = styled.button`
  position: relative;
  width: 173px;
  border: none;
  padding: 9px 15px;
  color: #fff;
  background-color: #03c75a;
  margin: 0px 8px 0px 8px;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 767px) {
    padding: 7px 5px;
    width: 130px;
    font-size: 12px;
  }
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
  width: 250px;
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
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
  a {
    padding-left: 21px;
    text-decoration: underline;
    color: #58596a;
    cursor: pointer;
  }
`;

export default LoginModal;
