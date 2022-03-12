import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from "react-icons/ai";

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';


const SignupModal = ({ setIsSignup }) => {
  const dispatch = useDispatch();

  const [origin, setOrigin] = React.useState('');
  const [nickname, setNickName] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd_check, setPwdCheck] = React.useState('');

  const Signup = () => {

    if (nickname.length > 8 || nickname.length < 2) {
      window.alert("닉네임은 영문, 숫자 또는 한글로 이루어진 2~8자를 사용하세요")
    }

    if (pwd.length > 16 || pwd.length < 8) {
      window.alert("비밀번호는 영문(필수), 숫자(필수), 특수문자(자유)로 이루어진 8~16자를 사용하세요")
    }

    dispatch(userActions.signUpDB(origin, nickname, pwd, pwd_check));
  };

  return (
    <>
    <ModalBackground
      onClick={() => {
        setIsSignup(false)
      }}
    />
    <LoginWrap>
      <Headers>
        <AiOutlineClose
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsSignup(false)
          }}
        />
      </Headers>
      <Contents>
        <HelloText>환영합니다 <br/> 저희와 재미있는 만남을 만들어봐요!</HelloText>
              <Input
                label=""
                placeholder="이메일을 입력해주세요."
                onChange={(e) => {
                  setOrigin(e.target.value);
                }}
                value={origin}
              />
              <div style={{display:"flex"}}>
              <Input
                label=""
                placeholder="닉네임을 입력해주세요"
                onChange={(e) => {
                  setNickName(e.target.value);
                }}
                value={nickname}
              />
              <Btn>중복확인</Btn>
              </div>
              <Input
                label=""
                placeholder="비밀번호를 입력해주세요."
                type="password"
                _onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
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
        <div style={{display:"flex"}}>
        <LoginButton onClick={Signup}>회원가입</LoginButton>
        <LoginButton onClick={()=>{dispatch(userActions.NotMemberloginDB())}} >비회원으로 즐기기</LoginButton>
        </div>
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
`
//모달창 전체 
const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 26px;
  position: absolute;
  width: 540px;
  height: 595px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FAFAFA;
  z-index: 100;
`
//모달창 헤더
const Headers = styled.div`
  position: fixed;
  right: 26px;
`
//모달창 안에 내용 감싸기
const Contents = styled.div`
width: 100%;
`

const HelloText = styled.div`
  align-self: stretch;
  margin-top: 50px;
  margin-bottom: 32px;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
  align-items: center;
  color: #33344B;
`
const Input = styled.input`
border: 1px solid #8A8BA3;
width: 100%;
height: 48px;
margin-bottom: 16px;
padding: 12px 12px 12px 50px;
border-radius: 4px;
`
const Btn = styled.button`
width: 120px;
height: 48px;
font-size: 16px;
background-color:#BCC0FF ;
color: #FAFAFF;
border: none;
border-radius: 4px;
margin:  0px 0px 0px 16px;
padding: 12px 14px;
`

const LoginButton = styled.button`
display: block;
background-color: #7179F0;
margin: 24px auto;
border: none;
height: 51px;
width: 200px;
border-radius: 4px;
color: #FAFAFF;
font-size: 18px;
`
export default SignupModal;