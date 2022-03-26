import React, { useEffect, useState } from "react";
import axios from "axios";

const Kakao = () => {
  let authorization_code = new URL(window.location.href).searchParams.get("code");
  console.log("리디렉트해서 받은 코드", authorization_code);

  const kakaoLogin = async (authorization_code) => {
    // console.log('함수 호출 됨');
    // console.log('code 잘 넘어왔냐?', authorization_code);
    await axios.get(`api/auth/kakao/callback?code=${authorization_code}`)
      .then((response) => {
        // const token = response.data.data.token;
        // const user = response.data.data.user;

        //redux 저장
        //메인 페이지로 이동
      })
      .catch((error) => {
        console.log("카카오 로그인실패", error);
      });
  };

  useEffect(() => {
    kakaoLogin(authorization_code);
  }, []);

  //카카오 로그인 콜백 페이지 대신에 흰배경이나 검은 배경 or 로딩중
  return (
    <div>
      <h3>카카오 로그인 콜백 페이지</h3>
    </div>
  );
}

export default Kakao;