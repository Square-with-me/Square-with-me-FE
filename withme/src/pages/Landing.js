import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import smileIcon from '../assets/emoticon/smileIcon.svg';
import Logo from '../components/Main/Logo';

const Landing = () => {
  return (
    <Container>
      <header>
        <div className="header-inner">
          <div className="gnb">
            <a href="#none">서비스 설명</a>
            <a href="#none">튜토리얼</a>
            <a href="#none">사용후기</a>
            <a href="#none">시작하기</a>
          </div>
        </div>
      </header>
      <section className="welcome">
        <Logo></Logo>
      </section>
      <section className="ceo-access"></section>
      <section className="banner"></section>
      <section className="feature"></section>
      <section className="vision"></section>
      <section className="faq"></section>
      <section className="review"></section>
      <section className="focus"></section>
      <section className="guide"></section>
      <section className="news"></section>

      <footer></footer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fbfbfb;
  header {
    width: 100%;
    background-color: #c4c4c4;
    .header-inner {
      width: 1100px;
      margin: auto;
      overflow: hidden;
      height: 80px;
      display: flex;
      justify-content: right;
      align-items: center;
      .gnb {
        a {
          margin: 30px; // a 태그는 inine요소라서 위아래는 margin이 안걸린다.
          font-size: 25px;
          font-weight: 700;
          color: #000;
          text-decoration: none;
        }
      }
    }
  }
  .welcome {
  }
  .ceo-access {
  }
  .banner {
  }
  .feature {
  }
  .vision {
  }
  .faq {
  }
  .review {
  }
  .focus {
  }
  .guide {
  }
  .news {
  }

  footer {
  }
`;
export default Landing;
