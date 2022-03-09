import React from 'react';
import { Input, Grid } from '../elements/Index';
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

  const SignupModal = () => {

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
            setIsSignup(false);
          }}
        />
      <SignupWrap>
        <Headers>
          <AiOutlineClose
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsSignup(false);
            }}
          />
        </Headers>
        <Contents>
          <SignInText>환영합니다 - ! <br/> 회원가입 하고 ㅁwith me와 함께해요</SignInText>

        <Inputs>
        <OriginInput>
          <Input
            label=""
            placeholder="이메일을 입력해주세요"
            value={origin}
            _onChange={(e) => {
              setOrigin(e.target.value);
            }}
          />
        </OriginInput>

        <NicknameInput>
          <Input
            label=""
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            _onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
        </NicknameInput>

        <PwdInput>
          <Input
            label=""
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={pwd}
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </PwdInput>

        <PwdCheckInput>
          <Input
            label=""
            placeholder="비밀번호를 재입력 해주세요"
            value={pwd_check}
            type="password"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </PwdCheckInput>
        </Inputs>

        <Buttons>
          <SuccessSignUp onClick={SignupModal}>회원가입하기</SuccessSignUp>
        </Buttons>
        </Contents>
      </SignupWrap>
    </>
  );
};

// 모달창 뒷배경이 회색일 때
const ModalBackground = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 18px;
  box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px;
  position: absolute;
  width: 540px;
  height: 527px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFF;
  z-index: 100;
`;

const Headers = styled.div`
  margin: -7px 0px;
  padding: 0px 95%;
  color: rgb(34, 34, 34);
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 10px 0px;
`;

const SignInText = styled.div`
  padding: 8px;
  height: 44px;
  align-self: stretch;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 504px;
  height: 336px;
`;

const OriginInput = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background: #FFFFFF;
  border-radius: 4px;
  margin: 10px 0px;
`;

const NicknameInput = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background: #FFFFFF;
  border-radius: 4px;
  margin: 10px 0px;
`;

const PwdInput = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background: #FFFFFF;
  border-radius: 4px;
  margin: 10px 0px;
`;

const PwdCheckInput = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background: #FFFFFF;
  border-radius: 4px;
  margin: 10px 0px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 8px;
  width: 269px;
  height: 67px;
`;

const SuccessSignUp = styled.button`
  width: 118px;
  height: 42px;
  background: #cbb2fe;
  border-radius: 4px;
`;

export default SignupModal;