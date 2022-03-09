import React, { useState } from "react";
import { Input, Grid } from '../elements/Index';
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import { useCallback } from "react";
import { useRef } from "react";
import Tag from "../components/Tag";

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
      <MRoomWrap>
        <Headers>
          <AiOutlineClose
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMRooms(false);
            }}
          />
        </Headers>
        <Contents>
          <HelloText>rla지현님 <br/> 새로운 친구를 만나러 가볼까요?</HelloText>
          <Settings>
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
          </Category>

          <div>
            {category === "1" ? <p>패션, 헤어, 성형</p> : null}
            {category === "2" ? <p>다이어트, 스포츠, 운동</p> : null}
            {category === "3" ? (<p>독서, 공부, 시사, 토론, 과학, IT/컴퓨터</p>) : null}
            {category === "4" ? (<p>취업, 아르바이트, 진로, 금융, 연애, 인테리어, 법률,의료,사주/타로{" "}</p>) : null}
            {category === "5" ? (<p>마음챙김/명상, 정보, 수면, 요리, 반려동물, 게임,여행,공포/미스터리</p>) : null}
            {category === "6" ? (<p>손재주, 예술, 댄스/노래, 영화/드라마, 덕질</p>) : null}
          </div>

          <RoomSetting>
            <select onChange={(e) => setSecret(e.target.value)}>
              <option value={"open"}>공개방</option>
              <option value={"close"}>비밀방</option>
            </select>
          </RoomSetting>
          </Settings>
          
          <PwdInput>
            {secret === "close" ? (
              <Input
                placeholder="방 비밀번호"
                onChange={(e) => setPwd(e.target.value)}
                type="password"
                minLength="4"
                maxLength="10"
              />
            ) : null}
          </PwdInput>

          <RoomInfoInput>
          <Input
            placeholder="방정보를 입력해주세요"
            onChange={(e) => setTitle(e.target.value)}
          />
          </RoomInfoInput>

          <WholeBox>
            <TagBox>
              {tagList.map((tagItem, index) => {
                return (
                  <TagItem key={index}>
                    <Text>#{tagItem}</Text>
                    <Button onClick={deleteTagItem}>X</Button>
                  </TagItem>
                )
              })}

              <TagInput
                type='text'
                placeholder='태그를 입력해주세요'
                tabIndex={2}
                onChange={e => setTagItem(e.target.value)}
                value={tagItem}
                onKeyPress={onKeyPress}
              />
            </TagBox>
          </WholeBox>

          <MRoomButton
            onClick={() =>
              dispatch(
                roomActions.addRoomDB(title, secret, pwd, category, tagList )
              )
            }
          >
          방 만들기
          </MRoomButton>
        </Contents>
      </MRoomWrap>
    </React.Fragment>
  );
};

// 모달창 뒷배경이 회색일 때
const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MRoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 18px;
  position: absolute;
  width: 540px;
  height: 549px;
  box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px;
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

const HelloText = styled.div`
  padding: 8px;
  height: 72px;
  align-self: stretch;
`;

const Settings = styled.div`
  display: flex;
  flex-direction: row;
  width: 184px;
  height: 50px;
  border-radius: 4px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  width: 184px;
  height: 50px;
  border-radius: 4px;
`;

const RoomSetting = styled.div`
  display: flex;
  flex-direction: row;
  width: 184px;
  height: 50px;
  border-radius: 4px;
`;

const PwdInput = styled.div`
  padding: 8px;
  margin: 4px 0px;
`

const RoomInfoInput = styled.div`
  padding: 8px;
  height: 66px;
  margin: 4px 0px;
`

const WholeBox = styled.div`
  padding: 10px;
  height: 100vh;
`

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 488px;
  height: 50px;
  border-radius: 10px;
  background: white;
  background: #FFFFFF;
  border-radius: 4px;
  margin: 8px 0px;
  border: solid;
  &:focus-within {
    border-color: tomato;
  }
`

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: tomato;
  border-radius: 5px;
  color: white;
  font-size: 13px;
`

const Text = styled.span``

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
`

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`

const MRoomButton = styled.button`
  width: 118px;
  height: 42px;
  background: #cbb2fe;
  border-radius: 4px;
`;

export default MakeRoomModal;
