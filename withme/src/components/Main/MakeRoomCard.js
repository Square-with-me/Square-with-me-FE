import React from "react";
import styled from "styled-components";
import MakeRoomModal from "../Modal/MakeRoomModal";
//icon
import { ReactComponent as Plus } from "../../assets/main/plusIcon.svg";
import { useSelector } from "react-redux";

const MakeRoomCard = (props) => {
  const user = useSelector((state) => state.user.user);
  return (
    // <div>
    //     <RoomCardContainer
    //       onClick={() => {
    //         props.setMRooms(true);
    //       }}
    //     >
    //       <Plus className="plus"/>
    //     </RoomCardContainer>
    //   {props.MRooms && <MakeRoomModal setMRooms={props.setMRooms} />}
    // </div>

    <>
      {user ? (
        <RoomCardContainer
          onClick={() => {
            props.setMRooms(true);
          }}
        >
          <Plus className="plus" />
        </RoomCardContainer>
      ) : (
        <RoomCardContainer
          onClick={() => {
            window.alert("로그인을 하신 후에 방을 만들 수 있습니다!");
          }}
        >
          <Plus className="plus" />
        </RoomCardContainer>
      )}
      {props.MRooms && <MakeRoomModal setMRooms={props.setMRooms} />}
    </>
  );
};

const RoomCardContainer = styled.div`
  min-width: 255px;
  height: 154px;
  border: none;
  border-radius: 4px;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  background-color: #bcc0ff;
  transition: all ease-in 0.3s;

  &:hover {
    background-color: #7179f0;
  }
  .plus {
    cursor: pointer;
    width: 64px;
    height: 64px;
    margin: 45px 96px;
    fill: #ffffff;
  }
`;

export default MakeRoomCard;
