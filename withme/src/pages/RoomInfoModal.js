import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';


const RoomInfoModal = ({ setRoomInfoM }) => {
  const dispatch = useDispatch();

  //드롭다운 부분
  const dropdownRef = useRef(null);

  //드롭여부 확인
  const [isActive, setIsActive] = useState(false);
  const Visible = (active) => {
    setIsActive(active);
  };

  const [RoomInfoM, setRoomInfoM] = useState('');

  return (
    <>
          <div className="container">
            <div className="menu-container">
              <DropBtn
                onClick={() => setIsActive(!isActive)}
                className="menu-trigger"
              >
                <Text>방 정보</Text>
              </DropBtn>
              <nav
                ref={dropdownRef}
                className={`menu ${isActive ? 'active' : 'inactive'}`}
              >
                <ul>
                  <li>
                    <a
                      onChange={(e) => setBeauty(e.target.value)}
                      onClick={() => {
                        isActive(false);
                      }}
                    >
                      뷰티
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
    </>
  );
};

const DropBtn = styled.button`
  margin-left: 24px;
  display: flex;
  justify-content: space-between;
  background-color: #aaf;
  align-items: center;
  border-radius: 5px;
  padding: 15px;
  border: none;
  width: 200px;
`;

export default RoomInfoModal;