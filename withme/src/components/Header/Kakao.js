import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../../redux/modules/user';
// import Spinner from "react-bootstrap/Spinner"
import styled from 'styled-components';

const Kakao = () => {
  const dispatch = useDispatch();
  let authorization_code = new URL(window.location.href).searchParams.get(
    'code'
  );
  console.log('리디렉트해서 받은 코드', authorization_code);

  const kakaoLogin = async (authorization_code) => {
    await axios
      .get(`/api/auth/kakao/callback?code=${authorization_code}`)
      .then((res) => {
        localStorage.setItem('login-token', res.data.data.token);
        const user = res.data.data.user;
        dispatch(userActions.setUser({ user }));
        window.location.reload('/main');
        // const token = response.data.data.token;
        // const user = response.data.data.user;
        // console.log("response 받음");
        // console.log('유저', response.data);
      })
      .catch((error) => {
        console.log('카카오 로그인실패', error);
      });
  };

  useEffect(() => {
    kakaoLogin(authorization_code);
  }, []);

  return (
    <div>
      {/* <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
    </div>
  );
};
export default Kakao;
