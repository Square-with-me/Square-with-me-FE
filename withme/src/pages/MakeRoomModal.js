import React, { useState,useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import '../styles/Category.css';

import { AiOutlineClose } from "react-icons/ai";

//svg
import { RiArrowDropDownLine } from "react-icons/ri";
import {ReactComponent as Lock} from "../assets/modals/lockIcon.svg"
import {ReactComponent as OnCamera} from "../assets/modals/onCameraIcon.svg"
import {ReactComponent as OffCamera} from "../assets/modals/offCameraIcon.svg"
import {ReactComponent as BeautyIcon} from "../assets/category/beautyIcon.svg"
import {ReactComponent as ConsultingIcon} from "../assets/category/consultingIcon.svg"
import {ReactComponent as CultureIcon} from "../assets/category/cultureIcon.svg"
import {ReactComponent as ExerciseIcon} from "../assets/category/exerciseIcon.svg"
import {ReactComponent as OtherIcon} from "../assets/category/otherIcon.svg"
import {ReactComponent as StudyIcon} from "../assets/category/studyIcon.svg"

//redux
import { actionCreators as roomActions } from "../redux/modules/room";


const MakeRoomModal = ({ setMRooms }) => {
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState("");
  const [camera, setCamera] = useState("ok");
  const [pwd, setPwd] = useState("");
  const [category, setCategory] = useState("");
  const [choiceCate, setChoiceCate] = useState(0);

  const dispatch = useDispatch();

  //태그관련코드
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  //엔터누르면 작성되기
  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };
  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem("");
  };
  //태그 지우기
  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    console.log(deleteTagItem);
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  //드롭다운 부분
  const dropdownRef = useRef(null);

  //드롭여부 확인
  const [isActive, setIsActive] = useState(false);
  const Visible = (active) => {
    setIsActive(active);
  };

  return (
    <React.Fragment>
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
          <HelloText>
            장혜진님 <br /> 새로운 친구를 만나러 가볼까요?
          </HelloText>
          <Category>
            {/* <div>            
              <select onChange={(e) => setCategory(e.target.value)}>
              <option>카테고리</option>
              <option value="1">뷰티</option>
              <option value="2">운동</option>
              <option value="3">스터디</option>
              <option value="4">상담</option>
              <option value="5">문화</option>
              <option value="6">기타</option>
            </select>
            </div> */}
            <div className="container">
              <DropWrap>
                <DropBtn
                  onClick={() => setIsActive(!isActive)}
                >
                  <CategoryDText>카테고리</CategoryDText>
                  <RiArrowDropDownLine />
                </DropBtn>
                <div                  
                  ref={dropdownRef}
                  className={`menu ${isActive ? "active" : "inactive"}`}>
                  <CategoryWrap>
                    <div>뷰티</div>
                    <BeautyIcon fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>
                  <CategoryWrap>
                    <div>운동</div>
                    <ExerciseIcon fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>
                  <CategoryWrap>
                    <div>스터디</div>
                    <StudyIcon fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>
                  <CategoryWrap>
                    <div>상담</div>
                    <ConsultingIcon fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>
                  <CategoryWrap>
                    <div>문화</div>
                    <div><CultureIcon width="24px"/></div>
                  </CategoryWrap>
                  <CategoryWrap>
                    <div>기타</div>
                    <OtherIcon fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>
                  
                </div>

                {/* <nav
                  ref={dropdownRef}
                  className={`menu ${isActive ? "active" : "inactive"}`}
                >
                  <ul>
                    <li>
                      <div style={{display:"flex", justifyContent:"space-between"}}>                      
                        <div
                        onClick={(e) => {
                          console.log(e.target);
                          setChoiceCate(1);
                          setIsActive(!isActive);
                        }}
                      >
                        뷰티
                      </div>
                      <BeautyIcon fill="#8A8BA3" width="24px"/>
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={(e) => {
                          console.log(e.target);
                          setChoiceCate(2);
                          setIsActive(!isActive);
                        }}
                      >
                        운동
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={(e) => {
                          console.log(e.target);
                          setChoiceCate(3);
                          setIsActive(!isActive);
                        }}
                      >
                        스터디
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={(e) => {
                          console.log(e.target);
                          setChoiceCate(4);
                          setIsActive(!isActive);
                        }}
                      >
                        상담
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={(e) => {
                          console.log(e.target);
                          setChoiceCate(5);
                          setIsActive(!isActive);
                        }}
                      >
                        문화
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={(e) => {
                          console.log(e.target);
                          setChoiceCate(6);
                          setIsActive(!isActive);
                        }}
                      >
                        기타
                      </div>
                    </li>
                  </ul>
                </nav> */}
              </DropWrap>
            </div>

            <div
              style={{
                display: "flex",
                height: "40px",
                margin: " 0px 16px",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {camera === "ok" ? (
                <OnCamera
                  style={{ marginRight: "16px" }}
                  width="32px"
                  fill="#8A8BA3"
                  onClick={() => setCamera("no")}
                />
              ) : (
                <OffCamera
                  style={{ marginRight: "16px" }}
                  width="32px"
                  fill="#33344B"
                  onClick={() => setCamera("ok")}
                />
              )}

              {secret === "close" ? (
                <Lock
                  width="32px"
                  fill="#33344B"
                  onClick={() => setSecret("open")}
                />
              ) : (
                <Lock
                  width="32px"
                  fill="#8A8BA3"
                  onClick={() => setSecret("close")}
                />
              )}
            </div>
          </Category>

          <div>
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
              style={{}}
            />
          </div>

          <div>
            <TagInput
              type="text"
              placeholder="태그를 입력해주세요"
              tabIndex={2}
              onChange={(e) => setTagItem(e.target.value)}
              value={tagItem}
              onKeyPress={onKeyPress}
            />
            <TagItemWrap>
              {tagList.map((tagItem, index) => {
                return tagList.length < 6 ? (
                  <TagItem key={index}>
                    <p style={{ fontSize: "12px" }}>{tagItem}</p>
                    <Button onClick={deleteTagItem}>X</Button>
                  </TagItem>
                ) : null;
              })}
            </TagItemWrap>
          </div>

          <Btn
            onClick={() =>
              dispatch(
                roomActions.addRoomDB(
                  title,
                  secret,
                  pwd,
                  category,
                  tagList,
                  camera
                )
              )
            }
          >
            방 만들기
          </Btn>
        </Contents>
      </LoginWrap>
      <ModalBackground
        onClick={() => {
          setMRooms(false);
        }}
      />
    </React.Fragment>
  );
};

// 모달창 뒷배경
const ModalBackground = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
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
  position: fixed;
  width: 540px;
  height: 700px;
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
height: 100%;
`
//방설정
const Category = styled.div`
  display: flex;
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
  padding: 8px 6px 8px 10px;
  background-color: #E3E5FF;
  border-radius: 4px;
  color: #33344B;
  font-size: 12px;
  width:83px;
  font-weight: 400;
  /* height: 28px; */
  margin-right: 10px;
  margin:0px 10px 30px 0px;
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
  padding: 12px 12px 12px 14px;
  &:focus-within {
    border: none;
    outline: 1px solid #7179F0;
    box-shadow:0 0 4px #7179F0;
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
/* margin:  0px 0px 0px 16px; */
padding: 12px 14px;
position: fixed;
right: 26px;
&:hover{
  background-color: #BCC0FF;
}
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
padding: 12px 12px 12px 14px;
border-radius: 4px;
&:focus{
  border: none;
  outline: 1px solid #7179F0;
  box-shadow:0 0 4px #7179F0;
}
`

//드롭부분 css
const DropBtn = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #8a8ba3;
  padding: 15px;
  border: none;
  width: 200px;
  &:hover{
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;
const CategoryDText = styled.div`
  font-size: 16px;
  color: #8a8ba3;
`;

const DropWrap =styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #8A8BA3;
  border-radius: 4px;
  width: 140px;
`
const CategoryWrap = styled.div`
display: flex;
justify-content: space-between;
padding: 10px;
align-items: center;
div{
  font-size: 16px;
  color: #8a8ba3;
  &:hover{
    color: #7179F0 ;
    fill: #7179F0;
  }
}
`

export default MakeRoomModal;
