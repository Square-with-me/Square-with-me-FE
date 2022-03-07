import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { actionCreators as roomActions } from "../redux/modules/room";
import { useCallback } from "react";
import { useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
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
      {/* <ModalBackground
        onClick={() => {
          setMRooms(false);
        }}
      /> */}
      <Wrap>
        <Headers>
          <AiOutlineClose
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMRooms(false);
            }}
          />
          <div style={{ marginRight: "40%" }}>방 만들기!</div>
        </Headers>
        <div>
          <input
            placeholder="room title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <select onChange={(e) => setSecret(e.target.value)}>
              <option value={"open"}>open</option>
              <option value={"close"}>close</option>
            </select>
          </div>

          <div>
            {secret === "close" ? (
              <input
                placeholder="roompwd"
                onChange={(e) => setPwd(e.target.value)}
                type="password"
                minLength="4"
                maxLength="10"
              />
            ) : null}
          </div>

          <div>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option>선택해주세요</option>
              <option value="1">뷰티</option>
              <option value="2">운동</option>
              <option value="3">스터디</option>
              <option value="4">상담</option>
              <option value="5">문화</option>
              <option value="6">기타</option>
            </select>
          </div>

          <div>
            {category === "1" ? <p>패션, 헤어, 성형</p> : null}
            {category === "2" ? <p>다이어트, 스포츠, 운동</p> : null}
            {category === "3" ? (<p>독서, 공부, 시사, 토론, 과학, IT/컴퓨터</p>) : null}
            {category === "4" ? (<p>취업, 아르바이트, 진로, 금융, 연애, 인테리어, 법률,의료,사주/타로{" "}</p>) : null}
            {category === "5" ? (<p>마음챙김/명상, 정보, 수면, 요리, 반려동물, 게임,여행,공포/미스터리</p>) : null}
            {category === "6" ? (<p>손재주, 예술, 댄스/노래, 영화/드라마, 덕질</p>) : null}
          </div>
        
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

          <button
            onClick={() =>
              dispatch(
                roomActions.addRoomDB(title, secret, pwd, category, tagList )
              )
            }
          >
          make a room
          </button>
        </div>
      </Wrap>
    </React.Fragment>
  );
};

// 모달창 뒷배경이 회색일 때
// const ModalBackground = styled.div`
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   z-index: 99;
//   background-color: rgba(0, 0, 0, 0.5);
// `;

const Wrap = styled.div`
  width: 600px;
  max-width: 60%;
  z-index: 100;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #868686;
  z-index: 100;
`;

const Headers = styled.div`
  -webkit-box-pack: justify;
  -webkit-box-align: center;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;
  min-height: 48px;
  border-bottom: 1px solid rgb(235, 235, 235);
  color: rgb(34, 34, 34);
  font-size: 16px;
  line-height: 20px;
  font-weight: 800;
`;

const WholeBox = styled.div`
  padding: 10px;
  height: 100vh;
`

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background: white;
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

export default MakeRoomModal;
