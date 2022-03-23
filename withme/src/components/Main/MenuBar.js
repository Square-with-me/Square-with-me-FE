import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// category icon
import { ReactComponent as Beauty } from '../../assets/category/beautyIcon.svg';
import { ReactComponent as Consulting } from '../../assets/category/consultingIcon.svg';
import { ReactComponent as Culture } from '../../assets/category/cultureIcon.svg';
import { ReactComponent as Exercise } from '../../assets/category/exerciseIcon.svg';
import { ReactComponent as Other } from '../../assets/category/otherIcon.svg';
import { ReactComponent as Study } from '../../assets/category/studyIcon.svg';
import { actionCreators as roomActions } from '../../redux/modules/room';
import { ReactComponent as Refresh } from '../../assets/main/refreshIcon.svg';

const MenuBar = (props) => {
  const dispatch = useDispatch();

  //드롭다운 부분
  const dropdownRef = useRef(null);

  //드롭여부 확인
  const [isActive, setIsActive] = useState(false);
  const Visible = (active) => {
    setIsActive(active);
  };

  // 전체 방 개수 불러오기
  const getAllRoomFunc = () => {
    props.setChoiceCate(0);
    dispatch(roomActions.emptyRoom());
    dispatch(roomActions.getRoomDB(1));
    props.setPageNum(2);
    props.setIsSearch(false);
  };

  return (
    <Menu>
      <div className="flex">
        {props.possible === true ? (
          <AllBtn
            onClick={() => {
              props.setPossible(false);

              getAllRoomFunc();
            }}
          >
            <RoomText>ALL</RoomText>
          </AllBtn>
        ) : (
          <AllBtn
            onClick={() => {
              props.setPossible(false);

              getAllRoomFunc();
            }}
            style={{ background: '#7179F0', border: 'none', fontWeight: '700' }}
          >
            <RoomText style={{ color: '#FAFAFF', fontWeight: '700' }}>
              ALL
            </RoomText>
          </AllBtn>
        )}

        {props.possible === true ? (
          <PossibleBtn
            onClick={() => {
              props.setPossible(false);
              props.setCategory('카테고리');
              console.log('참여가능 안따짐 전부 와라ㅏㄹ라랄ㄹ라라!!');
              getAllRoomFunc();
            }}
            style={{ background: '#7179F0', border: 'none', fontWeight: '700' }}
          >
            <RoomText style={{ color: '#FAFAFF', fontWeight: '700' }}>
              참여 가능
            </RoomText>
          </PossibleBtn>
        ) : (
          <PossibleBtn
            onClick={() => {
              props.setPossible(true);
              props.setCategory('카테고리');
              props.setChoiceCate(0);
              dispatch(roomActions.emptyRoom());
              dispatch(roomActions.possibleRoomDB(1));
              props.setPageNum(2);
              props.setIsSearch(false);

              // dispatch(roomActions.PossibleRoomDB());
            }}
          >
            <RoomText>참여 가능</RoomText>
          </PossibleBtn>
        )}

        <Category>
          <div className="container">
            <DropWrap>
              <DropBtn onClick={() => setIsActive(!isActive)}>
                {props.category === '' ? (
                  <CategoryDText>카테고리</CategoryDText>
                ) : (
                  <CategoryDText>{props.category}</CategoryDText>
                )}
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 28 28"
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
              </DropBtn>
              <div
                ref={dropdownRef}
                className={`menu ${isActive ? 'active' : 'inactive'}`}
              >
                <CategoryWrap
                  onClick={() => {
                    props.setCategory('뷰티');
                    setIsActive(!isActive);
                    props.setChoiceCate(1);
                    props.setPossible(false);
                  }}
                >
                  <div>뷰티</div>
                  <svg
                    width="24px"
                    height="24"
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
                    props.setCategory('운동');
                    setIsActive(!isActive);
                    props.setChoiceCate(2);
                    props.setPossible(false);
                  }}
                >
                  <div>운동</div>
                  <Exercise fill="#8A8BA3" width="24px" />
                </CategoryWrap>
                <Line />

                <CategoryWrap
                  onClick={() => {
                    props.setCategory('스터디');
                    setIsActive(!isActive);
                    props.setChoiceCate(3);
                    props.setPossible(false);
                  }}
                >
                  <div>스터디</div>
                  <Study fill="#8A8BA3" width="24px" />
                </CategoryWrap>
                <Line />

                <CategoryWrap
                  onClick={() => {
                    props.setCategory('상담');
                    setIsActive(!isActive);
                    props.setChoiceCate(4);
                    props.setPossible(false);
                  }}
                >
                  <div>상담</div>
                  <Consulting fill="#8A8BA3" width="24px" />
                </CategoryWrap>
                <Line />

                <CategoryWrap
                  onClick={() => {
                    props.setCategory('문화');
                    setIsActive(!isActive);
                    props.setChoiceCate(5);
                    props.setPossible(false);
                  }}
                >
                  <div>문화</div>
                  <div>
                    <Culture fill="#8A8BA3" width="24px" />
                  </div>
                </CategoryWrap>
                <Line />

                <CategoryWrap
                  onClick={() => {
                    props.setCategory('기타');
                    setIsActive(!isActive);
                    props.setChoiceCate(6);
                    props.setPossible(false);
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
          width: '30px',
          height: '30px',
          margin: 'auto 0px',
          fill: '#8A8BA3',
        }}
        onClick={() => {
          dispatch(roomActions.hotRoomDB());
          props.setPossible(false);
          if (props.category !== '카테고리') {
            props.setChoiceCate(0);
          } else {
            dispatch(roomActions.emptyRoom());
            dispatch(roomActions.getRoomDB(1));
            props.setPageNum(2);
            props.setIsSearch(false);
          }
        }}
      />
    </Menu>
  );
};

const Menu = styled.div`
  display: flex;
  margin-bottom: 25px;
  justify-content: space-between;
  width: 100%;
  div {
    font-weight: 700;
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
  @media screen and (max-width: 550px) {
    font-size: 13px;
    width: 50px;
    height: 38px;
  }
`;

const PossibleBtn = styled.button`
  width: 90px;
  height: 43px;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  margin-right: 16px;
  background-color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  :hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
  @media screen and (max-width: 550px) {
    font-size: 13px;
    height: 38px;
  }
`;

const Category = styled.div`
  display: flex;
  select {
    width: 148px;
    height: 40px;
    border: none;
    border-radius: 4px;
    & :focus {
      border: 1px none;
    }
  }
  select > option {
    width: 100%;
    background-color: blue;
  }
  @media screen and (max-width: 550px) {
    font-size: 13px;
    width: 90px;
    height: 38px;
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
  height: 43px;
  &:hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }
  @media screen and (max-width: 550px) {
    font-size: 13px;
    height: 38px;
    width: 100px;
    border: 1px solid #8a8ba3;
  }
`;

const CategoryDText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #8a8ba3;
  @media screen and (max-width: 550px) {
    font-size: 13px;
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
  @media screen and (max-width: 550px) {
    width: fit-content;
    border: none;
  }
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
    @media screen and (max-width: 550px) {
      font-size: 13px;
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

const RoomText = styled.div`
  size: 2rem;
  color: #8a8ba3;
`;

export default MenuBar;