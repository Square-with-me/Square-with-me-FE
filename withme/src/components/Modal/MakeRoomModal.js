import React, { useState,useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import '../../styles/Category.css';


//svg
import {ReactComponent as Lock} from "../../assets/modals/lockIcon.svg"
import {ReactComponent as OnCamera} from "../../assets/modals/onCameraIcon.svg"
import {ReactComponent as OffCamera} from "../../assets/modals/offCameraIcon.svg"
import {ReactComponent as ConsultingIcon} from "../../assets/category/consultingIcon.svg"
import {ReactComponent as CultureIcon} from "../../assets/category/cultureIcon.svg"
import {ReactComponent as ExerciseIcon} from "../../assets/category/exerciseIcon.svg"
import {ReactComponent as OtherIcon} from "../../assets/category/otherIcon.svg"
import {ReactComponent as StudyIcon} from "../../assets/category/studyIcon.svg"

//redux
import { actionCreators as roomActions } from "../../redux/modules/room";


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
        <Headers            
          onClick={() => {
          setMRooms(false);
          }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L20 20" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
        <path d="M20 4L4 20" stroke="#33344B" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
        </Headers>
        <Contents>
          <HelloText>
            장혜진님 <br /> 새로운 친구를 만나러 가볼까요?
          </HelloText>
          <Category>
            <div className="container">
              <DropWrap>
                <DropBtn
                  onClick={() => setIsActive(!isActive)}
                  style={{ height: "40px" }}
                >{category === ""
                ? <CategoryDText>카테고리</CategoryDText>
                :<CategoryDText>{category}</CategoryDText>}
                  <div>
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.9001 10.5498L16.0001 19.4498L7.1001 10.5498" stroke="#8A8BA3" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                  </div>
                </DropBtn>
                <div                  
                  ref={dropdownRef}
                  className={`menu ${isActive ? "active" : "inactive"}`}>
                  <CategoryWrap
                  onClick={()=>{
                    setCategory("뷰티")
                    setIsActive(!isActive)
                    setChoiceCate(1);
                  }}>
                    <div>뷰티</div>
                    <svg width="24px" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.11 9.32L11.33 5H8.88L7.1 9.32L4 11.44V14.18L7.1 16.3L9 21H11.16L13.08 16.32L15.97 14.32V11.32L13.11 9.32ZM11.49 15L10.11 18.36L8.72 15L5.54 12.81L8.72 10.64L10.11 7.27L11.49 10.64L14.67 12.81L11.49 15Z" fill="#8A8BA3"/>
                      <path d="M23.7799 15.34L21.9999 11H19.5499L17.7699 15.32L14.6699 17.44V20.2L17.7699 22.32L19.6999 27H21.8599L23.7799 22.32L26.6699 20.32V17.32L23.7799 15.34ZM22.1599 21L20.7799 24.36L19.3899 21L16.2099 18.82L19.3899 16.65L20.7799 13.28L22.1599 16.65L25.3399 18.82L22.1599 21Z" fill="#8A8BA3"/>
                    </svg>
                  </CategoryWrap>

                  <CategoryWrap                   
                  onClick={()=>{
                    setCategory("운동")
                    setIsActive(!isActive)
                    setChoiceCate(2);
                  }}>
                    <div>운동</div>
                    <ExerciseIcon fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>

                  <CategoryWrap                   
                  onClick={()=>{
                    setCategory("스터디")
                    setIsActive(!isActive)
                    setChoiceCate(3);
                  }}>
                    <div>스터디</div>
                    <StudyIcon fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>

                  <CategoryWrap                   
                  onClick={()=>{
                    setCategory("상담")
                    setIsActive(!isActive)
                    setChoiceCate(4);
                  }}>
                    <div>상담</div>
                    <ConsultingIcon fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>

                  <CategoryWrap                   
                  onClick={()=>{
                    setCategory("문화")
                    setIsActive(!isActive)
                    setChoiceCate(5);
                  }}>
                    <div>문화</div>
                    <div><CultureIcon  fill="#8A8BA3" width="24px"/></div>
                  </CategoryWrap>

                  <CategoryWrap                   
                  onClick={()=>{
                    setCategory("기타")
                    setIsActive(!isActive)
                    setChoiceCate(6);
                  }}>
                    <div>기타</div>
                    <OtherIcon fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>
                </div>
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
  cursor: pointer;
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
    border: 0.5px solid #7B61FF
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
