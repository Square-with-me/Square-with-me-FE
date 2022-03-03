import React from 'react';
import styled from 'styled-components';
import { Grid, Input } from '../elements/Index';

// redux import
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { history } from '../redux/configureStore';

const LoginModal = (props) => {
  const dispatch = useDispatch();

  const redirectURI = "http://localhost:3000/api/auth/kakao/callback";
  const KAKAO_REST_API_KEY = "b60b1caa32fdc7c0aa62e43ce7f29c2d";

  const [origin, setOrigin] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const LoginModal = () => {
    dispatch(userActions.logInDB(origin, pwd));
  };
    return (
      <>
        <LoginWrap>
          <LogInText>ㅁ with me 로그인</LogInText>

          <Grid padding="0px 10%" margin="30px 0px 15px 0px" height="13%">
            <Input
              width="100%"
              borderRadius="5px"
              bg="#fff"
              label="아이디"
              placeholder="아이디를 입력해주세요."
              _onChange={(e) => {
                setOrigin(e.target.value);
              }}
              value={origin}
            />
          </Grid>

          <Grid padding="0px 10%" margin="10px 0px 10px 0px" height="13%">
            <Input
              width="100%"
              borderRadius="5px"
              bg="#fff"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
            />
          </Grid>

          <Grid padding="0px 10%" margin="10px 0px 0px 0px" height="13%">
            <LoginButton onClick={LoginModal}>로그인 하기</LoginButton>
          </Grid>

          <Grid>
            <KakaoLogin
              onClick={() => {
                window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${redirectURI}&response_type=code`;
              }}
            >
              카카오 로그인
            </KakaoLogin>
          </Grid>

          <Grid>
            <GoSignUp
              onClick={() => {
                history.push('/signup');
              }}
            >
              아직 회원이 아니라면? 회원가입 하기
            </GoSignUp>
          </Grid>
          
            <NonMemderLogin>비회원으로 즐기기</NonMemderLogin>
        </LoginWrap>
      </>
    );
  };

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: auto;
  margin-top: 65px;
  width: 600px;
  height: 700px;
  border-radius: 5px;
  border: 1px solid #adb5bd;
  @media (min-width: 450px) {
    padding: 48px 40px 36px 40px;
    flex-grow: 1;
    overflow: hidden;
  }
`;

const LogInText = styled.div`
  font-size: 24px;
  margin: 30px 0px;
`;

const LoginButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #9474cc;
  color: black;
  cursor: pointer;
  font-size: 16px;
  margin: 0px 150px;
  padding: 10px 11px;
`;

const KakaoLogin = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #ffea00;
  color: black;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 195px;
  padding: 10px 11px;
`;

const GoSignUp = styled.button`
  border: none;
  background-color: #fff;
  color: black;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 115px;
`;

const NonMemderLogin = styled.button`
  border: none;
  background-color: #fff;
  color: black;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 80px;
`;

export default LoginModal;