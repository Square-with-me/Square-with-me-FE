import React, { useState } from "react"
import styled from "styled-components"
import Logo from "../components/Main/Logo"

const Bug =()=>{
  const [text, setText] =useState('')
  return(
    <React.Fragment>
      <Container>
        <div className="logo">
        <Logo/>
        </div>
        
        <div className="title">
          <div>버그신고페이지!</div>
        </div>

        <div className="inputWrap">
          <div>프로필 사진</div>
          <textarea className="input" onChange={(e)=>{setText(e.target.value)}}/>
        </div>

        <div className="area">
          <div className="profile">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="21" cy="21" rx="21" ry="21" fill="#7B61FF"/>
            </svg>
          </div>
          <div className="text"> 메인 화면에서 아무것도 안보여요 </div>
        </div>
      </Container>
      
    </React.Fragment>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  max-width: 1110px;
  margin: auto;
  grid-gap: 30px;
  margin: auto;
  position: relative;
  .logo{
    grid-column: 1/13;
  }
  .title{
    grid-column: 1/13;
    font-size: 40px;
    font-weight: 700;
    margin: auto;
  }
  .inputWrap{
    grid-column: 1/13;
    display: flex;
    width: 100%;
    margin: auto;
    .input{
      width: 100%;
      height: 100px;
    }
  }
  .area{
    grid-column: 1/13;
    display: flex;
    .text{
      border-radius: 10px;
      padding: 10px;
      margin-left: 20px;
    }
  }
`

export default Bug
