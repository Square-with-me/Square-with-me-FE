import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "../styles/Drop.css";

// main icons
import { ReactComponent as Search } from "../assets/main/searchIcon.svg";
import { ReactComponent as Plus } from "../assets/main/plusIcon.svg";
import { ReactComponent as Refresh } from "../assets/main/refreshIcon.svg";

// category icon
import { ReactComponent as Consulting } from "../assets/category/consultingIcon.svg";
import { ReactComponent as Culture } from "../assets/category/cultureIcon.svg";
import { ReactComponent as Exercise } from "../assets/category/exerciseIcon.svg";
import { ReactComponent as Other } from "../assets/category/otherIcon.svg";
import { ReactComponent as Study } from "../assets/category/studyIcon.svg";

//pages/components
import MakeRoomModal from "../components/Modal/MakeRoomModal";
import Banner from "../components/Banner";
import RoomCard from "../components/RoomCard";
import FooterTest from "../components/FooterTest";
import Header from "../components/Header";

//redux
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import { actionCreators as userActions } from "../redux/modules/user";

// 방 생성하기
import { v1 as uuid } from "uuid";
import { history } from "../redux/configureStore";
import HotRoomCard from "../components/HotRoomCard";
import TestRoom from "../components/TestRoom";
import SecretRoomModal from "../components/Modal/SecretRoomModal";

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
  //비밀 방
  const [secret, setSecret] = useState(false)


  //login
  const notUser_is_login = useSelector((store) => store.user.notUser_is_login);
  const notUser_is_local = localStorage.getItem("notUser_is_login")
    ? true
    : false;
  React.useEffect(() => {
    dispatch(userActions.NotMemberLoginCheckDB());
  }, []);

  //room
  const [category, setCategory] = useState("카테고리");
  const [choiceCate, setChoiceCate] = useState(0); // 0은 전체 불러오기

  useEffect(() => {
    if (choiceCate === 0) {
      // 전체 방 불러오기
      dispatch(roomActions.getRoomDB());
      setCategory("카테고리");
    } else {
      // 카테고리별 방 불러오기
      dispatch(roomActions.categoryRoomDB(choiceCate));
    }
  }, [choiceCate]);

  useEffect(() => {
    if (possible === true) {
      dispatch(roomActions.PossibleRoomDB());
    } else {
      dispatch(roomActions.getRoomDB());
    }
  }, []);

  let roomList = useSelector((store) => store.room.list);
  const hotRoom = useSelector((state) => state.room.hotList);
  console.log(hotRoom);

  React.useEffect(() => {
    dispatch(roomActions.hotRoomDB());
    // dispatch(roomActions.getRoomDB())
  }, []);

  // 방 생성하기 함수
  function create() {
    const id = uuid();
    history.push(`/room/${id}`);
  }

  useEffect(() => {
    console.log('룸룸룸', roomList);
  }, [roomList]);

  return (
    <React.Fragment>
      <Wrap>
        <div className="header">
          <Header />
        </div>

        <EXRoomMaker onClick={create}>방생성하기</EXRoomMaker>

        <div className="logo">
          <svg
            width="130"
            height="42"
            viewBox="0 0 130 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M129.182 0.798613L0.267578 0.12207L-0.000104766 40.7085L128.914 41.385L129.182 0.798613Z"
              fill="#7179F0"
            />
          </svg>
          <svg
            width="133"
            height="30"
            viewBox="0 0 133 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "35px" }}
          >
            <path
              d="M22.5925 3.28134L20.4541 28.2734C18.9289 28.5274 16.4665 28.5777 14.798 28.4393C14.798 28.4393 14.798 28.4393 14.7985 28.3775C13.6626 24.8741 12.3194 20.2701 11.5484 16.3148C9.24701 23.7538 8.63081 28.0256 8.41301 28.3476C6.8878 28.6016 4.42689 28.4595 2.54344 28.2583L0.336043 3.11535C0.336043 3.11535 3.89418 2.61654 6.13729 3.08062C6.13729 3.08062 7.38311 11.5052 7.35637 15.1338C8.25626 10.9939 8.93026 8.27554 9.00188 7.95287C10.8199 7.63837 12.7754 7.45508 14.8714 8.04218C15.1504 9.85782 15.2092 11.2807 15.8368 14.8505C16.1564 11.1614 16.9344 3.7153 16.9388 3.13117C18.7563 2.87852 20.9258 2.88869 22.5237 3.21917C22.5237 3.2123 22.593 3.21262 22.5925 3.28134Z"
              fill="#7179F0"
            />
            <path
              d="M31.0865 3.20472C31.0079 4.49591 30.7162 13.8859 30.7048 15.4384C30.6238 17.0594 30.4731 27.0958 30.4636 28.3873C30.4632 28.4491 30.3936 28.5175 30.3168 28.5172C28.6487 28.8322 26.7684 28.7616 24.6746 28.4907C24.6055 28.4904 24.5292 28.4282 24.5302 28.2977C24.6079 27.1301 24.8066 19.945 24.8199 18.1314C24.8333 16.3178 25.2112 4.59927 25.2217 3.17722C25.2226 3.0467 25.2922 2.98519 25.369 2.98555C27.1816 2.86352 29.0627 2.81051 30.8648 3.07314C31.0107 3.07383 31.087 3.13602 31.0865 3.20472Z"
              fill="#7179F0"
            />
            <path
              d="M49.1595 3.29412C49.2956 4.65531 49.2063 6.33842 48.9103 7.88999C48.9098 7.95183 48.7632 8.01986 48.694 8.01954C48.1172 8.01684 46.2334 7.94618 44.4184 7.93769C44.3268 10.9813 44.2231 14.609 44.2164 15.516C44.1353 17.1373 43.9835 27.2995 43.9749 28.4676C43.9744 28.5295 43.9047 28.5979 43.8278 28.5975C42.1584 28.6516 40.1276 28.7108 38.0982 28.5707C38.029 28.5704 38.0294 28.5085 38.03 28.4398C38.1073 27.3407 38.3073 20.0235 38.3207 18.2095C38.3293 17.0414 38.4362 11.9295 38.5422 7.97888C36.658 7.97007 34.3354 7.95919 33.6894 7.95617C33.5433 7.95549 33.4745 7.89332 33.4755 7.76277C33.0457 6.5926 33.2114 3.94097 33.4401 3.16557C33.4406 3.10372 33.5872 3.03569 33.7333 3.03638C34.8946 3.04181 41.5629 3.01118 41.5629 3.01118C41.5629 3.01118 47.292 3.09984 49.0296 3.17669C49.0835 3.1632 49.16 3.22541 49.1595 3.29412Z"
              fill="#7179F0"
            />
            <path
              d="M68.1015 3.39289C68.092 4.68471 67.8075 14.0769 67.796 15.6298C67.7148 17.2511 67.5639 27.2898 67.5544 28.5816C67.554 28.6435 67.4842 28.7119 67.4073 28.7115C65.736 29.0267 63.8521 28.956 61.7544 28.6851C61.6852 28.6847 61.6087 28.6225 61.6097 28.492C61.6875 27.3242 61.8857 20.2679 61.8995 18.3921C60.9612 18.3877 59.8695 18.3207 59.2153 18.3795C58.9231 18.3781 58.1309 18.3744 57.2622 18.3085C57.236 21.8679 57.1248 27.5708 57.1176 28.5397C57.1172 28.6015 57.0474 28.6699 56.9705 28.6695C55.2992 28.9847 53.4154 28.914 51.3176 28.6431C51.2484 28.6427 51.172 28.5805 51.1729 28.45C51.2507 27.2822 51.4498 20.0954 51.4632 18.2814C51.4766 16.4673 51.8552 4.74614 51.8657 3.32377C51.8667 3.19321 51.9363 3.13169 52.0132 3.13205C53.8293 3.00999 55.7141 2.95699 57.5196 3.21969C57.6657 3.22037 57.7345 3.28252 57.734 3.35123C57.6576 4.31977 57.5396 9.8921 57.4456 13.2587C58.53 13.2638 59.5453 13.2686 59.5453 13.2686C59.5453 13.2686 60.7071 13.2122 62.0145 13.2183C62.1133 9.20573 62.2958 4.27963 62.3024 3.37261C62.3034 3.24205 62.3731 3.18054 62.45 3.1809C64.266 3.05884 66.1508 3.00583 67.9563 3.26853C68.1025 3.26234 68.1713 3.3245 68.1015 3.39289Z"
              fill="#7179F0"
            />
            <path
              d="M103.651 4.03075C103.706 5.84529 103.723 14.0715 103.707 16.2706C103.622 18.3456 103.418 26.2478 103.325 28.3159C103.323 28.577 103.176 28.7069 102.961 28.7678C101.513 28.9534 99.6973 28.9449 98.0986 28.745C97.8832 28.744 97.7384 28.5509 97.7399 28.3516C97.7523 26.668 97.8736 19.6107 97.9739 16.4362C97.0845 19.1534 96.4808 21.7415 96.1827 23.5543C96.1813 23.7468 96.0342 23.8767 95.8183 23.9444C93.9302 24.3891 92.2622 24.1889 90.6712 23.9821C90.4563 23.9193 90.2341 23.7877 90.2356 23.5884C90.0269 22.6802 89.4623 19.9562 88.4754 16.0687C88.3824 19.3051 88.3269 26.8232 88.315 28.4381C88.3136 28.6305 88.1665 28.7604 87.9506 28.8281C86.1336 29.012 83.6733 28.8081 82.8049 28.6735C82.6588 28.6728 82.5136 28.5415 82.515 28.3491C82.5952 26.8582 82.8699 19.8635 82.8833 18.0492C82.8961 16.3037 83.5504 5.81282 83.7119 3.73814C83.7129 3.60758 83.7831 3.47733 83.9292 3.47801C85.6688 3.35558 87.7776 3.23487 89.223 3.37221C89.4379 3.43506 89.66 3.56668 89.7278 3.76629C90.1582 4.86788 91.7201 9.01917 93.6259 15.5705C95.0316 11.6874 96.5911 6.77411 97.8444 3.73555C97.915 3.54345 98.0617 3.47542 98.2853 3.41461C99.8089 3.35989 101.84 3.36939 103.284 3.63043C103.515 3.63838 103.652 3.83146 103.651 4.03075Z"
              fill="#7179F0"
            />
            <path
              d="M121.689 18.2422C121.687 18.4346 121.47 18.6329 121.178 18.6934C119.723 18.8171 115.083 19.1802 111.533 18.7101C111.806 21.3019 112.44 24.026 114.178 24.0342C116.355 23.9825 116.735 21.4556 116.81 20.6107C116.88 20.4805 117.028 20.3506 117.174 20.3513C118.188 20.4179 118.986 20.6827 119.561 21.0084C121.507 22.0551 121.928 24.3865 120.685 26.0024C118.123 29.2956 114.211 28.9544 114.211 28.9544C104.206 28.7151 105.904 15.3785 105.904 15.3785C106.355 3.26605 114.544 3.5655 114.544 3.5655C114.544 3.5655 123.912 2.51676 121.689 18.2422ZM114.514 8.69156C112.775 8.81398 111.953 11.7237 111.644 14.0517C114.327 14.2566 116.643 14.0751 116.643 14.0751C116.815 11.6777 116.614 8.57083 114.514 8.69156Z"
              fill="#7179F0"
            />
            <path
              d="M126.662 26.1747C126.894 23.9087 132.033 23.1566 132.152 26.8462C132.152 26.8462 132.136 28.9209 129.097 28.9685C129.097 28.9753 126.421 28.7017 126.662 26.1747ZM127.2 2.09142C127.203 1.69985 127.497 1.31654 127.782 1.18734C128.437 0.867529 129.305 0.741069 130.103 0.744812C130.97 0.810705 131.834 1.1445 132.339 1.33922C132.553 1.47075 132.774 1.73285 132.772 1.98702C133.183 5.54755 132.207 19.2759 132.049 22.0574C132.046 22.3803 131.83 22.6404 131.537 22.7695C130.813 23.089 130.161 23.1547 129.508 23.1516C128.711 23.086 128.06 22.8837 127.631 22.8199C127.34 22.688 127.127 22.4259 127.13 22.1031C127.176 14.78 127.251 4.55108 127.2 2.09142Z"
              fill="#7179F0"
            />
          </svg>
        </div>

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
              margin: "auto 20px",
              position: "absolute",
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

        <MenuBar className="menulist">
          <div className="flex">
            {possible === true ? (
              <AllBtn
                onClick={() => {
                  setPossible(false);
                  setChoiceCate(0);
                  dispatch(roomActions.getRoomDB());
                }}
              >
                <RoomText>ALL</RoomText>
              </AllBtn>
            ) : (
              <AllBtn
                onClick={() => {
                  setPossible(false);
                  setChoiceCate(0);
                  dispatch(roomActions.getRoomDB());
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
                  dispatch(roomActions.PossibleRoomDB());
                }}
                style={{ background: "#7179F0", border: "none" }}
              >
                <RoomText style={{ color: "#FAFAFF" }}>참여 가능</RoomText>
              </PossibleBtn>
            ) : (
              <PossibleBtn
                onClick={() => {
                  setPossible(true);
                  dispatch(roomActions.PossibleRoomDB());
                }}
              >
                <RoomText>참여 가능</RoomText>
              </PossibleBtn>
            )}

            {/* <SpectatorBtn>
              <RoomText>관전 가능</RoomText>
            </SpectatorBtn> */}

            <Category>
              <div className="container">
                <DropWrap>
                  <DropBtn
                    onClick={() => setIsActive(!isActive)}
                    style={{ height: "40px" }}
                  >
                    {category === "" ? (
                      <CategoryDText>카테고리</CategoryDText>
                    ) : (
                      <CategoryDText>{category}</CategoryDText>
                    )}
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.9001 10.5498L16.0001 19.4498L7.1001 10.5498"
                          stroke="#8A8BA3"
                          stroke-width="2"
                          stroke-miterlimit="10"
                        />
                      </svg>
                    </div>
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
                        height="32"
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

                    <CategoryWrap
                      onClick={() => {
                        setCategory("운동");
                        setIsActive(!isActive);
                        setChoiceCate(2);
                      }}
                    >
                      <div>운동</div>
                      <Exercise fill="#8A8BA3" width="24px" />
                    </CategoryWrap>

                    <CategoryWrap
                      onClick={() => {
                        setCategory("스터디");
                        setIsActive(!isActive);
                        setChoiceCate(3);
                      }}
                    >
                      <div>스터디</div>
                      <Study fill="#8A8BA3" width="24px" />
                    </CategoryWrap>

                    <CategoryWrap
                      onClick={() => {
                        setCategory("상담");
                        setIsActive(!isActive);
                        setChoiceCate(4);
                      }}
                    >
                      <div>상담</div>
                      <Consulting fill="#8A8BA3" width="24px" />
                    </CategoryWrap>

                    <CategoryWrap
                      onClick={() => {
                        setCategory("문화");
                        setIsActive(!isActive);
                        setChoiceCate(5);
                      }}
                    >
                      <div>문화</div>
                      <div>
                        <Culture fill="#8A8BA3" width="24px" />
                      </div>
                    </CategoryWrap>

                    <CategoryWrap
                      onClick={() => {
                        setCategory("기타");
                        setIsActive(!isActive);
                        setChoiceCate(6);
                      }}
                    >
                      <div>기타</div>
                      <Other fill="#8A8BA3" width="24px" />
                    </CategoryWrap>
                  </div>
                </DropWrap>
              </div>
            </Category>
          </div>
          
          <Refresh
            style={{
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              margin: 'auto',
              marginRight: '0px',
              fill: '#8A8BA3',
            }}
            onClick={() => {
              dispatch(roomActions.getRoomDB());
              dispatch(roomActions.hotRoomDB());
            }}
          />
        </MenuBar>

        <RoomListContainer className="roomlist">
          {/* 방 만들기 카드 */}
          {localStorage.getItem("login-token") ? (
            <RoomCardContainer
              onClick={() => {
                setMRooms(true);
              }}
              style={{ backgroundColor: "#BCC0FF" }}
            >
              <Plus
                style={{
                  cursor: "pointer",
                  width: "64px",
                  height: "64px",
                  margin: "45 96",
                  fill: "#FFFFFF",
                }}
              />
            </RoomCardContainer>
          ) : (
            <RoomCardContainer
              onClick={() => {
                window.alert("로그인해야 방 만들수 있을껄?");
              }}
              style={{ backgroundColor: "#BCC0FF" }}
            >
              <Plus
                style={{
                  cursor: "pointer",
                  width: "64px",
                  height: "64px",
                  margin: "45 96",
                  fill: "#FFFFFF",
                }}
              />
            </RoomCardContainer>
          )}
          {MRooms && <MakeRoomModal setMRooms={setMRooms} create={create} />}

          {hotRoom
            ? hotRoom.map((data, index) => {
                return (
                  <div>
                    <HotRoomCard {...data} />
                  </div>
                );
              })
            : ""}

          {roomList
            ? roomList.map((data, index) => {
                return (
                  <div>
                    {data.isSecret === true ? (
                      <div onClick={()=>{setSecret(true)}}>
                        <RoomCard {...data} setPossible={possible} />
                      </div>
                    ) : (
                      <div>
                        <RoomCard {...data} setPossible={possible} />
                      </div>
                    )}

                  </div>
                );
              })
            : ""}
          {/* <TestRoom/> */}
          {secret && <SecretRoomModal setSecret={setSecret}/>}
        </RoomListContainer>

        <div className="morebtn">
          <Btn>더보기</Btn>
        </div>

        <div className="footer">
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
  .logo {
    grid-column: 1/13;
    margin: 0px auto;
    display: flex;
    align-items: center;
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
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .roomlist {
    grid-column: 1/13;
  }
  .morebtn {
    grid-column: 1/13;
    margin: auto;
  }
  .footer {
    grid-column: 1/13;
  }

  .flex {
    display: flex;
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
  font-size: 16px;
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
  &:hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    border: 0.5px solid #7b61ff;
  }
`;

const CategoryDText = styled.div`
  font-size: 16px;
  color: #8a8ba3;
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
  padding: 10px;
  align-items: center;
  cursor: pointer;
  div {
    font-size: 16px;
    color: #8a8ba3;
    &:hover {
      color: #7179f0;
      fill: #7179f0;
    }
  }
`;

//searchbar
const SearchBarWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  position: relative;
  align-items: center;
  margin: 0px auto 19px auto;
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
  height: 154px;
  border: none;
  border-radius: 4px;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
  position: relative;
`;

export default Main;
