import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { actionCreators as roomActions } from "../redux/modules/room";
import { useCallback } from "react";

const MakeRoomModal = ({ setMRooms }) => {
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState("");
  const [pwd, setPwd] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  console.log(category, title);

  const dispatch = useDispatch();

  // onChange로 관리할 문자열
 const [hashtag, setHashtag] = useState('')
 // 해시태그를 담을 배열
 const [hashArr, setHashArr] = useState([])

 const onKeyUp = useCallback(
    (e) => {
      if (process.browser) {
        /* 요소 불러오기, 만들기*/
        const $HashWrapOuter = document.querySelector('.HashWrapOuter')
        const $HashWrapInner = document.createElement('div')
        $HashWrapInner.className = 'HashWrapInner'
        
        /* 태그를 클릭 이벤트 관련 로직 */
        $HashWrapInner.addEventListener('click', () => {
          $HashWrapOuter?.removeChild($HashWrapInner)
          console.log($HashWrapInner.innerHTML)
          setHashArr(hashArr.filter((hashtag) => hashtag))
        })

        /* enter 키 코드 :13 */
        if (e.keyCode === 13 && e.target.value.trim() !== '') {
          console.log('Enter Key 입력됨!', e.target.value)
          $HashWrapInner.innerHTML = '#' + e.target.value
          $HashWrapOuter?.appendChild($HashWrapInner)
          setHashArr((hashArr) => [...hashArr, hashtag])
          setHashtag('')
        }
      }
    },
    [hashtag, hashArr]
  )

  return (
    <React.Fragment>
      <Black
        onClick={() => {
          setMRooms(false);
        }}
      />
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
          {secret === "close" ? (
            <input
              placeholder="roompwd"
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              minLength="4"
              maxLength="10"
            />
          ) : null}
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
          {category === "1" ? <p>패션, 헤어, 성형</p> : null}
          {category === "2" ? <p>다이어트, 스포츠, 운동</p> : null}
          {category === "3" ? <p>독서, 공부, 시사, 토론, 과학, IT/컴퓨터</p>: null}
          {category === "4" ? <p>취업, 아르바이트, 진로, 금융, 연애, 인테리어, 법률, 의료,사주/타로 </p> : null}
          {category === "5" ? <p>마음챙김/명상, 정보, 수면, 요리, 반려동물, 게임, 여행,공포/미스터리</p> : null}
          {category === "6" ? <p>손재주, 예술, 댄스/노래, 영화/드라마, 덕질</p>  : null}
          <div className="HashWrap" >
            <div className="HashWrapOuter"></div>
            <input
                className="HashInput"
                type="text"
                value={hashtag}
                onChange={(e)=>setTags(e.target.value)}
                onKeyUp={onKeyUp}
                placeholder="해시태그 입력"
            />
            </div>
          <input
            placeholder="hash tags"
            onChange={(e) => setTags(e.target.value)}
          />
          <button
            onClick={() =>
              dispatch(
                roomActions.addRoomDB(title, secret, pwd, category, tags)
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

const Black = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
`;
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
  background-color: white;
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
export default MakeRoomModal;
