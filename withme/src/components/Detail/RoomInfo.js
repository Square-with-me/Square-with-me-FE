import React, { useRef, useState } from "react";
import "../../styles/RoomInfoDrop.css";
import styled from "styled-components";

//icon
import { ReactComponent as LockIcon } from "../../assets/main/lockIcon.svg";

const RoomInfo = ({ room }) => {
  //드롭다운 부분
  const dropdownRef = useRef(null);

  //드롭여부 확인
  const [isActive, setIsActive] = useState(false);
  const Visible = (active) => {
    setIsActive(active);
  };

  return (
    <DropWrap>
      <div className="dropbtn" onClick={() => setIsActive(!isActive)}>방정보</div>
      <div
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        {room.isSecret === false
        ?
        <div>
        {room.category.name === "뷰티" ? (
          <div className="category"
            style={{ backgroundColor: "#FCEDB7"}}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "운동" ? (
          <div className="category"
            style={{ backgroundColor: "#FFC9C9"}}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "스터디" ? (
          <div className="category"
            style={{ backgroundColor: "#B9E8B5" }}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "상담" ? (
          <div className="category"
            style={{ backgroundColor: "#FFD9B6"}}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "문화" ? (
          <div className="category"
            style={{ backgroundColor: "#B5E3F8"}}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "기타" ? (
          <div className="category"
            style={{ backgroundColor: "#B7CEFC"}}
          >
            {room.category.name}
          </div>
        ) : null}
        </div>
        :
        <div style={{display:'flex'}}>
        {room.category.name === "뷰티" ? (
          <div className="category"
            style={{ backgroundColor: "#FCEDB7", marginRight: "8px" }}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "운동" ? (
          <div className="category"
            style={{ backgroundColor: "#FFC9C9", marginRight: "8px" }}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "스터디" ? (
          <div className="category"
            style={{ backgroundColor: "#B9E8B5", marginRight: "8px" }}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "상담" ? (
          <div className="category"
            style={{ backgroundColor: "#FFD9B6", marginRight: "8px" }}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "문화" ? (
          <div className="category"
            style={{ backgroundColor: "#B5E3F8", marginRight: "8px" }}
          >
            {room.category.name}
          </div>
        ) : room.category.name === "기타" ? (
          <div className="category"
            style={{ backgroundColor: "#B7CEFC", marginRight: "8px" }}
          >
            {room.category.name}
          </div>
        ) : null}
        <LockIcon fill="#8A8BA3" width="18px" />
        </div>}

        <div className="title">{room.title}</div>

        <div>
          {room.Tags.map((tag, idx) => (
            <div key={idx} className="tags"># {tag.name}</div>
          ))}
        </div>
      </div>
    </DropWrap>
  );
};

//드롭부분 css
const DropWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 177px;

  .dropbtn{
    background-color: rgba(227, 229, 255, 0.7);
    align-items: center;
    padding: 10px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    &:hover {
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
      border: 0.5px solid #fafaff;
    }
  }
  .menu {
    width: 177px;
    padding: 23px;
  }
  .category {
    background-color: #ffc9c9;
    margin-right: 8px;
    padding: 3px 10px;
    border-radius: 4px;
    align-items: center;
    font-size: 10px;
    width: fit-content;
  }
  .title {
    width: 134px;
    font-weight: 700;
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 14px 0px;
    height: 20px;
  }
  .tags {
    font-size: 14px;
    margin: 7px 0px;
  }
`;


export default RoomInfo;
