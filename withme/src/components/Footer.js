import React from "react";
import styled from "styled-components";
import {BsGithub} from "react-icons/bs"

const Footer = () => {
  return (
    <Wrap>
        <Div1>
        <Div>
            <p style={{fontWeight:"700", fontSize:"14px"}}>FRONT-END</p>
            <Grid>
              <P>L 장혜진</P>
              <P>박수민</P>
              <P>윤현정</P>
            </Grid>
        </Div>
        <Div>
            <p style={{fontWeight:"700", fontSize:"14px"}}>BACK-END</p>
            <Grid>
            <P>VL 장현광</P>
            <P>장창훈</P>
            <P>황성원</P>
            </Grid>
        </Div>
        <Div>
            <p style={{fontWeight:"700", fontSize:"14px"}}>DESIGNER</p>
            <Grid>
            <P>김지현</P>
            <P>추정윤</P>
            </Grid>
        </Div>
        </Div1>
        <Div2>
           <P>© 2022 3조, 실전프로젝트"ㅁwith me"</P>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <a href="https://github.com/Square-with-me"><BsGithub style={{margin:"0px 10px 0px 0px"}}/></a>
            </div>
        </Div2>
    </Wrap>
  );
};

const P = styled.p`
font-size: 75%;
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
margin: 10px 0px;
border-bottom: 1px solid #DDDDDD;
padding: 0px 30px;
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

const Div1 = styled.div`
display: contents;
width:100%;
margin: auto;
@media screen and (min-width: 935px) {
    display:flex;
    justify-content:space-around;
    width:70%;
    margin: auto;
  }
`

const Div2 = styled.div`
    display: flex;
    align-content:center;
    align-items:center;
    width: 70%;
    margin: auto;
    padding: 10px 0px;
    flex-direction: column-reverse;

@media screen and (min-width: 935px) {
    display: flex;
    flex-direction: inherit;
    justify-content:space-around;
    align-content:center;
    align-items:center;
    border-top: 1px solid #DDDDDD;
    width: 70%;
    margin: auto;
    padding: 10px 0px;
  }
`

const Div3 =styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 75%;
@media screen and (min-width: 935px) {
  display: flex;
  justify-content: space-around;

  align-items: center;
  font-size: 75%;
}
`
export default Footer;