import React from 'react';
import styled from 'styled-components';
import MakeRoomModal from '../Modal/MakeRoomModal';
//icon
import { ReactComponent as Plus } from '../../assets/main/plusIcon.svg';

const MakeRoomCard = (props) => {
  return (
    <div>
      {localStorage.getItem('login-token') ? (
        <RoomCardContainer
          onClick={() => {
            props.setMRooms(true);
          }}
        >
          <Plus className="plus"/>
        </RoomCardContainer>
      ) : (
        <RoomCardContainer
          onClick={() => {
            window.alert('로그인해야 방 만들수 있을껄?');
          }}
        >
          <Plus className="plus"/>
        </RoomCardContainer>
      )}
      {props.MRooms && <MakeRoomModal setMRooms={props.setMRooms} />}
    </div>
  );
};

const RoomCardContainer = styled.div`
  width: 255px;
  height: 154px;
  border: none;
  border-radius: 4px;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  background-color: #bcc0ff;
  transition: all ease-in .3s;

  &:hover {
    background-color: #7179f0;
  }
  .plus{
    cursor: pointer;
    width: 64px;
    height: 64px;
    margin: 45px 96px; 
    fill: #FFFFFF;
  }
`;

export default MakeRoomCard;
