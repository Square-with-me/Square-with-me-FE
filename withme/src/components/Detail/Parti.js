import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Image } from '../../elements/Index';
import userIcon from '../../assets/inRoom/userIcon.svg';

const Parti =({me})=>{
  const userInfo = useSelector((store)=>store.user.userInfo)

  return(
    <React.Fragment>
      <Container>
        <Image
            shape="circle"
            width="40px"
            height="40px"
            src={me.profileImg? me.profileImg :userIcon}
            className="profile"
            />
        <div style={{marginLeft:"5px",width: "90%"}}>
          <div className="userNick">{me.nickname}</div>
          <div className="statusMsg">{me.statusMsg}</div>
        </div>
        </Container>
        {userInfo&&
        userInfo.map((u,idx)=> (
          <div key={u.id}>
          <Container>
          <Image
            shape="circle"
            width="42px"
            height="42px"
            src={u.profileImg?u.profileImg :userIcon}
            className="profile"
            />
          <div>
            <div className="userNick">{u.nickname}</div>
            <div className="statusMsg">{u.statusMsg}</div>
          </div>
          </Container>
          </div>
        ))}
      
    </React.Fragment>
  )
}

const Container = styled.div`
display: flex;
margin-top: 20px;
align-items: center;
padding: 0px 5px;
.profile{
  margin-right: 7px;
}
.userNick{
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 4px;
}
.statusMsg{
  font-size: 14px;
  width: 75%;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

  // 세로가 더 긴 기기가 세로로 있을 때 오른쪽으로 밀려보이는 부분 조절
  @media screen and (max-width: 767px) and (orientation: portrait) {
    padding: 0px;
    .userNick{
      font-size: 15px;
    }
    .statusMsg{
      font-size: 11px;
    }
  }
`

export default Parti