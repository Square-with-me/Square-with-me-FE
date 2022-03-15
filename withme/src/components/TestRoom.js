import React from "react";
import styled from "styled-components";

//icon
import { ReactComponent as LockIcon } from "../assets/main/lockIcon.svg";
import { ReactComponent as UserNickIcon } from "../assets/main/userNickIcon.svg";

const TestRoom = () => {
  return (
    <Con>
      <RoomCardContainer>
        <div>
          <CategoryText style={{ backgroundColor: "#FCEDB7", marginRight: "8px" }}>운동</CategoryText>
    
          <TitleText className="title">오늘 나 운동 하고싶은 밤인데 누구 없니?</TitleText>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <UserNickIcon width="20" fill="#8A8BA3" />
          </div>
          <div>3/4</div>
        </div>
        <div className="tag">
          {/* {props.Tags.map((r, idx) => {
            return <TagText>#{r.name}</TagText>;
          })} */}
            <TagText>#일이삼사</TagText>
            <TagText>#일이삼사</TagText>
            <TagText>#일이삼사</TagText>
            <TagText>#일이삼사</TagText>
            <TagText>#일이삼사</TagText>
        </div>
      </RoomCardContainer>
    </Con>
  );
};
const Con = styled.div`
  width: 255px;
  height: 154px;
  border: none;
  padding: 18px;
  border-radius: 4px;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
`;

const RoomCardContainer = styled.div`
  width: 227px;
  height: 126px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-rows: 2fr;
  grid-gap: 8px;
  .tag {
    grid-column: 1/ 4;
    white-space: normal;
    margin-top: 5px;
  }
`;

const CategoryText = styled.div`
  background: #ffc9c9;
  border-radius: 4px;
  width: 45px;
  height: 18px;
  margin: 8px 0px;
  padding: 2px 4px;
  font-style: normal;
  font-weight: 700;
  font-size: 0.6rem;
  color: #33344b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.div`
  width: 171px;
  font-weight: 700;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  color: #33344b;
`;

const TagText = styled.span`
  background-color: #fafaff;
  color: #33344b;
  font-weight: 400;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 6px;
  display : inline-block; 
  padding: 4px 8px;
`;

export default TestRoom;
