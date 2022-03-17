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
  max-width: 1110px;
  width: auto;
  margin: auto;
  /* background-color: #F7F7F7; */
  /* display: grid;
  column-gap: 30px;
  grid-template-rows: repeat(4 1fr 1fr 2fr);
  grid-template-columns: repeat(12, 1fr);
  .logo{
    grid-column:1/13;
    grid-row: 1fr;
    background-color: #F7F7F7;
    width: 100%;
    height: 200px;
    align-items: center;
  }
  .input{
    grid-column: 1/13;
    grid-row: 1fr; 
    background-color: antiquewhite;

  } */
  .logo{
    background-color: aliceblue;
  }
  .title{
    font-size: 40px;
    font-weight: 700;
    background-color: aqua;
  }
  .inputWrap{
    display: flex;
    width: 100%;
    margin: auto;
    background-color: aquamarine;
    .input{
      width: 400px;
      height: 100px;
    }
  }
  .area{
    display: flex;
    background-color: beige;
    .text{
      background-color: rebeccapurple;
      border-radius: 10px;
      padding: 10px;
      margin-left: 20px;
    }
  }
`

export default Bug
