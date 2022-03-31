import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Image } from '../elements/Index';
import styled from 'styled-components';

import TodayTime from '../components/Mypage/TodayTime';
import WeekTime from '../components/Mypage/WeekTime';
import MonthTime from '../components/Mypage/MonthTime';
import Header from '../components/Header/MHeader';
import Logo from '../components/Main/Logo';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

// badge
import lockBadge from '../assets/badge/lockBadge.svg';
import logo from '../assets/logo.jpeg';

const Mypage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);
  const badges = useSelector((store) => store.user.badges);
  const MasterBadge = useSelector((store) => store.user.MasterBadge);
  const myBadges = useSelector((store) => store.user.myBadges);
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

  useEffect(()=>{
    if(!user.origin){
      alert("로그인 후 이용 가능 합니다")
      history.replace('/main')
    }
  },[])

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

  const LockBadge = [
    {
      name: 'lock',
      desc: '이번주 뷰티 카테고리 100시간 이상',
    },
    {
      name: 'lock',
      desc: '이번주 운동 카테고리 100시간 이상',
    },
    {
      name: 'lock',
      desc: '이번주 상담 카테고리 100시간 이상',
    },
    {
      name: 'lock',
      desc: '이번주 기타 카테고리 100시간 이상',
    },
    {
      name: 'lock',
      desc: '이번주 문화 카테고리 100시간 이상',
    },
    {
      name: 'lock',
      desc: '이번주 공부 카테고리 100시간 이상',
    },
  ];

  const wholeBadges = [
    {
      id: 7,
      name: 'firstCome',
      desc: '선착순 100명!',
      desc1: '선착순 100명에게만 지급되는 뱃지!',
      imageUrl:
        'https://square-with-me-bucket.s3.ap-northeast-2.amazonaws.com/badges/firstCome.svg',
    },
    {
      id: 1,
      name: 'beauty',
      desc: '이번주 뷰티 카테고리 1시간 달성시 지급',
      desc1: '이번주 뷰티 카테고리 1시간 달성!',
      imageUrl:
        'https://square-with-me-bucket.s3.ap-northeast-2.amazonaws.com/badges/beauty.svg',
    },
    {
      id: 2,
      name: 'sports',
      desc: '이번주 운동 카테고리 1시간 달성시 지급',
      desc1: '이번주 운동 카테고리 1시간 달성!',
      imageUrl:
        'https://square-with-me-bucket.s3.ap-northeast-2.amazonaws.com/badges/sports.svg',
    },
    {
      id: 3,
      name: 'study',
      desc: '이번주 공부 카테고리 1시간 달성시 지급',
      desc1: '이번주 공부 카테고리 1시간 달성!',
      imageUrl:
        'https://square-with-me-bucket.s3.ap-northeast-2.amazonaws.com/badges/study.svg',
    },
    {
      id: 4,
      name: 'counseling',
      desc: '이번주 상담 카테고리 1시간 달성시 지급',
      desc1: '이번주 상담 카테고리 1시간 달성!',
      imageUrl:
        'https://square-with-me-bucket.s3.ap-northeast-2.amazonaws.com/badges/counseling.svg',
    },
    {
      id: 5,
      name: 'culture',
      desc: '이번주 문화 카테고리 1시간 달성시 지급',
      desc1: '이번주 문화 카테고리 1시간 달성!',
      imageUrl:
        'https://square-with-me-bucket.s3.ap-northeast-2.amazonaws.com/badges/culture.svg',
    },
    {
      id: 6,
      name: 'etc',
      desc: '이번주 기타 카테고리 1시간 달성시 지급',
      desc1: '이번주 기타 카테고리 1시간 달성!',
      imageUrl:
        'https://square-with-me-bucket.s3.ap-northeast-2.amazonaws.com/badges/etc.svg',
    },

    {
      id: 8,
      name: 'reviewer',
      desc: '버그나 리뷰를 제보해주세요',
      desc1: '버그나 리뷰 제보 뱃지',
      imageUrl:
        'https://square-with-me-bucket.s3.ap-northeast-2.amazonaws.com/badges/bug.svg',
    },
  ];
  return (
    <Root>
      <Container>
        <div className="header">
          <div onClick={() => history.replace('/main')} className="logo">
            <Logo />
          </div>
          <div className="side">
            <Header />
          </div>
        </div>
        <div id="start">
          <p className="label">마이 페이지</p>
          <div id="startBox" className="boxStyle">
            <ProfileContainer>
              <div className="imageBox">
                <Image
                  shape="circle"
                  width="110px"
                  height="110px"
                  src={user.profileImg ? user.profileImg : logo}
                  _onClick={(e) => {
                    onClickImage(e);
                  }}
                />
                <div className="filebox">
                  <input type="file" id="ex_file" onChange={saveImage} />
                </div>
                <div className="badgeImg">
                  <Image
                    width="40px"
                    height="40px"
                    margin="0px"
                    src={user.MasterBadge ? user.MasterBadge.imageUrl : ''}
                  />
                </div>
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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.72998 20.28L4.05998 15.68L15.06 4.85L19.33 9.11L8.32998 20L3.72998 20.28ZM5.99998 16.58L5.87998 18.12L7.44998 18L16.52 9.1L15.09 7.66L5.99998 16.58Z"
                        fill="#33344B"
                      />
                      <path
                        d="M18.65 9.81L17.24 8.4L19.02 6.62L17.59 5.17L15.8 6.96L14.38 5.55L17.59 2.34L21.84 6.62L18.65 9.81Z"
                        fill="#33344B"
                      />
                    </svg>
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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.72998 20.28L4.05998 15.68L15.06 4.85L19.33 9.11L8.32998 20L3.72998 20.28ZM5.99998 16.58L5.87998 18.12L7.44998 18L16.52 9.1L15.09 7.66L5.99998 16.58Z"
                        fill="#33344B"
                      />
                      <path
                        d="M18.65 9.81L17.24 8.4L19.02 6.62L17.59 5.17L15.8 6.96L14.38 5.55L17.59 2.34L21.84 6.62L18.65 9.81Z"
                        fill="#33344B"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </ProfileContainer>

            {editbadge === true ? (
              <BadgeContainer>
                <div className="badgeBox">
                  {myBadges &&
                    wholeBadges.map((badge) =>
                      myBadges.includes(badge.id) ? (
                        <label className="badge  tooltip" key={badge.id}>
                          <input
                            type="radio"
                            name="badge"
                            onChange={(e) => setBadgeId(e.target.value)}
                            value={badge.id}
                          />
                          <img src={badge.imageUrl} />
                          <span className="tooltiptext">{badge.desc1}</span>
                        </label>
                      ) : (
                        <label className="badge" key={badge.id}>
                          <img src={badge.imageUrl} className="closeBadge" />
                        </label>
                      )
                    )}
                </div>
                <button
                  onClick={() => {
                    dispatch(userActions.editBadgeDB(userId, badgeId));
                    setEditbadge(false);
                  }}
                >
                  설정완료
                </button>
              </BadgeContainer>
            ) : (
              <BadgeContainer>
                <div className="badgeBox">
                  {myBadges &&
                    wholeBadges.map((badge) =>
                      myBadges.includes(badge.id) ? (
                        <label className="badge tooltip" key={badge.id}>
                          <img src={badge.imageUrl} />
                          <span className="tooltiptext">{badge.desc1}</span>
                        </label>
                      ) : (
                        <label className="badge tooltip " key={badge.id}>
                          <img src={badge.imageUrl} className="closeBadge" />
                          <span className="tooltiptext">{badge.desc}</span>
                        </label>
                      )
                    )}
                </div>
                <button
                  onClick={() => {
                    setEditbadge(true);
                  }}
                >
                  뱃지 설정
                </button>
              </BadgeContainer>
            )}
          </div>
        </div>
        <div id="middle">
          <div className="middleBottomBoxWrap">
            <Text>더 많은 뱃지를 획득해보세요!</Text>
            <div id="middleTopBox" className="boxStyle">
              <BadgeContainer2>
                <div className="badgeBox">
                  {LockBadge.map((badge, idx) => (
                    <div className="badge tooltip" key={idx}>
                      <img src={lockBadge} />
                      <span className="tooltiptext">{badge.desc}</span>
                    </div>
                  ))}
                </div>
              </BadgeContainer2>
            </div>
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
  max-width: 100vw;
  min-width: 390px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  box-sizing: border-box;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  z-index: -100;
`;

const Container = styled.div`
  max-width: 1110px;
  min-width: 390px;
  margin: auto;
  display: grid;
  column-gap: 30px;
  row-gap: 50px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(12, 1fr);
  font-family: 'Noto Sans KR', sans-serif;

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-column: 1 / 5;
    p.label {
      font-size: 24px;
      font-weight: 700;
      color: #41414f;
      margin-bottom: 20px;
    }
    #startBox {
      height: 63vh;
      min-height: 500px;
      padding: 26px 26px 48px 26px;
    }
  }
  #middle {
    width: 255px;
    display: flex;
    flex-direction: column;
    grid-column: 5 / 8;
    justify-content: space-between;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 25px;
      color: #33344b;
      margin-bottom: 10px;
    }
    #middleTopBox {
      height: 20vh;
      min-height: 150px;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    grid-column: 8 / 13;
    p {
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
      .endBottomBoxWrap {
        margin-top: 40px;
      }
    }
  }
  // 모바일
  @media screen and (max-width: 700px) {
    min-height: 100vh;
    grid-template-columns: repeat(4, 1fr);
    margin: auto;
    width: 90%;
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
        width: 55%;
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
        font-weight: 700;
      }
      input {
        width: 100%;
        height: 30px;
        background-color: transparent;
        border-radius: 4px;
        font-size: 18px;
        line-height: 30px;
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
        width: 100%;
        font-size: 14px;
        line-height: 24.52px;
        font-weight: 400;
        white-space: pre-line;
        word-break: keep-all;
        word-wrap: break-word;
      }
      input {
        width: 100%;
        height: 30px;
        background-color: transparent;
        border-radius: 4px;
        font-size: 14px;
        line-height: 24.52px;
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
    grid-row-gap: 10px;
    place-items: center;
    /* overflow-y: scroll; */
    margin: 20px 0;

    label {
      border-radius: 50%;
      cursor: pointer;
    }
    input[type='radio'] {
      display: none;
    }
    img {
      border-radius: 50%;
    }
    label.badge img {
      transition: all 0.5s;
    }

    input[type='radio']:checked + img {
      box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px,
        rgba(0, 0, 0, 0.23) 0px 3px 3px;
    }

    input[type='radio']:hover + img {
      box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px,
        rgba(0, 0, 0, 0.23) 0px 3px 3px;
    }
  }
  .badge {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    position: relative;
  }
  .closeBadge {
    filter: blur(4px);
  }
  .tooltip {
    position: relative;

    .tooltiptext {
      visibility: hidden;
      width: 150px;
      background-color: rgba(0, 0, 0, 0.75);
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      top: 120%;
      left: 25%;
      margin-left: -60px;
      word-break: keep-all;

      &::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #555 transparent;
      }
    }
    &:hover .tooltiptext {
      visibility: visible;
    }
  }
  label.badge:hover span {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px,
      rgba(0, 0, 0, 0.23) 0px 3px 3px;
    /* visibility: visible; */
  }

  button {
    width: 100px;
    height: 51px;
    padding: 12px 14px;
    background-color: #bcc0ff;
    border-radius: 4px;
    border: none;
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-row-gap: 20px;
    place-items: center;
    /* overflow-y: scroll;
    position: relative;
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
    &::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    } */

    .tooltip {
      position: relative;

      .tooltiptext {
        visibility: hidden;
        width: 150px;
        background-color: rgba(0, 0, 0, 0.75);
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        top: 120%;
        left: 25%;
        margin-left: -60px;
        word-break: keep-all;

        &::after {
          content: '';
          position: absolute;
          bottom: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent #555 transparent;
        }
      }

      &:hover .tooltiptext {
        visibility: visible;
      }
    }
  }
  .badge {
    min-width: 50px;
    min-height: 50px;
    background: #ffffff;
    border: 1px solid #8a8ba3;
    display: grid;
    place-items: center;
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
