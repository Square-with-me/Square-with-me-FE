import React,{ useRef,useState } from "react";
import styled from "styled-components";

const RoomInfo =()=>{

    //드롭다운 부분
    const dropdownRef = useRef(null);

    //드롭여부 확인
    const [isActive, setIsActive] = useState(false);
    const Visible = (active) => {
      setIsActive(active);
    };
    const [RoomInfo, setRoomInfo] = useState('');
  return (
    <div className="container">
        <div className="rMenu-container">
          <DropBtn
            onClick={() => setIsActive(!isActive)}
            className="roomMenu-trigger"
          >
            <Text>방 정보</Text>
          </DropBtn>
          <nav
            ref={dropdownRef}
            className={`roomMenu ${isActive ? 'active' : 'inactive'}`}
          >
          <ul>
            <li>
              <a
                onChange={(e) => setRoomInfo(e.target.value)}
                onClick={() => {
                  isActive(false);
                }}
              >
                <h2>수학문제 풀자!</h2> <br/> #고1 수학
              </a>
            </li>
            <li>
              <a
                onChange={(e) => setRoomInfo(e.target.value)}
                onClick={() => {
                  isActive(false);
                }}
              >
                방 링크 복사
              </a>
            </li>
          </ul>
          </nav>
        </div>
      </div> 

  )
}
const Text = styled.div`
  size: 2rem;
  color: #2f2e2e;
`;

const DropBtn = styled.button`
  justify-content: center;
  position: absolute;
  background-color: #aaf;
  border: none;
  width: 65px;
  height: 38px;
  top: 14px;
  left: 85%;
`;
export default RoomInfo