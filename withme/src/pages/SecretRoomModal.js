import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";

const SecretRoomModal = ({ setSRoomM }) => {
  console.log(setSRoomM)
  const dispatch = useDispatch();

  const [pwd, setPwd] = useState('');

  return (
    <>
    <ModalBackground
      onClick={() => {
        setSRoomM(false);
      }}
    />
    <LoginWrap>
      <Headers>
        <AiOutlineClose
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSRoomM(false);
          }}
        />
      </Headers>
      <Contents>
        <HelloText>'헤진이랑 한바탕 놀아봐요' 방은 비공개 방입니다 <br/> 입장하시려면 비밀번호를 입력해주세요</HelloText>
              <Input
                label=""
                placeholder="비밀번호를 입력해주세요."
                type="password"
                _onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
              />
        <LoginButton>입장</LoginButton>
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
  height: 393px;
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
const LoginButton = styled.button`
display: block;
background-color: #7179F0;
margin: 24px auto;
border: none;
height: 51px;
width: 300px;
border-radius: 4px;
color: #FAFAFF;
font-size: 18px;
`

export default SecretRoomModal;
