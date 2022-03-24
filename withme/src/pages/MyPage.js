/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Image } from '../elements/Index';
import styled from 'styled-components';
import { BiPencil } from 'react-icons/bi';

import TodayTime from '../components/Mypage/TodayTime';
import WeekTime from '../components/Mypage/WeekTime';
import MonthTime from '../components/Mypage/MonthTime';
import MHeader from '../components/Header/MHeader';
import Logo from '../components/Main/Logo';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

// badge
import lockBadge from '../assets/badge/lockBadge.svg';
import userIcon from '../assets/inRoom/userIcon.svg';

const Mypage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);
  const badges = useSelector((store) => store.user.badges);
  useEffect(() => {
    dispatch(userActions.getBadgeDB(userId));
  }, []);

  const [isEditNick, setIsEditNick] = useState(false); // 닉네임 수정 상태 체크
  const [isEditStatus, setIsEditStatus] = useState(false); // 상태메시지 수정 상태 체크

  const [editNick, setEditnick] = useState(''); // 수정한 닉네임 저장
  const [editStatus, setEditStatus] = useState(''); // 수정한 상태메지시 저장

  const userId = props.match.params.id;

  const month = useSelector((store) => store.user.month); // 한달 데이터
  const week = useSelector((store) => store.user.week);

  const [editbadge, setEditbadge] = useState(false);
  const [badgeId, setBadgeId] = useState(0);

  useEffect(() => {
    dispatch(userActions.timeGetDB(userId));
  }, []);

  // 유저 닉네임 수정
  const editNickname = () => {
    const nicknameText = document.getElementById('nickname');
    const inputNickname = document.getElementById('inputNickname');

    if (!isEditNick) {
      // 수정시작
      setIsEditNick(true);
      setEditnick(user.nickname);
      nicknameText.classList.add('hidden');
      inputNickname.classList.remove('hidden');
    } else {
      // 수정 끝
      nicknameText.classList.remove('hidden');
      inputNickname.classList.add('hidden');
      dispatch(userActions.editNickDB(user.id, editNick));
      setIsEditNick(false);
    }
  };

  // 상태메시지 수정
  const editStatusMsg = () => {
    const statusText = document.getElementById('statusText');
    const inputStatus = document.getElementById('inputStatus');

    if (!isEditStatus) {
      // 수정 시작
      setIsEditStatus(true);
      setEditStatus(user.statusMsg);
      statusText.classList.add('hidden');
      inputStatus.classList.remove('hidden');
    } else {
      // 수정 끝
      statusText.classList.remove('hidden');
      inputStatus.classList.add('hidden');
      dispatch(userActions.editStatusDB(user.id, editStatus));
      setIsEditStatus(false);
    }
  };

  // 프로필 사진 수정
  const saveImage = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('image', img);
    dispatch(userActions.getImageUrlDB(userId, formData));
  };

  // 프로필 이미지 클릭시
  const onClickImage = () => {
    const fileUpload = document.getElementById('ex_file');
    fileUpload.click();
  };

  return (
    <Root>
      <Container>
        <div className="header">
          <div onClick={() => history.replace('/main')} className="logo">
            <Logo />
          </div>
          <div className="side">
            <MHeader />
          </div>
        </div>
        <div id="start">
          <p className="label">My Page</p>
          <div id="startBox" className="boxStyle">
            <ProfileContainer>
              <div className="imageBox">
                <Image
                  shape="circle"
                  width="110px"
                  height="110px"
                  src={user.profileImg ? user.profileImg : userIcon}
                  _onClick={(e) => {
                    onClickImage(e);
                  }}
                />
                <div className="filebox">
                  <input type="file" id="ex_file" onChange={saveImage} />
                </div>
                {user.MasterBadge 
                ?<div className="badgeImg"><Image src={user.MasterBadge.imageUrl}/></div>
                :<div className="badgeImg"></div>}
              </div>
              <div className="textBox">
                <div className="nameBox">
                  <div id="nickname"> {user ? user.nickname : ''}</div>
                  <input
                    id="inputNickname"
                    className="hidden"
                    type="text"
                    defaultValue={user ? user.nickname : ''}
                    onChange={(e) => {
                      setEditnick(e.target.value);
                    }}
                  />
                  <button onClick={editNickname}>
                    <BiPencil size={20} />
                  </button>
                </div>
                <div className="statusBox">
                  <div id="statusText">{user ? user.statusMsg : ''}</div>
                  <input
                    id="inputStatus"
                    className="hidden"
                    defaultValue={user.statusMsg}
                    onChange={(e) => {
                      setEditStatus(e.target.value);
                    }}
                  ></input>
                  <button onClick={editStatusMsg}>
                    <BiPencil size={20} />
                  </button>
                </div>
              </div>
            </ProfileContainer>
            {editbadge === true ? (
              <BadgeContainer>
                <div className="badgeBox">
                  {badges &&
                    badges.map((b) => {
                      return (
                        <label className="badge" key={b.id}>
                          <input
                            type="radio"
                            name="badge"
                            onChange={(e) => setBadgeId(e.target.value)}
                            value={b.UserBadge.badgeId}
                          />
                          <img src={b.imageUrl} />
                        </label>
                      );
                    })}
                </div>
                <button
                  onClick={() => {
                    dispatch(userActions.editBadgeDB(userId, badgeId));
                    setEditbadge(false);
                  }}
                >
                  수정완료
                </button>
              </BadgeContainer>
            ) : (
              <BadgeContainer>
                <div className="badgeBox">
                  {badges &&
                    badges.map((b) => {
                      return (
                        <div className="badge" key={b.id}>
                          <img src={b.imageUrl} />
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={() => {
                    setEditbadge(true);
                  }}
                >
                  수정하기
                </button>
              </BadgeContainer>
            )}
          </div>
        </div>
        <div id="middle">
          <Text>더 많은 뱃지를 획득해보세요!</Text>
          <div id="middleTopBox" className="boxStyle">
            <BadgeContainer2>
              <div className="badgeBox">
                <div className="badge">
                  <img src={lockBadge} />
                </div>
                <div className="badge">
                  <img src={lockBadge} />
                </div>
                <div className="badge">
                  <img src={lockBadge} />
                </div>
                <div className="badge">
                  <img src={lockBadge} />
                </div>
                <div className="badge">
                  <img src={lockBadge} />
                </div>
                <div className="badge">
                  <img src={lockBadge} />
                </div>
              </div>
            </BadgeContainer2>
          </div>

          <div className="middleBottomBoxWrap">
            <Text>오늘의 참여 기록</Text>
            <div id="middleBottomBox" className="boxStyle">
              <TodayTimeBox>
                <div className="chart">
                  <TodayTime />
                </div>
              </TodayTimeBox>
            </div>
          </div>
        </div>
        <div id="end">
          <div className="width100">
            <Text>이번 주 참여 기록</Text>
            <div id="endTopBox" className="boxStyle">
              <WeekTimeBox>{week ? <WeekTime week={week} /> : ''}</WeekTimeBox>
            </div>
          </div>
          <div className="width100 endBottomBoxWrap">
            <Text>이번 달 참여 기록</Text>
            <div id="endBottomBox" className="boxStyle">
              <MonthTimeBox>
                <MonthTime month={month} />
              </MonthTimeBox>
            </div>
          </div>
        </div>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  box-sizing: border-box;
`;

const Container = styled.div`
  max-width: 1110px;
  margin: auto;
  display: grid;
  column-gap: 30px;
  row-gap: 50px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(12, 1fr);
  .header {
    grid-column: 5/13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    @media screen and (max-width: 1115px) {
      grid-column: 1/8;
      display: flex;
      justify-content: center;
      justify-content: space-between;
    }
    .side {
      align-items: center;
      display: flex;
    }
  }
  #start {
    width: 350px;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-column: 1 / 5;
    p.label {
      font-size: 24px;
      font-weight: 700;
      font-family: 'Noto Sans KR', sans-serif;
      color: #41414f;
    }
    #startBox {
      height: 65vh;
      padding: 26px 26px 48px 26px;
    }
  }
  #middle {
    width: 255px;
    height: 70vh;
    display: flex;
    flex-direction: column;
    grid-column: 5 / 8;
    justify-content: space-between;
    p {
      font-family: 'Noto Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 25px;
      color: #33344b;
      margin-bottom: 10px;
    }
    #middleTopBox {
      height: 20vh;
      padding: 0px 30px;
    }
    #middleBottomBox {
      height: 40vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  #end {
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    grid-column: 8 / 13;
    p {
      font-family: 'Noto Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      color: #33344b;
      margin-bottom: 10px;
    }
    #endTopBox {
      height: 25vh;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
    }
    #endBottomBox {
      height: 35vh;
      padding: 24px 32px;
    }
  }
  .boxStyle {
    background-color: #f7f7f7;
    box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
  }
  .width100 {
    width: 100%;
  }
  // 테블릿
  @media screen and (max-width: 1115px) {
    min-height: 100vh;
    grid-template-columns: repeat(7, 1fr);
    padding: 50px 0;
    #end {
      grid-column: 1 / 8;
      height: 100%;
      p {
        margin-top: 10px;
      }
      /* .endBottomBoxWrap {
        margin-top: 40px;
      } */
    }
  }
  // 모바일
  @media screen and (max-width: 700px) {
    min-height: 100vh;
    grid-template-columns: repeat(4, 1fr);
    margin: auto;
    .header {
      grid-column: 1/5;
    }
    #start {
      grid-column: 1/5;
      width: 100%;
      #startBox {
        margin-top: 40px;
      }
    }
    #middle {
      grid-column: 1/5;
      width: 100%;
      /* margin-top: 30px; */
      #middleTopBox {
        height: 25vh;
      }
      .middleBottomBoxWrap {
        margin-top: 20px;
      }
      .chart {
        width: 75%;
        margin: auto;
      }
    }
    #end {
      grid-column: 1 / 5;
      width: 100%;
      margin-top: 20px;
    }
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  position: relative;
  .imageBox {
    width: 40%;
    height: fit-content;
    margin: auto 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    @media screen and (max-width: 700px) {
      width: fit-content;
      margin-right: 30px;
    }
    .filebox label {
      display: inline-block;
      /* padding: 0.5em 0.75em; */
      color: #999;
      font-size: inherit;
      line-height: normal;
      vertical-align: middle;
      background-color: #fdfdfd;
      cursor: pointer;
      border: 1px solid #ebebeb;
      border-bottom-color: #e2e2e2;
      border-radius: 0.25em;
    }
    .filebox input[type='file'] {
      /* 파일 필드 숨기기 */
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }
  .badgeImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    right: 0;
    bottom: 0;
    box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.25);
  }

  .hidden {
    display: none;
  }
  button {
    background-color: transparent;
    border: none;
  }
  .textBox {
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    gap: 10px;
    .nameBox {
      display: flex;
      flex-direction: row;
      #nickname {
        font-size: 18px;
        line-height: 30px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
      }
      input {
        width: 100%;
        height: 30px;
        background-color: transparent;
        border-radius: 4px;
        font-size: 18px;
        line-height: 30px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
        border: 2px solid #58596a;
        &:focus {
          background-color: transparent;
          outline-color: #7179f0;
          box-shadow: 0px 0px 6px rgba(113, 121, 240, 0.3);
        }
      }
    }
    .statusBox {
      display: flex;
      flex-direction: row;
      #statusText {
        font-size: 14px;
        line-height: 24.52px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 400;
        white-space: pre-line;
      }
      input {
        width: 100%;
        height: 30px;
        background-color: transparent;
        border-radius: 4px;
        font-size: 14px;
        line-height: 24.52px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 400;
        border: 2px solid #58596a;
        &:focus {
          background-color: transparent;
          outline-color: #7179f0;
          box-shadow: 0px 0px 6px rgba(113, 121, 240, 0.3);
        }
      }
    }
    button {
      display: flex;
      align-items: center;
      margin: 3px;
    }
  }
