import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Image, Text, Input } from '../elements/Index';
import styled from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';

import TodayTime from '../components/TodayTime';
import WeekTime from '../components/WeekTime';
import MonthTime from '../components/MonthTime';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as usereditActions } from '../redux/modules/userEdit';

function handleClick(v) {
  console.log(v);
}

const Mypage = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.userEdit.user);

  const [isEditNick, setIsEditNick] = useState(false); // 닉네임 수정 상태 체크
  const [isEditStatus, setIsEditStatus] = useState(false); // 상태메시지 수정 상태 체크

  const [editNick, setEditnick] = useState(user.nickname); // 수정한 닉네임 저장
  const [editStatus, setEditStatus] = useState(user.statusMsg); // 수정한 상태메지시 저장

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  // 리덕스에서 받아온 애들 for문 사용해서 배열 value에 {date:`{year}-{month}-{i+1}`, time: {리덕스에서 받아온 시간[i]}}
  // 넣어주는 작업 하기

  useEffect(() => {
    dispatch(usereditActions.getProfileDB());
  }, []);

  const editNickname = () => {
    const nicknameText = document.getElementById('nickname');
    const inputNickname = document.getElementById('inputNickname');

    if (!isEditNick) {
      // 수정시작
      setIsEditNick(true);
      nicknameText.classList.add('hidden');
      inputNickname.classList.remove('hidden');
    } else {
      // 수정 끝
      nicknameText.classList.remove('hidden');
      inputNickname.classList.add('hidden');
      dispatch(usereditActions.editNickDB(editNick));
      setIsEditNick(false);
    }
  };

  const editStatusMsg = () => {
    const statusText = document.getElementById('statusText');
    const inputStatus = document.getElementById('inputStatus');

    if (!isEditStatus) {
      // 수정 시작
      setIsEditStatus(true);
      statusText.classList.add('hidden');
      inputStatus.classList.remove('hidden');
    } else {
      // 수정 끝
      statusText.classList.remove('hidden');
      inputStatus.classList.add('hidden');
      dispatch(usereditActions.editStatusDB(editStatus));
      setIsEditStatus(false);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <ProfileContainer>
        <div className="imageBox">
          <Image
            shape="rectangle"
            src={
              user
                ? user.profileImg
                : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADACAMAAACKwPcLAAAANlBMVEVmZmb////u8vpwb3D29vbY2NixsbGLi4vi4uKCgoLr6+vPz8+fn594eHjFxcWop6i7u7uVlZUD7tw7AAAEB0lEQVR4nO2ba5ujIAxG2wHBu+3//7MzjnhpV60kr5vBJ+fjri6cQhIE9nZLnC/pDrBRA3nUQB41kEcN5FEDedRAHjWQRw3kUQN51EAeNZBHDeRRA3nUQB41kEcN5FEDedRAHjXYxjxdld17bFa5pzmrnZMMmi6/v5F3zSlNnWJQZ+/dH8jqExo7weBZrve/p3zCm4MbNBu//zQO6LmENujsvsBPXHfYFrEGplp2tXK+6P+08K5ailXQvAQ1MHMCsm3x+ndFO0vkSAWkQTMJWLfSR+PsGQpAg3kEHhsdNI8TFHAGk0Dptx/yJVwBZzAGcbbbNzMm2wrVLsygCz1rPz3YhgdRSRVl0NiDApOCBZU2lEGYHBn62c+ADJ4hiA/FpwnhjFkjgQxCn3ay0BIffCFNYwzqUAeOPh/qAmSxjTEI32KHc7yxuEiAGDTDT+qOv+GGNxDpCGLQRQ7BNAiImgAxyI+WgpmhKOSAxhEGZpgSxecnZ4rhHcDqCGEwFAMb95JFlQSEgaMs1arY4N8CYVBRopKkvQbCIIupxyMeVREQBjY+kMdQjgyeNRAGQ1r5P2/9ixr0qAEPnEHKkZx+NiWV1z9V0dJfVaS/skt/dZ3+F84FvjLT/9JPf7flAjte6e86XmDnN/3d9wucgKR/CnWBk8ALnMamfyK+VEj0VsIFboZc4HbOLf0bUrcL3FL7UWh3BSK3lT6DNvDVXv97yhp7eRZr4D9MoRAJa7mWDNKgONT/Xwfg1VngquLx2svs0fmwvvC+e7zZ4eIBZuCXN33Lx8rXi3cvd7EB23W/oAzcYoq8l+OZxi089xexh8EYmHmOfArTenawkJmE2S/aX9K9MTtAAhphUEwriepQwTXzlAMoAAwmAXt486HIcQp8g/Eb/55HrHhMC1NgG0zfBG1caqlR4cw2GLNQ1N57z6TATKpcg7EQE+rTqMDc+WIaeOoI9NR0+wU8g3EHlCQwK7BCgWcQ5hD5MKkFzCOWQZhD9B3QMZFxUirLIOQhxi56wc9HHIMwjVk7oI4dzByDkjmHekIuYAwCw8AjcuE4kPRIYBjEHmBuMAwC/UyNbhB/iLxOzawJdAOHGYJxEIhFkWPAbHgm/BTU18kGBWBBMBCmY+QdsQmyQccMwAU5K6DIBkMmOnwPYQ/HWhyRDXhD/0IoLMS3qQYFq9U3WL8G1aDmL4tnMk5Zpho4XBiMnxnEUKYakP7XxBYdZ0CpBqR7vluw7v9SDXK8AbG2UA2QqYj3r6kBBgmDv4MayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogz9c3668W/KAjNpwAAAAASUVORK5CYII='
            }
          />
          <div className="filebox">
            <label htmlFor="ex_file">프로필 사진 수정</label>
            <input type="file" id="ex_file" />
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
              <BsFillPencilFill />
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
              <BsFillPencilFill />
            </button>
          </div>
        </div>
      </ProfileContainer>
      <BadgeContainer>
        <p>대표 벳지 설정</p>
        <div className="badgeBox">
          <div className="badge"></div>
          <div className="badge"></div>
          <div className="badge"></div>
          <div className="badge"></div>
          <div className="badge"></div>
          <div className="badge"></div>
        </div>
      </BadgeContainer>
      <TimeContainer>
        <div className="todayTimeBox">
          <p>오늘 네모와 함께한 시간</p>
          <div className="chart">
            <TodayTime />
          </div>
        </div>
        <div className="weekTime">
          <p>이번 주 네모와 함께한 시간</p>
          <WeekTime />
        </div>
        <div className="monthTime">
          <p>이번 달 네모와 함께한 시간</p>
          <MonthTime
            values={[
              { date: '2022-03-01', count: 10 },
              { date: '2022-03-02', count: 0 },
              { date: '2022-03-03', count: 1 },
              { date: '2022-03-04', count: 10 },
            ]}
            toolTip
            onClick={(v) => handleClick(v)}
          />
        </div>
      </TimeContainer>
      <Footer />
    </React.Fragment>
  );
};

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #eee;
  justify-content: space-between;
  margin-bottom: 10px;

  .imageBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
    background-color: pink;

    .filebox label {
      display: inline-block;
      padding: 0.5em 0.75em;
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
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: skyblue;

    .nameBox {
      display: flex;
      flex-direction: row;
    }

    .statusBox {
      display: flex;
      flex-direction: row;
    }
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;

  .badgeBox {
    display: grid;
    grid-template-columns: repeat(5, minmax(100px, auto));
    grid-template-rows: repeat(auto-fill, minmax(100px, auto));
    background-color: black;

    place-items: center;
  }

  .badge {
    width: 80px;
    height: 80px;
    background-color: red;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  p {
    width: 50%;
  }

  .chart {
    width: 50%;
  }

  .todayTimeBox {
    display: flex;
  }
`;

export default Mypage;
