import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../styles/Drop.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//pages/components
import Banner from "../components/Main/Banner";
import RoomCard from "../components/Main/RoomCard";
import FooterTest from "../components/Main/Footer";
import Header from "../components/Header/Header";
import Logo from "../components/Main/Logo";
import MenuBar from "../components/Main/MenuBar";
import SecretRoomModal from "../components/Modal/SecretRoomModal";
import SearchBar from "../components/Main/SearchBar";
import MakeRoomCard from "../components/Main/MakeRoomCard";

//redux
import { actionCreators as roomActions } from "../redux/modules/room";

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let roomList = useSelector((store) => store.room.list);
  const hotRoom = useSelector((state) => state.room.hotList);

  const [MRooms, setMRooms] = useState(false);
  //검색
  const [search, setSearch] = useState("");
  //참여가능한 방
  const [possible, setPossible] = useState(false);
  //비밀 방
  const [secret, setSecret] = useState(false);
  const [hotSecret, setHotSecret] = useState(false);
  const userId = useSelector((store) => store.user.user.id);
  //room
  const [category, setCategory] = useState("카테고리");
  const [choiceCate, setChoiceCate] = useState(0); // 0은 전체 불러오기

  // 페이지 나누기
  const [pageNum, setPageNum] = useState(1);
  const [isSeacrh, setIsSearch] = useState(false);

  // 카테고리 선택하기
  useEffect(() => {
    if (choiceCate === 0 && possible === false) {
      // 전체 방 불러오기
      dispatch(roomActions.emptyRoom());
      dispatch(roomActions.getRoomDB(1));
      setPageNum(2);
      setIsSearch(false);
      setCategory("카테고리");
    } else {
      // 카테고리별 방 불러오기
      dispatch(roomActions.emptyRoom());
      dispatch(roomActions.categoryRoomDB(choiceCate, 1));
      setPageNum(2);
      setIsSearch(false);
    }
  }, [choiceCate]);

  // 공개방 참가하기
  const goRoom = (roomId) => {
    dispatch(roomActions.enteringRoomDB(roomId, userId));
  };

  //비밀방 모달
  const [secretRoom, setSecretRoom] = useState({});

  const morePage = () => {
    if (isSeacrh === true) {
      dispatch(roomActions.searchRoomDB(search, pageNum));
      setPageNum(pageNum + 1);
    } else if (possible === true) {
      dispatch(roomActions.possibleRoomDB(pageNum));
      setPageNum(pageNum + 1);
    } else {
      if (choiceCate === 0) {
        dispatch(roomActions.getRoomDB(pageNum));
        setPageNum(pageNum + 1);
      } else {
        dispatch(roomActions.categoryRoomDB(choiceCate, pageNum));
        setPageNum(pageNum + 1);
      }
    }
  };

  return (
    <Back>
      <Wrap>
        <div className="header">
          <Header />
        </div>

        <div className="logo" onClick={() => history.replace("/main")}>
          <Logo style={{ margin: "auto" }} />
        </div>
        <div className="searchbar">
          <SearchBar
            search={search}
            setSearch={setSearch}
            setIsSearch={setIsSearch}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
        </div>

        <div className="banner">
          <Banner />
        </div>

        <div className="menuList">
          <MenuBar
            possible={possible}
            setPossible={setPossible}
            setChoiceCate={setChoiceCate}
            category={category}
            setCategory={setCategory}
            setPageNum={setPageNum}
            setIsSearch={setIsSearch}
          />
        </div>

        <RoomListContainer className="roomlist">
          <div>
            <MakeRoomCard setMRooms={setMRooms} MRooms={MRooms} />
          </div>
          {roomList
            ? roomList.map((data) => {
                return (
                  <div key={data.id}>
                    {data.isSecret === true ? (
                      <div
                        onClick={() => {
                          setSecret(true);
                          setSecretRoom(data);
                        }}
                      >
                        <RoomCard {...data} setPossible={possible} />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          goRoom(data.id);
                        }}
                      >
                        <RoomCard {...data} setPossible={possible} />
                      </div>
                    )}
                  </div>
                );
              })
            : ""}
          {secret === true ? (
            <SecretRoomModal setSecret={setSecret} data={secretRoom} />
          ) : null}
        </RoomListContainer>

        <div className="morebtn" onClick={() => morePage()}>
          <Btn>더보기</Btn>
        </div>

        <div className="footer">
          <FooterTest />
        </div>
      </Wrap>
    </Back>
  );
};

const Back = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  min-width: 390px;
  background-color: #f7f7f7;
  background-size: initial;
  background-size: 100vw;
  background-repeat: repeat-y;
  background-image: url("${(props) => props.src}");
  z-index: -100;
  /* background: linear-gradient(to top, black 51%, #fff 30%); */
`;
//share
const Wrap = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  max-width: 1110px;
  min-width: 390px;
  margin: auto;
  grid-gap: 30px;
  margin: auto;
  position: relative;
  .header {
    grid-column: 12/13;
    display: flex;
    justify-content: end;
    @media screen and (max-width: 1110px) {
      margin: 0px 12px;
    }
  }
  .logo {
    grid-column: 1/13;
    margin: 0px auto;
    display: flex;
    align-items: center;
  }
  .searchbar {
    grid-column: 1/13;
    width: 524px;
    margin: auto;
    @media screen and (max-width: 550px) {
      grid-column: 1/13;
      width: 95%;
      margin: auto;
    }
  }
  .banner {
    grid-column: 1/13;
    width: 100%;
    margin: auto;
    @media screen and (max-width: 1110px) {
      width: 97%;
      margin: auto;
    }
  }
  .hotroomlist {
    grid-column: 1/13;
  }
  .menuList {
    grid-column: 1/13;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media screen and (max-width: 1110px) {
      width: 97%;
      margin: auto;
    }
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

const Btn = styled.button`
  padding: 12px 14px;
  width: 78px;
  height: 51px;
  border: none;
  border-radius: 4px;
  background-color: #bcc0ff;
  font-size: 16px;
  transition: all 0.3s;
  color: #fff;
  font-weight: 700;

  :hover {
    background-color: #7179f0;
    color: #fff;
    box-shadow: 0 1px 5px rgb(113, 121, 240);
  }
  @media screen and (max-width: 550px) {
    font-size: 13px;
  }
`;

//room
const RoomListContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  place-items: center;
  position: relative;
  @media screen and (min-width: 1110px) {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
  }
  @media screen and (min-width: 813px) and (max-width: 1110px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
  @media screen and (min-width: 550px) and (max-width: 812px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
`;

export default Main;
