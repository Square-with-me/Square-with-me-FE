import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from "../../assets/main/logo.svg";

const Footer = () => {
  return (
    <Wrap>
      <div className="div">
        <div className="logo" style={{margin:"0px"}}>
        <Logo />
        </div>
        <div className='text'>
          <A className='a' href="/">네모위드미 소개 &nbsp; | &nbsp; </A>
          <A className='a' href="https://github.com/Square-with-me"  target="_blank">
              네모위드미 깃허브 &nbsp; | &nbsp;
          </A>
          <A className='a' href="https://www.instagram.com/nemo_with_me/"  target="_blank">네모위드미 인스타그램 &nbsp; | &nbsp; </A>
          <A className='a' href="https://docs.google.com/forms/d/e/1FAIpQLSckDKexhkTD5CbfLoIrH2kLeXT25xtDH1uot2K6uA5mBr7amw/viewform" target="_blank">버그제보</A>
          </div>
      </div>
    </Wrap>
  );
};
const A = styled.a`
  text-decoration-line: none;
  font-size: 14px;
  color: #8a8ba3;
  float: left;
  padding: 10px 0px;
  font-weight: 650;
  @media screen and (max-width: 660px) {
    font-size: 10px;
  }
`;

const Wrap = styled.div`
  bottom: 0;
  width: 100%;
  height: 6%;
  display: contents;
  .div{
    border-top: 1px solid #c7c7c7;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (max-width: 875px) {
    .logo{
      display: none;
    }
    .text{
      margin: auto;
    }
  }
  @media screen and (max-width: 450px) {
    .div{
      padding:20px 0px;
    }
  }
`;

export default Footer;
