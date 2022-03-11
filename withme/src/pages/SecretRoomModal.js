import React, { useState } from "react";
import { Input, Grid } from '../elements/Index';
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";

const SecretRoomModal = ({ setSRoomM }) => {
  const dispatch = useDispatch();

  const [pwd, setPwd] = useState('');

  return (
    <>
      <ModalBackground
        onClick={() => {
          setSRoomM(false);
        }}
      />
      <SRoomWrap>
        <Headers>
          <AiOutlineClose
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSRoomM(false);
            }}
          />
        </Headers>
        <Contents>
          <Notice>'헤진이랑 한바탕 놀아봐요' 방은 비공개 방입니다 <br/> 입장하시려면 비밀번호를 입력해주세요</Notice>

          <PwdInput>
              <Input
                label=""
                placeholder="비밀번호를 입력해주세요."
                type="password"
                _onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
                minLength="4"
                maxLength="10"
              />
          </PwdInput>

            <SRoomPwd
              onClick={() =>
                dispatch(
                roomActions.addRoomDB(pwd))
              }>
              입장하기
            </SRoomPwd>
        </Contents>
      </SRoomWrap>
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
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SRoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 18px;
  position: absolute;
  width: 555px;
  height: 345px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFF;
  z-index: 100;
`;

const Headers = styled.div`
  margin: 0px 0px;
  padding: 0px 95%;
  color: rgb(34, 34, 34);
`;

const Contents = styled.div`
  margin: 20px 8px;
  color: black;
`;

const Notice = styled.div`
  display: flex;
  padding: 8px;
  height: 72px;
  font-color: black;
  font-size: 16px;
  display: flex;
`;

const PwdInput = styled.div`
  padding: 8px;
  margin: 0px 0px -38px 0px;
`;

const SRoomPwd = styled.button`
  width: 118px;
  height: 42px;
  margin: 65px 75%;
  background: #cbb2fe;
  border-radius: 4px;
`;

export default SecretRoomModal;
