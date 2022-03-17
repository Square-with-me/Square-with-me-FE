import React from "react";
import styled from "styled-components";
import MakeRoomModal from "../Modal/MakeRoomModal";
//icon
import { ReactComponent as Plus } from '../../assets/main/plusIcon.svg';

const MakeRoomCard = (props) => {
  return (
    <div>
      {localStorage.getItem("login-token") ? (
        <RoomCardContainer
          onClick={() => {
            props.setMRooms(true);
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
`;

export default MakeRoomCard;
