import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri"

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import { useCallback } from "react";
import { useRef } from "react";
import Tag from "../components/Tag";
import '../styles/Drop.css';

const MakeRoomModal = ({ setMRooms }) => {
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState("");
  const [pwd, setPwd] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const [tagItem, setTagItem] = useState('')
  const [tagList, setTagList] = useState([])

  const onKeyPress = e => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      submitTagItem()
    }
  }

  const submitTagItem = () => {
    let updatedTagList = [...tagList]
    updatedTagList.push(tagItem)
    setTagList(updatedTagList)
    setTagItem('')
  }

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText
    const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem)
    setTagList(filteredTagList)
  }

  return (
    <React.Fragment>
      <ModalBackground
        onClick={() => {
          setMRooms(false);
        }}
      />
      <LoginWrap>
        <Headers>
          <AiOutlineClose
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMRooms(false);
            }}
          />
        </Headers>
        <Contents>
          <HelloText>장혜진님 <br/> 새로운 친구를 만나러 가볼까요?</HelloText>
          <Category>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option>카테고리</option>
              <option value="1">뷰티</option>
              <option value="2">운동</option>
              <option value="3">스터디</option>
              <option value="4">상담</option>
              <option value="5">문화</option>
              <option value="6">기타</option>
            </select>

            <select onChange={(e) => setSecret(e.target.value)}>
              <option value={"open"}>공개방</option>
              <option value={"close"}>비밀방</option>
            </select>
          </Category>

          <div >
            {secret === "close" ? (
              <Input
                placeholder="방 비밀번호"
                onChange={(e) => setPwd(e.target.value)}
                type="password"
                minLength="4"
                maxLength="10"
              />
            ) : null}
          </div>
          <div>
            <Input
              placeholder="방정보를 입력해주세요"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <TagInput
              type='text'
              placeholder='태그를 입력해주세요'
              tabIndex={2}
              onChange={e => setTagItem(e.target.value)}
              value={tagItem}
              onKeyPress={onKeyPress}/>
            <TagItemWrap>
            {tagList.map((tagItem, index) => {
              return (
                <TagItem key={index}>
                <p># {tagItem}</p>
                <Button onClick={deleteTagItem}>X</Button>
                </TagItem>
              )
            })}
            </TagItemWrap>
          </div>

          <div>
          <Btn
            onClick={() =>
              dispatch(
                roomActions.addRoomDB(title, secret, pwd, category, tagList ))
              }>
            방 만들기
          </Btn>
          </div>

        </Contents>
      </LoginWrap>
    </React.Fragment>
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
  height: 100%;
  max-height: 547px;
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
//방설정
const Category = styled.div`
  /* display: flex;
  flex-direction: row;
  width: 148px;
  height: 40px;
  border-radius: 4px; */
  /* background-color: aliceblue; */
  margin: 0px 10px 16px 0px;
  select{
    width: 148px;
    height: 40px;
    border: 1px solid #8A8BA3;
    border-radius: 4px;
    & :focus{
      border: 1px solid #7179F0 ;
    }
  }
  select > option {
    width: 100%;
    background-color: blue;
  }
`;

//태그들
const TagItemWrap = styled.div`
display: flex;

`
const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background-color: #E3E5FF;
  border-radius: 4px;
  color: #33344B;
  font-size: 12px;
  width:20%;
  margin-right: 10px;
`
const Button = styled.button`
background-color: transparent;
border: none;
`
const TagInput = styled.input`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background: #FFFFFF;
  border-radius: 4px;
  margin-bottom: 16px;
  border: 1px solid #8A8BA3;
  padding: 12px 12px 12px 50px;
  &:focus-within {
    border: none;
    outline: 1px solid #7179F0;
  }
`

//element
const Btn = styled.button`
width: 120px;
height: 48px;
font-size: 16px;
background-color:#7179F0 ;
color: #FAFAFF;
border: none;
border-radius: 4px;
margin:  0px 0px 0px 16px;
padding: 12px 14px;
position: fixed;
right: 26px;
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
&:focus{
  border: none;
  outline: 1px solid #7179F0;
}
`

export default MakeRoomModal;
