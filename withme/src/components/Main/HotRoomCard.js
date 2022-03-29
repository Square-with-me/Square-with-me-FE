import React from "react";
import styled from "styled-components";

//icon
import { ReactComponent as LockIcon } from "../../assets/main/lockIcon.svg";
import { ReactComponent as HotRoomIcon } from "../../assets/main/hotRoomIcon.svg";
import { ReactComponent as UserNickIcon } from "../../assets/main/userNickIcon.svg";

const HotRoomCard = (props) => {
  const category = props.category.name;
  return (
    <Con>
      <div className="roomcardcontainer">
        <div>
          <div>
            {/*비밀방 여부 확인*/}
            {props.isSecret === true ? (
              //각 카테고리에 맞는 배경색 지정
              <div style={{ display: "flex", alignItems: "center" }}>
                {category === "뷰티" ? (
                  <CategoryText
                    style={{ backgroundColor: "#FCEDB7", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "운동" ? (
                  <CategoryText
                    style={{ backgroundColor: "#FFC9C9", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "스터디" ? (
                  <CategoryText
                    style={{ backgroundColor: "#B9E8B5", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "상담" ? (
                  <CategoryText
                    style={{ backgroundColor: "#FFD9B6", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "문화" ? (
                  <CategoryText
                    style={{ backgroundColor: "#B5E3F8", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "기타" ? (
                  <CategoryText
                    style={{ backgroundColor: "#B7CEFC", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : null}
                <div style={{ display: "flex" }}>
                  <HotRoomIcon
                    width="19"
                    fill="#E55C31"
                    style={{ marginRight: "5px" }}
                  />
                  <LockIcon width="20" fill="#000" />
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                {category === "뷰티" ? (
                  <CategoryText
                    style={{ backgroundColor: "#FCEDB7", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "운동" ? (
                  <CategoryText
                    style={{ backgroundColor: "#FFC9C9", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "스터디" ? (
                  <CategoryText
                    style={{ backgroundColor: "#B9E8B5", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "상담" ? (
                  <CategoryText
                    style={{ backgroundColor: "#FFD9B6", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "문화" ? (
                  <CategoryText
                    style={{ backgroundColor: "#B5E3F8", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : category === "기타" ? (
                  <CategoryText
                    style={{ backgroundColor: "#B7CEFC", marginRight: "8px" }}
                  >
                    {props.category.name}
                  </CategoryText>
                ) : null}
                <HotRoomIcon width="19" fill="#E55C31" />
              </div>
            )}
          </div>

          <TitleText className="title">{props.title}</TitleText>
        </div>
        <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{marginRight:'4px'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.75 13.8562H1.25V6.61865H8.75V13.8562ZM2.5 12.6062H7.5V7.86865H2.5V12.6062Z" fill="#8A8BA3"/>
            <path d="M12.1501 8.66895H8.6001V9.91895H12.1501V8.66895Z" fill="#8A8BA3"/>
            <path d="M12.1501 10.5811H8.6001V11.8311H12.1501V10.5811Z" fill="#8A8BA3"/>
            <path d="M7.69764 8.6628L3.55347 12.8623L4.44319 13.7403L8.58736 9.5408L7.69764 8.6628Z" fill="#8A8BA3"/>
            <path d="M6.82067 6.80043L1.48242 12.21L2.37215 13.088L7.7104 7.67843L6.82067 6.80043Z" fill="#8A8BA3"/>
            <path d="M18.75 13.9313H11.1875V6.69385H18.75V13.9313ZM12.4625 12.6813H17.5V7.94385H12.4375L12.4625 12.6813Z" fill="#8A8BA3"/>
            <path d="M15.5094 6.80635L11.3652 11.0059L12.255 11.8839L16.3991 7.68435L15.5094 6.80635Z" fill="#8A8BA3"/>
            <path d="M17.5848 7.45424L12.2466 12.8638L13.1363 13.7418L18.4746 8.33224L17.5848 7.45424Z" fill="#8A8BA3"/>
            </svg>
          </div>
          <div>1/2</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserNickIcon width="19" fill="#8A8BA3" style={{marginRight:'4px'}} />
          <div>{props.participantCnt}/4</div>
        </div>
        </div>

        <div className="tag">
          {props.Tags.map((r, idx) => {
            return <TagText key={r.id}># {r.name}</TagText>;
          })}
        </div>
      </div>
    </Con>
  );
};
const Con = styled.div`
  width: 255px;
  height: 154px;
  border: none;
  padding: 18px;
  border-radius: 4px;
  background-color: #f7f7f7;
  box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
  .roomcardcontainer{
    width: 227px;
    height: 126px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-auto-rows: 2fr;
    grid-gap: 5px;
    .tag {
    grid-column: 1/ 4;
    white-space: normal;
    margin-top: 5px;
  }
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
  height: 30px;
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
  color: #4c4d60;
  font-weight: 600;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 6px;
  display : inline-block;
  padding: 4px 8px;
`;

export default HotRoomCard;
