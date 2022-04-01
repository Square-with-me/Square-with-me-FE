import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import styled from "styled-components";

const Kakao = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let authorization_code = new URL(window.location.href).searchParams.get(
      'code'
    );

    //async/await는 스스로 에러를 잡지 못하기 때문에 try catch랑 써야 함!!
    //async/await를 안쓰면 then catch 도 사용 가능 근데 취향 차이
    async function kakaoLogin(auth_code) {
      try {
        const res = await axios.get(
          `/api/auth/kakao/callback?code=${auth_code}`
        );
        const { token, user } = res.data.data;
        localStorage.setItem('login-token', token);
        dispatch(userActions.setUser({ user }));
      } catch (error) {
        alert(error.response.data.msg);
      }
      window.location.replace('/main');
    }
    kakaoLogin(authorization_code);
  }, []);
  return (
    <Div>
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Div>
  );
};
const Div = styled.div`
  .spinner {
    display: block;
    position: fixed;
    top: 50%;
    right: 50%;
    span{
      font-size: 50px;
    }   
  }
`
export default Kakao;
