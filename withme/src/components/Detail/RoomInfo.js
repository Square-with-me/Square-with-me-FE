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
        <div className="category" >{room.category.name}</div>
        :        
        <div style={{ display: "flex", alignItems: "center" }}>
        <div className="category">{room.category.name}</div>
        <div>
          <LockIcon fill="#8A8BA3" width="18px" />
        </div>
      </div>}

        <div className="title">{room.title}</div>

        <div>
          {room.Tags.map((tag, idx) => (
            <div key={idx} className="tags">#{tag.name}</div>
          ))}
        </div>

        <button className="btn">방 링크 복사</button>
      </div>
    </DropWrap>
  );
};
//카테고리 값 받아올때 사용할 삼항연산자들 (카테고리별 배경화면 바꾸는)
{
  /* <div style={{ display: "flex", alignItems: "center" }}>
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
    style={{ backgroundColor: "black", marginRight: "8px" }}
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
<div>
  <LockIcon width="20" fill="#33344B" />
</div>
</div> */
}
//태그 돌릴땐 맵 사용할 것 

//드롭부분 css
const DropWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 177px;

  .dropbtn{
    background-color: #fafaff;
    align-items: center;
    padding: 10px;
    border: none;
    font-size: 14px;
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
    padding: 3px;
    border-radius: 4px;
    align-items: center;
    font-size: 10px;
    width: 100%;
  }
  .title {
    width: 134px;
    font-weight: 700;
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 14px 0px;
  }
  .tags {
    font-size: 14px;
    margin: 7px 0px;
  }
  .btn {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #e3e5ff;
    margin-top: 17px;
  }
`;


export default RoomInfo;
