import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Parti =({me})=>{
  const userInfo = useSelector((store)=>store.user.userInfo)
  
  return(
    <React.Fragment>
      <Container>
        <div className="profile">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="21" cy="21" rx="21" ry="21" fill="#7B61FF"/>
        </svg>
        </div>
        <div>
          <div className="userNick">{me.nickname}</div>
          <div className="statusMsg">{me.statusMsg}</div>
        </div>
        </Container>
        {userInfo&&
        userInfo.map((u,idx)=> (
          <div key={u.id}>
          <Container>
          <div className="profile">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="21" cy="21" rx="21" ry="21" fill="#7B61FF"/>
          </svg>
          </div>
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
  margin-right: 10px;
}
.userNick{
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 4px;
}
.statusMsg{
  font-size: 14px;
  width: 125px;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
`

export default Parti