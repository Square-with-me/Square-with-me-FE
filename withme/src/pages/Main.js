import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jsonData from '../shared/responseJ.json';
import styled from 'styled-components';
import '../styles/Drop.css';

//icons
import { RiArrowDropDownLine } from "react-icons/ri"
import { FaSearch } from "react-icons/fa";
import { FiLock, FiUnlock } from "react-icons/fi"
import{ BsFillPeopleFill } from "react-icons/bs"
import{ AiFillPlusSquare } from "react-icons/ai"


//pages/components
import MakeRoomModal from './MakeRoomModal';
import Banner from '../components/Banner';
import Room from '../components/Room';
import Footer from '../components/Footer';

//redux
import { actionCreators as roomActions } from '../redux/modules/room';
import { actionCreators as userActions } from '../redux/modules/user';

// 방 생성하기
import { v1 as uuid } from 'uuid';
import { history } from '../redux/configureStore';

const Main = () => {
  //드롭다운 부분
  const dropdownRef = useRef(null);

  //드롭여부 확인
  const [isActive, setIsActive] = useState(false);
  const Visible = (active) => {
    setIsActive(active);
  };

  //카테고리
  const [beauty, setBeauty] = useState('');
  const [exercise, setExercise] = useState('');
  const [study, setStudy] = useState('');
  const [consulting, setConsulting] = useState('');
  const [culture, setCulture] = useState('');
  const [etc, setEtc] = useState('');

  const dispatch = useDispatch();

  const [MRooms, setMRooms] = useState(false);
  //검색
  const [search, setSearch] = useState('');
  //참여가능한 방
  const [possible, setPossible] = useState(false);

  let roomList = useSelector((state) => state.room);
  // const hotRoom = useSelector((state)=>state.room.hotList)

  // React.useEffect(()=>{
  //   dispatch(roomActions.hotRoomDB())
  // },[])

  // React.useEffect(()=>{
  //   dispatch(userActions.NotMemberLoginCheckDB())
  // },[])

  const notUser_is_login = useSelector((state) => state.user.notUser_is_login);
  const notUser_is_local = localStorage.getItem('notUser_is_login')
    ? true
    : false;

  const [title, setTitle] = useState('');

  // 방 생성하기 함수
  function create() {
    const id = uuid();
    history.push(`/room/${id}`);
  }

  return (
    <React.Fragment>
      <Wrap>
        <EXRoomMaker onClick={create}>방생성하기</EXRoomMaker>

        <SearchBarWrap className="searchbar">
          <SearchBarInput
            placeholder="방 정보를 입력해주세요"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch
            style={{
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              margin: 'auto',
              position: 'absolute',
              marginRight: '20px',
              color: '#33344B',
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
            <AllBtn
              onClick={() => {
                setPossible(false);
              }}
            >
              {' '}
              <RoomText>ALL</RoomText>
            </AllBtn>
            <PossibleBtn
              onClick={() => {
                setPossible(true);
              }}
            >
              <RoomText>참여 가능</RoomText>
            </PossibleBtn>
            <SpectatorBtn>
              <RoomText>관전 가능</RoomText>
            </SpectatorBtn>
          </div>

          <div className="container">
            <div className="menu-container">
              <DropBtn
                onClick={() => setIsActive(!isActive)}
                className="menu-trigger"
              >
                <CategoryDText>카테고리</CategoryDText> <RiArrowDropDownLine />{' '}
              </DropBtn>
              <nav
                ref={dropdownRef}
                className={`menu ${isActive ? 'active' : 'inactive'}`}
              >
                <ul>
                  <li>
                    <a
                      onChange={(e) => setBeauty(e.target.value)}
                      onClick={() => {
                        isActive(false);
                      }}
                    >
                      뷰티
                    </a>
                  </li>
                  <li>
                    <a onChange={(e) => setExercise(e.target.value)}>운동</a>
                  </li>
                  <li>
                    <a onChange={(e) => setStudy(e.target.value)}>스터디</a>
                  </li>
                  <li>
                    <a onChange={(e) => setConsulting(e.target.value)}>상담</a>
                  </li>
                  <li>
                    <a onChange={(e) => setCulture(e.target.value)}>문화</a>
                  </li>
                  <li>
                    <a onChange={(e) => setEtc(e.target.value)}> 기타</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div></div>
        </MenuBar>

        <RoomListContainer className="roomlist">
          <RoomCard
            onClick={() => {
              setMRooms(true);
            }}>
              <AiFillPlusSquare
                style={{
                  cursor: 'pointer',
                  width: '70px',
                  height: '70px',
                  margin: '1.6rem 4.5rem', // 수정필요
                  color: '#aaf',
                }}
              />
          </RoomCard>
          {MRooms && <MakeRoomModal setMRooms={setMRooms} />}

          {possible === true
            ? jsonData.map((r, idx) => {
                return (
                  <>
                    {r.Participants.length === 4 ||
                    r.isSecrect === 'true' ? null : (
                      <RoomCard>
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
                          {r.isSecrect === 'true' ? (
                            <div>
                              <div>
                                <FiLock />
                              </div>
                              <div>
                                <BsFillPeopleFill
                                  style={{ marginRight: '5px' }}
                                />
                                <span>{r.Participants.length}/4</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div>
                                <FiUnlock />
                              </div>
                              <div>
                                <BsFillPeopleFill
                                  style={{ marginRight: '5px' }}
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
                      </RoomCard>
                    )}
                  </>
                );
              })
            : jsonData.map((r, idx) => {
                return (
                  <div style={{ backgroundColor: '#FFFFFF' }}>
                    {r.Participants.length === 4 ? (
                      <RoomCard style={{ backgroundColor: '#EDEBF1' }}>
                        <div>
                          <CategoryText>{r.category}</CategoryText>
                          <TitleText className="title">{r.title}</TitleText>
                        </div>
                        <div>
                          {r.isSecrect === 'true' ? (
                            <div>
                              <div>
                                <FiLock />
                              </div>
                              <div>
                                <BsFillPeopleFill
                                  style={{ marginRight: '5px' }}
                                />
                                <span>{r.Participants.length}/4</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div>
                                <FiUnlock />
                              </div>
                              <div>
                                <BsFillPeopleFill
                                  style={{ marginRight: '5px' }}
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
                      </RoomCard>
                    ) : (
                      <RoomCard>
                        <div>
                          <CategoryText>{r.category}</CategoryText>
                          <TitleText className="title">{r.title}</TitleText>
                        </div>
                        <div>
                          {r.isSecrect === 'true' ? (
                            <div>
                              <div>
                                <FiLock />
                              </div>
                              <div>
                                <BsFillPeopleFill
                                  style={{ marginRight: '5px' }}
                                />
                                <span>{r.Participants.length}/4</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div>
                                <FiUnlock />
                              </div>
                              <div>
                                <BsFillPeopleFill
                                  style={{ marginRight: '5px' }}
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
                      </RoomCard>
                    )}
                  </div>
                );
              })}
        </RoomListContainer>

        <div className="morebtn">
          <Btn>더보기</Btn>
        </div>

        <div className="footer">
          <Footer />
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
  background-color: #EDEBF1;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const AllBtn = styled.button`
  padding: 17px 14px;
  width: 56px;
  height: 48px;
  border: 1px solid #7179F0;
  border-radius: 4px;
  margin-right: 16px;
  background-color: #FFFFFF;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const PossibleBtn = styled.button`
  padding: 12px 14px;
  width: 90px;
  height: 48px;
  border: 1px solid #7179F0;
  border-radius: 4px;
  margin-right: 16px;
  background-color: #FFFFFF;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const SpectatorBtn = styled.button`
  padding: 12px 14px;
  width: 90px;
  height: 48px;
  border: 1px solid #7179F0;
  border-radius: 4px;
  margin-right: 16px;
  background-color: #FFFFFF;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const RoomText = styled.div`
  size: 2rem;
  color: #7179F0;
`;

const Btn = styled.button`
  padding: 12px 14px;
  width: 78px;
  height: 51px;
  border: 1px solid #8A8BA3;
  border-radius: 4px;
  background-color: #EDEBF1;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
`;

const CategoryDText = styled.div`
  size: 2rem;
  color: #7179F0;
`;

const MenuBar = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const DropBtn = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #7179F0;
  padding: 15px;
  border: none;
  width: 200px;
`;

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
  border: 1px solid #8A8BA3;
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

const RoomCard = styled.div`
  width: 255px;
  height: 175px;
  border: none;
  padding: 19px;
  border-radius: 4px;
  box-shadow: -6px -6px 8px #FFFFFF, 6px 6px 8px rgba(0, 0, 0, 0.15);
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
  background: #FFC9C9;
  border-radius: 4px;
  width: 45px;
  height: 18px;
  margin: 8px 0px;
  padding: 2px 4px;
  font-style: normal;
  font-weight: 700;
  font-size: 0.6rem;
  color: #33344B;
  display: flex;
  justify-content: center;
`;

const TitleText = styled.div`
  font-weight: 700;
  white-space: nowrap;
  display: block;
  font-size: 1.2rem;
  color: #33344B;
`;

const TagText = styled.span`
  background-color: #FAFAFF;
  color: #33344B;
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