`;

const BadgeContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .badgeBox {
    height: 240px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-row-gap: 20px;
    place-items: center;
    overflow-y: scroll;
    margin-top: 20px;
    label {
      border-radius: 50%;
      cursor: pointer;
    }
    input[type='radio'] {
      display: none;
    }
    input[type='radio']:checked + img {
      border-radius: 50%;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px,
        rgba(0, 0, 0, 0.23) 0px 3px 3px;
    }
  }
  .badge {
    width: 64px;
    height: 64px;
  }

  label.badge {
    transition: all 0.5s;
  }

  label.badge:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px,
      rgba(0, 0, 0, 0.23) 0px 3px 3px;
  }

  button {
    width: 100px;
    height: 51px;
    padding: 12px 14px;
    background-color: #bcc0ff;
    border-radius: 4px;
    border: none;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    transition: all 0.3s;
    color: #fff;
    font-weight: 700;
    &:hover {
      background-color: #7179f0;
      color: #fff;
      box-shadow: 0 1px 5px rgb(113, 121, 240);
    }
  }
`;

const BadgeContainer2 = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  .badgeBox {
    height: 80%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-row-gap: 20px;
    place-items: center;
    overflow-y: scroll;
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
    &::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    }
  }
  .badge {
    min-width: 50px;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border: 1px solid #8a8ba3;
  }
`;

const TodayTimeBox = styled.div`
  padding: 32px 28px;
`;

const WeekTimeBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MonthTimeBox = styled.div`
  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  font-weight: 700;
  margin: 10px 0;
  margin-left: 5px;
  color: #575765;
`;

export default Mypage;
