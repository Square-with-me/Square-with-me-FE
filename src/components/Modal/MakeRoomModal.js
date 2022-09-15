import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Category.css";

//svg
import { ReactComponent as Lock } from "../../assets/modals/lockIcon.svg";
import { ReactComponent as OnCamera } from "../../assets/modals/onCameraIcon.svg";
import { ReactComponent as OffCamera } from "../../assets/modals/offCameraIcon.svg";
import { ReactComponent as ConsultingIcon } from "../../assets/category/consultingIcon.svg";
import { ReactComponent as CultureIcon } from "../../assets/category/cultureIcon.svg";
import { ReactComponent as ExerciseIcon } from "../../assets/category/exerciseIcon.svg";
import { ReactComponent as OtherIcon } from "../../assets/category/otherIcon.svg";
import { ReactComponent as StudyIcon } from "../../assets/category/studyIcon.svg";

//redux
import { actionCreators as roomActions } from "../../redux/modules/room";
import { actionCreators as userActions } from "../../redux/modules/user";

const MakeRoomModal = ({ setMRooms, create }) => {
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState(false);
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
    if (updatedTagList.length > 5) {
      updatedTagList.pop();
    }
  };
  //태그 지우기
  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
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
  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    dispatch(userActions.logInCheckDB());
  }, []);

  return (
    <React.Fragment>
      <MakeRoomWrap>
        <Headers
          onClick={() => {
            setMRooms(false);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L20 20"
              stroke="#33344B"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M20 4L4 20"
              stroke="#33344B"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </Headers>
        <Contents>
          <HelloText>
            {user ? user.nickname : ""}님 <br /> 새로운 친구를 만나러 가볼까요?
          </HelloText>
          <Category>
            <DropWrap>
              <DropBtn
                onClick={() => setIsActive(!isActive)}
                style={{ height: "40px" }}
              >
                {category === "" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CategoryDText>카테고리</CategoryDText>
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.9001 10.5498L16.0001 19.4498L7.1001 10.5498"
                          stroke="#8A8BA3"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div>
                    {category === "뷰티" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <CategoryDText>{category}</CategoryDText>
                        <svg
                          width="24px"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.11 9.32L11.33 5H8.88L7.1 9.32L4 11.44V14.18L7.1 16.3L9 21H11.16L13.08 16.32L15.97 14.32V11.32L13.11 9.32ZM11.49 15L10.11 18.36L8.72 15L5.54 12.81L8.72 10.64L10.11 7.27L11.49 10.64L14.67 12.81L11.49 15Z"
                            fill="#8A8BA3"
                          />
                          <path
                            d="M23.7799 15.34L21.9999 11H19.5499L17.7699 15.32L14.6699 17.44V20.2L17.7699 22.32L19.6999 27H21.8599L23.7799 22.32L26.6699 20.32V17.32L23.7799 15.34ZM22.1599 21L20.7799 24.36L19.3899 21L16.2099 18.82L19.3899 16.65L20.7799 13.28L22.1599 16.65L25.3399 18.82L22.1599 21Z"
                            fill="#8A8BA3"
                          />
                        </svg>
                      </div>
                    ) : category === "운동" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <CategoryDText>{category}</CategoryDText>
                        <ExerciseIcon fill="#8A8BA3" width="24px" />
                      </div>
                    ) : category === "스터디" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <CategoryDText>{category}</CategoryDText>
                        <StudyIcon fill="#8A8BA3" width="24px" />
                      </div>
                    ) : category === "상담" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <CategoryDText>{category}</CategoryDText>
                        <ConsultingIcon fill="#8A8BA3" width="24px" />
                      </div>
                    ) : category === "문화" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <CategoryDText>{category}</CategoryDText>
                        <CultureIcon fill="#8A8BA3" width="24px" />
                      </div>
                    ) : category === "기타" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <CategoryDText CategoryDText>{category}</CategoryDText>
                        <OtherIcon fill="#8A8BA3" width="24px" />
                      </div>
                    ) : null}
                  </div>
                )}
              </DropBtn>
              <div
                ref={dropdownRef}
                className={`menu ${isActive ? "active" : "inactive"}`}
              >
                <CategoryWrap
                  onClick={() => {
                    setCategory("뷰티");
                    setIsActive(!isActive);
                    setChoiceCate(1);
                  }}
                >
                  <div>뷰티</div>
                  <svg
                    width="24px"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.11 9.32L11.33 5H8.88L7.1 9.32L4 11.44V14.18L7.1 16.3L9 21H11.16L13.08 16.32L15.97 14.32V11.32L13.11 9.32ZM11.49 15L10.11 18.36L8.72 15L5.54 12.81L8.72 10.64L10.11 7.27L11.49 10.64L14.67 12.81L11.49 15Z"
                      fill="#8A8BA3"
                    />
                    <path
                      d="M23.7799 15.34L21.9999 11H19.5499L17.7699 15.32L14.6699 17.44V20.2L17.7699 22.32L19.6999 27H21.8599L23.7799 22.32L26.6699 20.32V17.32L23.7799 15.34ZM22.1599 21L20.7799 24.36L19.3899 21L16.2099 18.82L19.3899 16.65L20.7799 13.28L22.1599 16.65L25.3399 18.82L22.1599 21Z"
                      fill="#8A8BA3"
                    />
                  </svg>
                </CategoryWrap>
                <Line />
                <CategoryWrap
                  onClick={() => {
                    setCategory("운동");
                    setIsActive(!isActive);
                    setChoiceCate(2);
                  }}
                >
                  <div>운동</div>
                  <ExerciseIcon fill="#8A8BA3" width="24px" />
                </CategoryWrap>
                <Line />
                <CategoryWrap
                  onClick={() => {
                    setCategory("스터디");
                    setIsActive(!isActive);
                    setChoiceCate(3);
                  }}
                >
                  <div>스터디</div>
                  <StudyIcon fill="#8A8BA3" width="24px" />
                </CategoryWrap>
                <Line />
                <CategoryWrap
                  onClick={() => {
                    setCategory("상담");
                    setIsActive(!isActive);
                    setChoiceCate(4);
                  }}
                >
                  <div>상담</div>
                  <ConsultingIcon fill="#8A8BA3" width="24px" />
                </CategoryWrap>
                <Line />
                <CategoryWrap
                  onClick={() => {
                    setCategory("문화");
                    setIsActive(!isActive);
                    setChoiceCate(5);
                  }}
                >
                  <div>문화</div>
                  <div>
                    <CultureIcon fill="#8A8BA3" width="24px" />
                  </div>
                </CategoryWrap>
                <Line />
                <CategoryWrap
                  onClick={() => {
                    setCategory("기타");
                    setIsActive(!isActive);
                    setChoiceCate(6);
                  }}
                >
                  <div>기타</div>
                  <OtherIcon fill="#8A8BA3" width="24px" />
                </CategoryWrap>
              </div>
            </DropWrap>

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

              {secret === false ? (
                <Lock
                  width="32px"
                  fill="#8A8BA3"
                  onClick={() => setSecret(true)}
                />
              ) : (
                <Lock
                  width="32px"
                  fill="#33344B"
                  onClick={() => setSecret(false)}
                />
              )}
            </div>
          </Category>

          <div>
            {secret === true ? (
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
              placeholder="방제목을 입력해주세요"
              onChange={(e) => setTitle(e.target.value)}
              style={{}}
            />
          </div>

          <div>
            <TagInput
              type="text"
              placeholder="# 없이 엔터를 쳐서 태그를 입력해주세요 (최대 5개)"
              tabIndex={2}
              onChange={(e) => setTagItem(e.target.value)}
              value={tagItem}
              onKeyPress={onKeyPress}
              maxLength={4}
            />
            <TagItemWrap>
              {tagList.map((tagItem, index) => {
                return (
                  <TagItem key={index}>
                    <p style={{ fontSize: "12px" }}>{tagItem}</p>
                    <Button onClick={deleteTagItem}>X</Button>
                  </TagItem>
                );
              })}
            </TagItemWrap>
          </div>
        </Contents>
        <Btn
          onClick={() =>
            dispatch(
              roomActions.addRoomDB(
                {
                  title: title,
                  isSecret: secret,
                  pwd: pwd,
                  categoryId: choiceCate,
                  tags: tagList,
                  // camera,
                },
                category
              )
            )
          }
        >
          방 만들기
        </Btn>
      </MakeRoomWrap>
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
`;
//모달창 전체
const MakeRoomWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 26px;
  position: fixed;
  width: 540px;
  min-height: 555px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fafafa;
  z-index: 100;
  @media screen and (max-width: 767px) {
    width: 350px;
  }
`;
//모달창 헤더
const Headers = styled.div`
  position: fixed;
  right: 26px;
  cursor: pointer;
`;
//모달창 안에 내용 감싸기
const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
//방설정
const Category = styled.div`
  display: flex;
  margin: 0px 10px 16px 0px;

  select {
    width: 148px;
    height: 40px;
    border: 1px solid #8a8ba3;
    border-radius: 4px;
    & :focus {
      border: 1px solid #7179f0;
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
`;
const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 6px 8px 10px;
  background-color: #e3e5ff;
  border-radius: 4px;
  color: #33344b;
  font-size: 12px;
  width: 83px;
  font-weight: 600;
  margin-right: 10px;
  margin: 0px 10px 30px 0px;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  margin-right: 3px;
`;
const TagInput = styled.input`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background: #ffffff;
  border-radius: 4px;
  margin-bottom: 16px;
  border: 1px solid #8a8ba3;
  padding: 12px 12px 12px 14px;
  @media screen and (max-width: 767px) {
    ::placeholder {
      font-size: 11px;
    }
  }
  &:focus-within {
    border: none;
    outline: 1px solid #7179f0;
    box-shadow: 0 0 4px #7179f0;
  }
`;

//element
const Btn = styled.button`
  width: 120px;
  height: 48px;
  font-size: 16px;
  background-color: #7179f0;
  color: #fafaff;
  border: none;
  border-radius: 4px;
  /* margin:  0px 0px 0px 16px; */
  padding: 12px 14px;
  align-self: end;
  justify-self: end;
  font-weight: 600;
  &:hover {
    background-color: #bcc0ff;
  }
`;
const HelloText = styled.div`
  align-self: stretch;
  margin-top: 50px;
  margin-bottom: 32px;
  font-size: 24px;
  line-height: 28px;
  align-items: center;
  color: #4a4a58;
  font-weight: 700;
  @media screen and (max-width: 767px) {
    font-size: 19px;
  }
`;
const Input = styled.input`
  border: 1px solid #8a8ba3;
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  padding: 12px 12px 12px 14px;
  border-radius: 4px;
  @media screen and (max-width: 767px) {
    ::placeholder {
      font-size: 11px;
    }
  }
  &:focus {
    border: none;
    outline: 1px solid #7179f0;
    box-shadow: 0 0 4px #7179f0;
  }
`;

//드롭부분 css
const DropBtn = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  margin: auto;
  padding: 9px;
  width: 200px;
  font-weight: 700;
  &:hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;
const CategoryDText = styled.div`
  font-size: 16px;
  color: #8a8ba3;
  font-weight: 600;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const DropWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  width: 140px;
`;
const CategoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  align-items: center;
  cursor: pointer;
  div {
    font-size: 16px;
    color: #8a8ba3;
    font-weight: 700;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }

  &:hover {
    div {
      color: #7179f0;
    }
    svg {
      fill: #7179f0;
    }
    path {
      fill: #7179f0;
    }
  }
`;

const Line = styled.hr`
  width: 88%;
  margin: auto;
  border: 0.5px solid #e4e2eb;
`;

export default MakeRoomModal;
