import React, { useEffect, useRef, useState } from "react";
import jsonData from "../shared/responseJ.json";
import styled from "styled-components";
import "../styles/Drop.css";

// main icons
import { RiArrowDropDownLine } from "react-icons/ri";
import { ReactComponent as Search } from '../assets/main/searchIcon.svg';
import { ReactComponent as Plus } from '../assets/main/plusIcon.svg';
import { ReactComponent as Lock } from '../assets/main/lockIcon.svg';
// import { ReactComponent as HotRoom } from '../assets/main/hotRoomIcon.svg';
import { ReactComponent as Refresh } from '../assets/main/refreshIcon.svg';
import { ReactComponent as UserNick } from '../assets/main/userNickIcon.svg';

// category icon
import { ReactComponent as Consulting } from '../assets/category/consultingIcon.svg';
import { ReactComponent as Culture } from '../assets/category/cultureIcon.svg';
import { ReactComponent as Exercise } from '../assets/category/exerciseIcon.svg';
import { ReactComponent as Other } from '../assets/category/otherIcon.svg';
import { ReactComponent as Study } from '../assets/category/studyIcon.svg';


//pages/components
import MakeRoomModal from "../components/Modal/MakeRoomModal";
import Banner from "../components/Banner";
import RoomCard from "../components/RoomCard";
// import Footer from "../components/Footer";
import FooterTest from "../components/FooterTest";
import Header from "../components/Header";

//redux
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import { actionCreators as userActions } from "../redux/modules/user";

// 방 생성하기
import { v1 as uuid } from "uuid";
import { history } from "../redux/configureStore";

