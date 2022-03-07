import React from 'react';
import styled from 'styled-components';
import { Grid, Input } from '../elements/Index';

// redux import
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

const LoginModal = ({ setIsM }) => {
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
       {/* 모달창 뒷배경이 회색일 때 */}
        {/* <ModalBackground
          onClick={() => {
            setIsM(false);
          }}
        /> */}
        <LoginWrap>
          <Contents>
            <HelloText>반갑습니다 - ! <br/> 오늘도 즐거운 만남을 위해 잘 오셨어요</HelloText>

            <LoginInfo>
              <Inputs>
                <OriginInput>
                  <Input
                    label=""
                    placeholder="이메일을 입력해주세요."
                    _onChange={(e) => {
                      setOrigin(e.target.value);
                    }}
                    value={origin}
                  />
                </OriginInput>

                <PwdInput>
                  <Input
                    label=""
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    _onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    value={pwd}
                  />
                </PwdInput>
              </Inputs>

              <KakaoLogin
                onClick={() => {
                  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${redirectURI}&response_type=code`;
                }}
              >
                카카오 로그인
              </KakaoLogin>

              <GoSignUp
                onClick={() => {
                  history.push('/signup');
                }}
              >
                회원가입 하기
              </GoSignUp>
            </LoginInfo>

            <Buttons>
              <CancleButton onClick={() => {setIsM(false)}}>취소하기</CancleButton>
              <LoginButton onClick={LoginModal}>로그인하기</LoginButton>
            </Buttons>
          </Contents>
        </LoginWrap>
      </>
    );
  };

// 모달창 뒷배경이 회색일 때
// const ModalBackground = styled.div`
//   top: 0;
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   z-index: 99;
//   background-color: rgba(0, 0, 0, 0.5);
// `;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 18px;
  position: absolute;
  width: 540px;
  height: 567px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #868686;
  z-index: 100;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 10px 0px;
`;

const HelloText = styled.div`
  padding: 8px;
  height: 72px;
  align-self: stretch;
`;

const LoginInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 40px;
  height: 348px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 504px;
  height: 176px;
`;

const OriginInput = styled.div`
  padding: 8px;
  height: 50px;
  margin: 8px 0px;
`;

const PwdInput = styled.div`
  padding: 8px;
  margin: 8px 0px;
`;

const KakaoLogin = styled.button`
  width: 382px;
  height: 50px;
  background: #f9e000;
  border-radius: 4px;
  margin: 4px 10px;
`;

const GoSignUp = styled.button`
  width: 382px;
  height: 50px;
  background: #b6ccfe;
  border-radius: 4px;
  margin: 4px 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 8px;
  height: 67px;
`;

const CancleButton = styled.button`
  width: 98px;
  height: 50px;
  background: #FFFFFF;
  border-radius: 4px;
  margin: 0px 20px;
`;

const LoginButton = styled.button`
  width: 116px;
  height: 50px;
  background: #cbb2fe;
  border-radius: 4px;
`;

export default LoginModal;