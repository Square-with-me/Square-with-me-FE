import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import '../styles/Drop.css';

//pages/components
import Banner from '../components/Main/Banner';
import RoomCard from '../components/Main/RoomCard';
import FooterTest from '../components/Main/Footer';
import Header from '../components/Header/Header';
import Logo from '../components/Main/Logo';
import MenuBar from '../components/Main/MenuBar';
import HotRoomCard from '../components/Main/HotRoomCard';
import SecretRoomModal from '../components/Modal/SecretRoomModal';
import SearchBar from '../components/Main/SearchBar';
import MakeRoomCard from '../components/Main/MakeRoomCard';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as roomActions } from '../redux/modules/room';
import { actionCreators as userActions } from '../redux/modules/user';


const Main = () => {
  const dispatch = useDispatch();

  const [MRooms, setMRooms] = useState(false);
  //검색
  const [search, setSearch] = useState('');
  //참여가능한 방
  const [possible, setPossible] = useState(false);
  //비밀 방
  const [secret, setSecret] = useState(false);
  const userId = useSelector((store) => store.user.user.id);

  //room
  const [category, setCategory] = useState('카테고리');
  const [choiceCate, setChoiceCate] = useState(0); // 0은 전체 불러오기

  // 로그인 체크
  useEffect(() => {
    dispatch(userActions.logInCheckDB());
  }, []);

  // 카테고리 선택하기ㄴ
  useEffect(() => {
    if (choiceCate === 0) {
      // 전체 방 불러오기
      dispatch(roomActions.getRoomDB());
      setCategory('카테고리');
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

  // 공개방 참가하기
  const goRoom = (roomId) => {
    dispatch(roomActions.enteringRoomDB(roomId, userId));
  };

  let roomList = useSelector((store) => store.room.list);
  const hotRoom = useSelector((state) => state.room.hotList);
  console.log(hotRoom);

  React.useEffect(() => {
    dispatch(roomActions.hotRoomDB());
    // dispatch(roomActions.getRoomDB())
  }, []);

  const [startIndex, setStartIndex] = useState(8);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    if (roomList === undefined) return;
    setNewList(roomList.slice(0, 8));
  }, [roomList]);

  const morePage = () => {
    if (roomList.length >= startIndex + 8) {
      setNewList((list) => [
        ...list,
        ...roomList.slice(startIndex, startIndex + 8),
      ]);
      setStartIndex(startIndex + 8);
    } else {
      setNewList((list) => [
        ...list,
        ...roomList.slice(startIndex, roomList.length),
      ]);
      setStartIndex(roomList.length);
    }

    console.log(startIndex);
  };

  return (
    <React.Fragment>
      <Wrap>
        <div className="header">
          <Header />
        </div>

        <div className="logo">
        <Logo style={{margin:"auto"}}/>
        </div>

        <div className="searchbar">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="banner">
          <Banner />
        </div>

        <div  className="menulist">
          <MenuBar possible={possible} setPossible={setPossible} setChoiceCate={setChoiceCate} category={category} setCategory={setCategory}/>
        </div>

        <RoomListContainer className="roomlist">
          <div>
            <MakeRoomCard setMRooms={setMRooms} MRooms={MRooms}/>
          </div>

          {hotRoom
            ? hotRoom.map((data, index) => {
                return (
                  <div>
                    <HotRoomCard {...data} />
                  </div>
                );
              })
            : ''}

          {newList
            ? newList.map((data, index) => {
                return (
                  <div>
                    {data.isSecret === true ? (
                      <div
                        onClick={() => {
                          setSecret(true);
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
            : ''}
          {/* <TestRoom/> */}
          {secret && <SecretRoomModal setSecret={setSecret} />}
        </RoomListContainer>

        <div className="morebtn" onClick={() => morePage()}>
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
export default Main;
