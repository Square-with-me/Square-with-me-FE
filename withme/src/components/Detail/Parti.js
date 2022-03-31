import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Image } from '../../elements/Index';
import logo from '../../assets/logo.jpeg';

const Parti = ({ me }) => {
  const userInfo = useSelector((store) => store.user.userInfo);
  console.log(userInfo);
  return (
    <React.Fragment>
      <Container>
        <div className="imageBox">
          <Image
            shape="circle"
            width="40px"
            height="40px"
            src={me.profileImg ? me.profileImg : logo}
            className="profile"
          />
          <div className="badgeImg">
            <Image
              width="20px"
              height="20px"
              margin="0px"
              src={me.MasterBadge ? me.MasterBadge.imageUrl : ''}
            />
          </div>
        </div>
        <div style={{ marginLeft: '5px', width: '70%' }}>
          <div className="userNick">{me.nickname}</div>
          <div className="statusMsg">{me.statusMsg}</div>
        </div>
      </Container>
      {userInfo &&
        userInfo.map((u, idx) => (
          <div key={u.id}>
            <Container>
              <div className="imageBox">
                <Image
                  shape="circle"
                  width="42px"
                  height="42px"
                  src={u.profileImg ? u.profileImg : logo}
                  className="profile"
                />
                <div className="badgeImg">
                  <Image
                    width="20px"
                    height="20px"
                    margin="0px"
                    src={u.masterBadge ? u.masterBadge : ''}
                  />
                </div>
              </div>
              <div>
                <div className="userNick">{u.nickname}</div>
                <div className="statusMsg">{u.statusMsg}</div>
              </div>
            </Container>
          </div>
        ))}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  padding: 0px 5px;
  .imageBox {
    position: relative;
    margin-right: 10px;
  }
  .profile {
    margin-right: 10px;
  }
  .userNick {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 4px;
  }
  .statusMsg {
    font-size: 14px;
    width: 100%;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .badgeImg {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    right: 0;
    bottom: 0;
    box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.25);
  }

  // 세로가 더 긴 기기가 세로로 있을 때 오른쪽으로 밀려보이는 부분 조절
  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 0px;
    .userNick {
      font-size: 13px;
    }
    .statusMsg {
      font-size: 11px;
      width: 65%;
    }
  }
`;

export default Parti;
