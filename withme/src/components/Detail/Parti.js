import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Image } from '../../elements/Index';
import userIcon from '../../assets/inRoom/userIcon.svg';

const Parti =({me})=>{
  const userInfo = useSelector((store)=>store.user.userInfo)
  console.log(userInfo)
  
  return(
    <React.Fragment>
      <Container>
        <Image
            shape="circle"
            width="42px"
            height="42px"
            src={me.profileImg? me.profileImg :userIcon}
            className="profile"
            />
        <div>
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
  width: 85%;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
`

export default Parti