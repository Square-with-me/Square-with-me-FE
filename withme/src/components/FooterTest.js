import React from "react";
import styled from "styled-components";
import {BsGithub} from "react-icons/bs"

const Footer = () => {
  return (
    <Wrap>
        {/* <FooterLogo /> */}
        <Div>
          <Grid>
            <P>ㅁwith me 소개 &nbsp; | &nbsp; </P>
            <A href="https://github.com/Square-with-me">
              ㅁwith me 깃허브 &nbsp; | &nbsp; 
            </A>
            <P>ㅁwith me 인스타그램 &nbsp; | &nbsp; </P>
            <P>버그제보</P>
          </Grid>
        </Div>
    </Wrap>
  );
};

const P = styled.p`
  font-size: 100%;
  font-weight: 500;
  margin: 10px 0px;
  color: #8A8BA3;
  float: left;
`

const A = styled.a`
  text-decoration-line: none;
  font-weight: 500;
  font-size: 100%;
  color: #8A8BA3;
  float: left;
  padding:10px 0px;
`

const Grid = styled.div`
  display: grid;
  justify-content: space-around;
  grid-template-columns: 1fr 1fr 1fr ;
  padding: 10px;
  @media screen and (min-width: 935px) {
    display: contents;
  }
`

const Div =styled.div`
  margin: 20px 0px;
  border-top: 1px solid #C7C7C7;
  padding: 20px 30px;
  @media screen and (min-width: 935px) {
    /* margin: 15px 0px; */
    border-bottom: none;
  }
`

const Wrap = styled.div`
  bottom:0;
  width:100%;
  height:6%;
  background-color:#F7F7F7 ;
  display: contents;
  padding: 30px;
  /* @media screen and (min-width: 1192px) {
  }
  @media screen and (min-width: 1125px) {
  } */
  @media screen and (min-width: 935px) {
    bottom:0;
    width:100%;
    height:6%;
    background-color:#F7F7F7 ;
  }
`

export default Footer;