const Main = () => {
  const dispatch = useDispatch();

  //드롭다운 부분
  const dropdownRef = useRef(null);

  //드롭여부 확인
  const [isActive, setIsActive] = useState(false);
  const Visible = (active) => {
    setIsActive(active);
  };

  const [MRooms, setMRooms] = useState(false);
  //검색
  const [search, setSearch] = useState("");
  //참여가능한 방
  const [possible, setPossible] = useState(false);
  const [title, setTitle] = useState("");

  //side
  const [side, setSide] = useState(false)
  const onSetSide =(active)=>{
    setSide(active)
  }

  let roomList = useSelector((store) => store.room.list);
  // const hotRoom = useSelector((state)=>state.room.hotList)

  // React.useEffect(()=>{
  //   dispatch(roomActions.hotRoomDB())
  // },[])

  // React.useEffect(()=>{
  //   dispatch(userActions.NotMemberLoginCheckDB())
  // },[])

  const notUser_is_login = useSelector((store) => store.user.notUser_is_login);
  const notUser_is_local = localStorage.getItem("notUser_is_login")
    ? true
    : false;



  // sumin ////////////////////////

  const [category, setCategory] = useState("카테고리");
  const [choiceCate, setChoiceCate] = useState(0); // 0은 전체 불러오기

  useEffect(() => {
    if (choiceCate === 0) {
      // 전체 방 불러오기
      dispatch(roomActions.getRoomDB());
    } else {
      // 카테고리별 방 불러오기
    }
  }, [choiceCate]);

  useEffect(() => {
    console.log("예아", roomList);
  }, [roomList]);

  ////////////////////////////////

  // 방 생성하기 함수
  function create() {
    const id = uuid();
    history.push(`/room/${id}`);
  }

  return (
    <React.Fragment>
      <Wrap>
        <div className="header"><Header/></div>
        <EXRoomMaker onClick={create}>방생성하기</EXRoomMaker>
        <SearchBarWrap className="searchbar">
          <SearchBarInput
            placeholder="방 정보를 입력해주세요"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            style={{
              cursor: "pointer",
              width: "32px",
              height: "32px",
              margin: "auto",
              position: "absolute",
              marginRight: "20px",
              fill: "#33344B",
            }}
            onClick={() => {
              dispatch(roomActions.searchRoomDB(search));
            }}
          />
        </SearchBarWrap>

        <div className="banner">
          <Banner />
        </div>

        <HotRoomListContainer className="hotroomlist"></HotRoomListContainer>

        <MenuBar className="menulist">
          <div>
            {possible === true ? (
              <AllBtn
                onClick={() => {
                  setPossible(false);
                }}
              >
                <RoomText>ALL</RoomText>
              </AllBtn>
            ) : (
              <AllBtn
                onClick={() => {
                  setPossible(false);
                }}
                style={{ background: "#7179F0", border: "none" }}
              >
                <RoomText style={{ color: "#FAFAFF" }}>ALL</RoomText>
              </AllBtn>
            )}

            {possible === true ? (
              <PossibleBtn
                onClick={() => {
                  setPossible(false);
                }}
                style={{ background: "#7179F0", border: "none" }}
              >
                <RoomText style={{ color: "#FAFAFF" }}>참여 가능</RoomText>
              </PossibleBtn>
            ) : (
              <PossibleBtn
                onClick={() => {
                  setPossible(true);
                }}
              >
                <RoomText>참여 가능</RoomText>
              </PossibleBtn>
            )}

            <SpectatorBtn>
              <RoomText>관전 가능</RoomText>
            </SpectatorBtn>
          </div>

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
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <Exercise fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>

                  <CategoryWrap                   
                  onClick={()=>{
                    setCategory("스터디")
                    setIsActive(!isActive)
                    setChoiceCate(3);
                  }}>
                    <div>스터디</div>
                    <Study fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>

                  <CategoryWrap                   
                  onClick={()=>{
                    setCategory("상담")
                    setIsActive(!isActive)
                    setChoiceCate(4);
                  }}>
                    <div>상담</div>
                    <Consulting fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>

                  <CategoryWrap                   
                  onClick={()=>{
                    setCategory("문화")
                    setIsActive(!isActive)
                    setChoiceCate(5);
                  }}>
                    <div>문화</div>
                    <div><Culture  fill="#8A8BA3" width="24px"/></div>
                  </CategoryWrap>

                  <CategoryWrap                   
                  onClick={()=>{
                    setCategory("기타")
                    setIsActive(!isActive)
                    setChoiceCate(6);
                  }}>
                    <div>기타</div>
                    <Other fill="#8A8BA3" width="24px"/>
                  </CategoryWrap>
                </div>
              </DropWrap>
            </div>

          </Category>
          <Refresh
            style={{
              cursor: "pointer",
              width: "32px",
              height: "32px",
              margin: "auto",
              marginRight: "0px",
              fill: "#8A8BA3",
            }}
          />
        </MenuBar>

        <RoomListContainer className="roomlist">
          {/* 방 만들기 카드 */}
          <RoomCardContainer
            onClick={() => {
              setMRooms(true);
            }}
            style={{ backgroundColor: "#BCC0FF" }}
          >
            <Plus
              style={{
                cursor: "pointer",
                width: "70px",
                height: "70px",
                margin: "2rem 4.5rem",
                fill: "#FFFFFF",
              }}
            />
          </RoomCardContainer>
          {MRooms && <MakeRoomModal setMRooms={setMRooms} />}

          {possible === true
            ? jsonData.map((r, idx) => {
                return (
                  <>
                    {r.Participants.length === 4 ||
                    r.isSecrect === "true" ? null : (
                      <RoomCardContainer>
                        <div>
                          <CategoryText>{r.category}</CategoryText>
                          <TitleText
                            className="title"
                            onChange={(e) => setTitle(e.target.value)}
                          >
                            {r.title}
                          </TitleText>
                        </div>
                        <div>
                          {r.isSecrect === "true" ? (
                            <div>
                              <div>
                                <Lock style={{}} />
                              </div>
                              <div>
                                <UserNick
                                  style={{ marginRight: "5px" }}
                                />
                                <span>{r.Participants.length}/4</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div>
                                <Lock />
                              </div>
                              <div>
                                <UserNick
                                  style={{ marginRight: "5px" }}
                                />
                                <span>{r.Participants.length}/4</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="tag">
                          {r.Tags.map((r, idx) => {
                            return <TagText>#{r.name}</TagText>;
                          })}
                        </div>
                      </RoomCardContainer>
                    )}
                  </>
                );
              })
            : jsonData.map((r, idx) => {
                return (
                  <div style={{ backgroundColor: "#FFFFFF" }}>
                    {r.Participants.length === 4 ? (
                      <RoomCardContainer style={{ backgroundColor: "#EDEBF1" }}>
                        <div>
                          <CategoryText>{r.category}</CategoryText>
                          <TitleText className="title">{r.title}</TitleText>
                        </div>
                        <div>
                          {r.isSecrect === "true" ? (
                            <div>
                              <div>
                                <Lock />
                              </div>
                              <div>
                                <UserNick
                                  style={{ marginRight: "5px" }}
                                />
                                <span>{r.Participants.length}/4</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div>
                                <Lock />
                              </div>
                              <div>
                                <UserNick
                                  style={{ marginRight: "5px" }}
                                />
                                <span>{r.Participants.length}/4</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="tag">
                          {r.Tags.map((r, idx) => {
                            return <TagText>#{r.name}</TagText>;
                          })}
                        </div>
                      </RoomCardContainer>
                    ) : (
                      <RoomCardContainer>
                        <div>
                          <CategoryText>{r.category}</CategoryText>
                          <TitleText className="title">{r.title}</TitleText>
                        </div>
                        <div>
                          {r.isSecrect === "true" ? (
                            <div>
                              <div>
                                <Lock />
                              </div>
                              <div>
                                <UserNick
                                  style={{ marginRight: "5px" }}
                                />
                                <span>{r.Participants.length}/4</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div>
                                <Lock />
                              </div>
                              <div>
                                <UserNick
                                  style={{ marginRight: "5px" }}
                                />
                                <span>{r.Participants.length}/4</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="tag">
                          {r.Tags.map((r, idx) => {
                            return <TagText>#{r.name}</TagText>;
                          })}
                        </div>
                      </RoomCardContainer>
                    )}
                  </div>
                );
              })}

          {roomList
            ? roomList.map((data, index) => {
                console.log("히히", data);
                return <RoomCard {...data} />;
              })
            : ""}
        </RoomListContainer>

        <div className="morebtn">
          <Btn>더보기</Btn>
        </div>

        <div className="footer">
          {/* <Footer /> */}
          <FooterTest />
        </div>
      </Wrap>
    </React.Fragment>
  );
};

//share
const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  max-width: 1110px;
  margin: auto;
  grid-gap: 30px;
  margin: auto;
  position: relative;
  .header {
    grid-column: 12/13;
  }
  .searchbar {
    grid-column: 4/10;
  }
  .banner {
    grid-column: 1/13;
  }
  .hotroomlist {
    grid-column: 1/13;
  }
  .menulist {
    grid-column: 1/13;
  }
  .roomlist {
    grid-column: 1/13;
  }
  .morebtn {
    margin: auto;
  }
  .footer {
    grid-column: 1/13;
  }
`;

const EXRoomMaker = styled.button`
  padding: 14px;
  border: none;
  border-radius: 4px;
  margin-right: 16px;
  background-color: #edebf1;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const AllBtn = styled.button`
  padding: 14px 0px;
  width: 56px;
  height: 43px;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  margin-right: 16px;
  background-color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const PossibleBtn = styled.button`
  width: 90px;
  height: 43px;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  margin-right: 16px;
  background-color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const SpectatorBtn = styled.button`
  width: 90px;
  height: 43px;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  margin-right: 16px;
  background-color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const RoomText = styled.div`
  size: 2rem;
  color: #8a8ba3;
`;

const Btn = styled.button`
  padding: 12px 14px;
  width: 78px;
  height: 51px;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  background-color: #edebf1;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const MenuBar = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const Category = styled.div`
  display: flex;
  margin: 1px 10px 16px 0px;
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
    border: 1px solid #7B61FF
  }
  .active{
    border: 1px solid #7B61FF;
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

//searchbar
const SearchBarWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  position: relative;
  align-items: center;
  margin: 25px auto;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  padding: 10px;
`;

//room
const RoomListContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  @media screen and (min-width: 1607px) {
    grid-template-columns: repeat(4, minmax(0px, 1fr)) !important;
    row-gap: 32px;
  }
  @media screen and (min-width: 1232px) and (max-width: 1607px) {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
    row-gap: 32px;
  }
  @media screen and (min-width: 878px) and (max-width: 1232px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr)) !important;
  }
  @media screen and (min-width: 551px) and (max-width: 878px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
  @media screen and (min-width: 0px) and (max-width: 551px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
`;

const RoomCardContainer = styled.div`
  width: 255px;
  height: 175px;
  border: none;
  padding: 19px;
  border-radius: 4px;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-rows: 2fr;
  grid-gap: 8px;
  .tag {
    grid-column: 1/ 4;
    grid-row: 2 / 3;
    white-space: pre-line;
  }
`;

const CategoryText = styled.div`
  background: #ffc9c9;
  border-radius: 4px;
  width: 45px;
  height: 18px;
  margin: 8px 0px;
  padding: 2px 4px;
  font-style: normal;
  font-weight: 700;
  font-size: 0.6rem;
  color: #33344b;
  display: flex;
  justify-content: center;
`;

const TitleText = styled.div`
  font-weight: 700;
  white-space: nowrap;
  display: block;
  font-size: 1.2rem;
  color: #33344b;
`;

const TagText = styled.span`
  background-color: #fafaff;
  color: #33344b;
  font-weight: 400;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  padding: 0px 14px;
  margin-right: 10px;
`;

const HotRoomListContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  cursor: pointer;
  @media screen and (min-width: 1607px) {
    grid-template-columns: repeat(4, minmax(0px, 1fr)) !important;
    row-gap: 32px;
  }
  @media screen and (min-width: 1232px) and (max-width: 1607px) {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
    row-gap: 32px;
  }
  @media screen and (min-width: 878px) and (max-width: 1232px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr)) !important;
  }
  @media screen and (min-width: 551px) and (max-width: 878px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
  @media screen and (min-width: 0px) and (max-width: 551px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
`;

export default Main;
