import React, { useEffect, useState } from 'react';

import { Image, Text, Input } from '../elements/Index';
import styled from 'styled-components';
import { BiPencil } from 'react-icons/bi';

import TodayTime from '../components/TodayTime';
import WeekTime from '../components/WeekTime';
import MonthTime from '../components/MonthTime';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as usereditActions } from '../redux/modules/userEdit';
import { actionCreators as userEditActions } from '../redux/modules/userEdit';

const Mypage = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.userEdit.user);

  const [isEditNick, setIsEditNick] = useState(false); // 닉네임 수정 상태 체크
  const [isEditStatus, setIsEditStatus] = useState(false); // 상태메시지 수정 상태 체크

  const [editNick, setEditnick] = useState(''); // 수정한 닉네임 저장
  const [editStatus, setEditStatus] = useState(''); // 수정한 상태메지시 저장

  const userId = props.match.params.id;

  const month = useSelector((store) => store.userEdit.month); // 한달 데이터
  const week = useSelector((store) => store.userEdit.week);

  useEffect(() => {
    dispatch(userEditActions.logInCheckDB());
    dispatch(userEditActions.timeGetDB(userId));
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
      dispatch(usereditActions.editNickDB(user.id, editNick));
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
      dispatch(usereditActions.editStatusDB(user.id, editStatus));
      setIsEditStatus(false);
    }
  };

  // 프로필 사진 수정
  const saveImage = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('image', img);
    console.log('이미지 시작');
    for (const keyValue of formData) console.log(keyValue);
    dispatch(usereditActions.getImageUrlDB(formData));
  };

  const onClickImage = () => {
    const fileUpload = document.getElementById('ex_file');
    fileUpload.click();
  };

  return (
    <Root>
      <Container>
        <div id="start">
          <p className="label">My Page</p>
          <div id="startBox" className="boxStyle">
            <ProfileContainer>
              <div className="imageBox">
                <Image
                  shape="circle"
                  width="110px"
                  height="110px"
                  src={
                    user.profileImg
                      ? user.profileImg
                      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADACAMAAACKwPcLAAAANlBMVEVmZmb////u8vpwb3D29vbY2NixsbGLi4vi4uKCgoLr6+vPz8+fn594eHjFxcWop6i7u7uVlZUD7tw7AAAEB0lEQVR4nO2ba5ujIAxG2wHBu+3//7MzjnhpV60kr5vBJ+fjri6cQhIE9nZLnC/pDrBRA3nUQB41kEcN5FEDedRAHjWQRw3kUQN51EAeNZBHDeRRA3nUQB41kEcN5FEDedRAHjXYxjxdld17bFa5pzmrnZMMmi6/v5F3zSlNnWJQZ+/dH8jqExo7weBZrve/p3zCm4MbNBu//zQO6LmENujsvsBPXHfYFrEGplp2tXK+6P+08K5ailXQvAQ1MHMCsm3x+ndFO0vkSAWkQTMJWLfSR+PsGQpAg3kEHhsdNI8TFHAGk0Dptx/yJVwBZzAGcbbbNzMm2wrVLsygCz1rPz3YhgdRSRVl0NiDApOCBZU2lEGYHBn62c+ADJ4hiA/FpwnhjFkjgQxCn3ay0BIffCFNYwzqUAeOPh/qAmSxjTEI32KHc7yxuEiAGDTDT+qOv+GGNxDpCGLQRQ7BNAiImgAxyI+WgpmhKOSAxhEGZpgSxecnZ4rhHcDqCGEwFAMb95JFlQSEgaMs1arY4N8CYVBRopKkvQbCIIupxyMeVREQBjY+kMdQjgyeNRAGQ1r5P2/9ixr0qAEPnEHKkZx+NiWV1z9V0dJfVaS/skt/dZ3+F84FvjLT/9JPf7flAjte6e86XmDnN/3d9wucgKR/CnWBk8ALnMamfyK+VEj0VsIFboZc4HbOLf0bUrcL3FL7UWh3BSK3lT6DNvDVXv97yhp7eRZr4D9MoRAJa7mWDNKgONT/Xwfg1VngquLx2svs0fmwvvC+e7zZ4eIBZuCXN33Lx8rXi3cvd7EB23W/oAzcYoq8l+OZxi089xexh8EYmHmOfArTenawkJmE2S/aX9K9MTtAAhphUEwriepQwTXzlAMoAAwmAXt486HIcQp8g/Eb/55HrHhMC1NgG0zfBG1caqlR4cw2GLNQ1N57z6TATKpcg7EQE+rTqMDc+WIaeOoI9NR0+wU8g3EHlCQwK7BCgWcQ5hD5MKkFzCOWQZhD9B3QMZFxUirLIOQhxi56wc9HHIMwjVk7oI4dzByDkjmHekIuYAwCw8AjcuE4kPRIYBjEHmBuMAwC/UyNbhB/iLxOzawJdAOHGYJxEIhFkWPAbHgm/BTU18kGBWBBMBCmY+QdsQmyQccMwAU5K6DIBkMmOnwPYQ/HWhyRDXhD/0IoLMS3qQYFq9U3WL8G1aDmL4tnMk5Zpho4XBiMnxnEUKYakP7XxBYdZ0CpBqR7vluw7v9SDXK8AbG2UA2QqYj3r6kBBgmDv4MayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogz9c3668W/KAjNpwAAAAASUVORK5CYII='
                  }
                  _onClick={(e) => {
                    onClickImage(e);
                  }}
                />
                <div className="filebox">
                  <input type="file" id="ex_file" onChange={saveImage} />
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
                    <BiPencil />
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
                    <BiPencil />
                  </button>
                </div>
              </div>
            </ProfileContainer>
            <BadgeContainer>
              <div className="badgeBox">
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
                <div className="badge"></div>
              </div>
              <button>수정하기</button>
            </BadgeContainer>
          </div>
        </div>
        <div id="middle">
          <div>
            <p>더 많은 뱃지를 획득해보세요!</p>
            <div id="middleTopBox" className="boxStyle">
              <BadgeContainer2>
                <div className="badgeBox">
                  <div className="badge"></div>
                  <div className="badge"></div>
                  <div className="badge"></div>
                  <div className="badge"></div>
                  <div className="badge"></div>
                  <div className="badge"></div>
                  <div className="badge"></div>
                  <div className="badge"></div>
                  <div className="badge"></div>
                  <div className="badge"></div>
                  <div className="badge"></div>
                </div>
              </BadgeContainer2>
            </div>
          </div>
          <div>
            <p>오늘의 참여 기록</p>
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
            <p>이번 주 참여 기록</p>
            <div id="endTopBox" className="boxStyle">
              <WeekTimeBox>{week ? <WeekTime week={week} /> : ''}</WeekTimeBox>
            </div>
          </div>
          <div className="width100">
            <p>이번 달 네모와 함께한 시간</p>
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
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
`;

const Container = styled.div`
  max-width: 1110px;
  height: 620px;
  margin: auto;
  display: grid;
  column-gap: 30px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(12, 1fr);
  background-color: #f7f7f7;

  #start {
    height: 620px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-column: 1 / 5;

    p.label {
      font-size: 24px;
      line-height: 36px;
      font-weight: 700;
      font-family: 'Noto Sans KR', sans-serif;
      color: #33344b;
    }

    #startBox {
      height: 562px;
      padding: 48px 26px 48px 26px;
    }
  }
  #middle {
    height: 620px;
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
      height: 212px;
      padding: 32px 28px;
    }
    #middleBottomBox {
      height: 296px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  #end {
    height: 620px;
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
      height: 267px;
      width: 100%;
    }

    #endBottomBox {
      height: 238px;
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
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  background-color: red;
  margin-bottom: 10px;

  .imageBox {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: pink;
    justify-content: center;

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

  .hidden {
    display: none;
  }

  button {
    background-color: transparent;
    border: none;
  }

  .textBox {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: skyblue;
    justify-content: center;
    gap: 10px;

    .nameBox {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      #nickname {
        font-size: 20px;
        line-height: 30px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 700;
      }
    }
    .statusBox {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      #statusText {
        font-size: 18px;
        line-height: 24.52px;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 400;
      }
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
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-row-gap: 20px;
    place-items: center;
    overflow-y: scroll;
  }

  .badge {
    width: 64px;
    height: 64px;
    background-color: red;
  }

  button {
    width: 95px;
    height: 51px;
    padding: 12px 14px;
    background: #7179f0;
    border-radius: 4px;
    border: none;
    color: #fff;

    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 150%;
  }
`;

const BadgeContainer2 = styled.div`
  height: 100%;
  overflow-y: scroll;

  .badgeBox {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-row-gap: 10px;
    place-items: center;
    overflow-y: scroll;
  }

  .badge {
    width: 40px;
    height: 40px;
    background-color: red;
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

export default Mypage;
