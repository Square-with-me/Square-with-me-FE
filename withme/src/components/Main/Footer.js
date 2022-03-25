import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrap>
      <Div>
        <Grid>
          <div className="footerLogo">
          <svg width="203" height="39" viewBox="0 0 255 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1629_12190)">
          <path d="M140.23 6.91016L148.92 7.89016L144.56 32.0402L140.26 32.4702L136.02 24.5902L131.92 32.0902L126.96 32.4702L123.96 7.34016L123.93 7.14016L132.96 7.57016L132.64 21.5402L136.1 14.2402L139.22 20.9602L140.23 6.91016Z" fill="#58596A" fillOpacity="0.3"/>
          <path d="M159.39 6.91016L157.05 32.2402L150.44 32.4702L150.18 8.75016V8.61016L159.39 6.91016Z" fill="#58596A" fillOpacity="0.3"/>
          <path d="M180.95 6.91016L179.65 14.3302L173.68 14.1602L174.11 31.7302L165.83 32.4802L167.5 14.7002L160.66 15.5402L161.55 8.18016L161.58 8.04016L180.95 6.91016Z" fill="#58596A" fillOpacity="0.3"/>
          <path d="M191.33 6.91016L190.46 16.8702L195.05 16.8102L195.08 7.66016L203.65 6.91016L201.23 32.1302L195 32.4802L195.06 22.7602L189.78 23.2802L189.03 32.4902L183 31.9002L182.22 7.89016V7.72016L191.33 6.91016Z" fill="#58596A" fillOpacity="0.3"/>
          <path d="M236.87 6.91016L237.91 31.3502L229.17 32.4802L229.89 17.9102L225.42 25.5002L221.03 17.1002L221.58 32.4802L212.89 31.3502L212.75 31.3202L214.39 6.91016L221.89 7.86016L225.84 16.1402L231.03 6.91016H236.87V6.91016Z" fill="#58596A" fillOpacity="0.3"/>
          <path d="M254.84 6.91016L253.83 15.4202L247.25 15.3002L246.93 19.2502L252.01 18.9602L251.89 22.0202L246.55 22.1602L246.26 26.0002L253.18 24.0402L253.44 32.3502L239.16 32.4702C239.26 29.7802 239.39 25.6802 239.56 20.1802C239.73 14.6402 239.86 10.5102 239.94 7.80016L254.84 6.91016Z" fill="#58596A" fillOpacity="0.3"/>
          <path d="M110.18 0H0V38.29H110.18V0Z" fill="#58596A" fillOpacity="0.3"/>
          </g>
          <defs>
          <clipPath id="clip0_1629_12190">
          <rect width="254.84" height="38.29" fill="white"/>
          </clipPath>
          </defs>
          </svg>
          </div>

          <div className='text'>
            <A href="/">네모위드미 소개 &nbsp; | &nbsp; </A>
            <A href="https://github.com/Square-with-me"  target="_blank">
              네모위드미 깃허브 &nbsp; | &nbsp;
            </A>
            <A href="https://www.instagram.com/nemo_withme/"  target="_blank">네모위드미 인스타그램 &nbsp; | &nbsp; </A>
            <A href="https://docs.google.com/forms/d/e/1FAIpQLSckDKexhkTD5CbfLoIrH2kLeXT25xtDH1uot2K6uA5mBr7amw/viewform" target="_blank">버그제보</A>
          </div>
        </Grid>
      </Div>
    </Wrap>
  );
};
const A = styled.a`
  text-decoration-line: none;
  font-weight: 500;
  font-size: 100%;
  color: #8a8ba3;
  float: left;
  padding: 10px 0px;
  font-weight: 650;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Div = styled.div`
  margin: 20px 0px;
  border-top: 1px solid #c7c7c7;
  padding: 20px 30px;
  @media screen and (min-width: 935px) {
    border-bottom: none;
  }
`;

const Wrap = styled.div`
  bottom: 0;
  width: 100%;
  height: 6%;
  display: contents;
  padding: 30px;

  .footerLogo {
    width: 200px;
    height: 31px;
  }

  @media screen and (min-width:1024px) {
    bottom: 0;
    justify-items: space-between;
    margin: auto;
    width: 100%;
    height: 6%;
    font-size: 80%;

    .footerLogo {
      width: 200px;
      height: 31px;
    }
  }

  @media screen and (min-width:768px) and (max-width: 1023px)  {
    /* display: flex; */
    justify-items: space-between;
    width: 100%;
    font-size: 13px;
    margin: auto;

    .footerLogo {
      width: 120px;
      height: 21px;
      margin-top: 7px;
    }
  }

  @media screen and (max-width:767px) {
    .text{
      margin: auto;
    }
    width: 100%;
    font-size: 13px;

    .footerLogo {
      display: none;
    }
  }
`;

export default Footer;
