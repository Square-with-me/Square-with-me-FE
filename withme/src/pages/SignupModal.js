import React from 'react';
import { Input, Grid } from '../elements/Index';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';


const SignupModal = () => {
  const dispatch = useDispatch();

  // const originCheck  = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  // const nickCheck = /^[0-9a-zA-Zㄱ-ㅎ가-힣ㅏ-ㅣ]{2,8}$/;
  // const pwdCheck = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,16}$/;

  const [origin, setOrigin] = React.useState('');
  const [nickname, setNickName] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd_check, setPwdCheck] = React.useState('');

  const SignupModal = () => {
    if (nickname.length > 8 || nickname.length < 2) {
      window.alert("닉네임의 길이가 맞지않습니다.")
    }
    dispatch(userActions.signUpDB(origin, nickname, pwd, pwd_check));
  };

  return (
    <>
      <SignupWrap>
        <SignInText>ㅁ with me 회원가입</SignInText>

        <Grid padding="0px 10%" margin="10px 0px 15px 0px" height="13%">
          <Input
            width="100%"
            borderRadius="5px"
            bg="#fff"
            label="아이디"
            placeholder="아이디"
            value={origin}
            _onChange={(e) => {
              setOrigin(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="0px 10%" margin="10px 0px 15px 0px" height="13%">
          <Input
            width="100%"
            borderRadius="5px"
            bg="#fff"
            label="닉네임"
            placeholder="닉네임"
            value={nickname}
            _onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="0px 10%" margin="10px 0px 15px 0px" height="13%">
          <Input
            width="100%"
            borderRadius="5px"
            bg="#fff"
            label="비밀번호"
            placeholder="비밀번호"
            type="password"
            value={pwd}
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="0px 10%" margin="10px 0px 15px 0px" height="13%">
          <Input
            width="100%"
            borderRadius="5px"
            bg="#fff"
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            value={pwd_check}
            type="password"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="0px 10%" margin="10px 0px 0px 0px" height="13%">
          <SuccessSignUp onClick={SignupModal}>회원가입하기</SuccessSignUp>
        </Grid>

        <Grid padding="0px 10%" margin="10px 0px 0px 0px" height="13%">
          <GoLogin
            onClick={() => {
              history.push('/login');
            }}
          >
            계정이 있으신가요? 로그인
          </GoLogin>
        </Grid>

      </SignupWrap>
    </>
  );
};

const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: auto;
  margin-top: 45px;
  width: 600px;
  height: 730px;
  border-radius: 5px;
  border: 1px solid #adb5bd;
  @media (min-width: 601px) {
    padding: 48px 40px 36px 40px;
    flex-grow: 1;
    overflow: hidden;
  }
`;

const SignInText = styled.div`
  font-size: 24px;
  margin: auto;
`;

const SuccessSignUp = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #9474cc;
  color: black;
  cursor: pointer;
  font-size: 16px;
  margin: 0px 145px;
  padding: 10px 11px;
`;

const GoLogin = styled.button`
  border: none;
  background-color: #fff;
  color: black;
  cursor: pointer;
  font-size: 16px;
  margin: 0px 100px;
`;

export default SignupModal;