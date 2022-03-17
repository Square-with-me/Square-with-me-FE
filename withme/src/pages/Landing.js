import React, { useEffect } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import TypeIt from 'typeit';

import sqaure from '../assets/landing/sqaure.svg';
import SlickSlider from '../components/Landing/SimpleSlider';

import { ReactComponent as Logo } from '../assets/landing/logo.svg';
import { ReactComponent as Beauty } from '../assets/landing/beautyIcon.svg';
import { ReactComponent as Consulting } from '../assets/category/consultingIcon.svg';
import { ReactComponent as Culture } from '../assets/category/cultureIcon.svg';
import { ReactComponent as Exercise } from '../assets/category/exerciseIcon.svg';
import { ReactComponent as Other } from '../assets/category/otherIcon.svg';
import { ReactComponent as Study } from '../assets/category/studyIcon.svg';

const Landing = () => {
  useEffect(() => {
    new TypeIt('#typing', {
      strings: ['운동', '뷰티', '스터디', '상담', '문화', '기타'],
      speed: 250,
      autoStart: true,
      breakLines: false,
      waitUntilVisible: true,
      loop: true,
    }).go();
  }, []);

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
        <div className="logo-inner">
          <div className="logo">
            <Logo />
          </div>
          <div className="sports">
            <Exercise fill="#E4E2EB" width="105px" />
          </div>
          <div className="culture">
            <Culture fill="#E4E2EB" width="61px" />
          </div>
          <div className="study">
            <Study fill="#E4E2EB" width="81px" />
          </div>
          <div className="beauty">
            <Beauty fill="#E4E2EB" width="60px" />
          </div>
          <div className="counseling">
            <Consulting fill="#E4E2EB" width="95px" />
          </div>
          <div className="etc">
            <Other fill="#E4E2EB" width="77px" />
          </div>
        </div>
        <div className="welcome-heading">
          <span> 여러분의 일상을 실시간으로 생생하게 공유해봐요.</span>
          <h1>
            무엇이든 좋아요! 네모 안에 함께 하고 싶은걸 넣어봐요.
            <div className="typingBox">
              <em id="typing"></em>
              <p>WITH ME.</p>
            </div>
          </h1>
        </div>
        <div className="mouse">
          <span className="wheele"></span>
        </div>
      </section>
      <section className="vision"></section>
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
  display: flex;
  justify-content: center;
  header {
    position: fixed;
    top: 0;
    left: 0%;
    width: 100%;
    z-index: 999;

    .header-inner {
      max-width: 1300px;
      min-width: 660px;
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
    width: 1100px;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 10%;

    .logo-inner {
      width: 1100px;
      height: 300px;
      position: relative;

      .logo {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .sports {
        position: absolute;
        left: 150px;
        top: 0px;
        background-color: #f7f7f7;
        box-shadow: inset -6px -6px 10px rgba(255, 255, 255, 0.8),
          inset 6px 6px 10px rgba(0, 0, 0, 0.25);
      }

      .culture {
        position: absolute;
        left: 86px;
        top: 150px;
        background-color: #f7f7f7;
        box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
      }

      .study {
        position: absolute;
        left: 367px;
        top: 200px;
        background-color: #f7f7f7;
        box-shadow: inset -6px -6px 10px rgba(255, 255, 255, 0.8),
          inset 6px 6px 10px rgba(0, 0, 0, 0.25);
      }

      .beauty {
        position: absolute;
        left: 674px;
        top: 190px;
        background-color: #f7f7f7;
        box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
      }

      .counseling {
        position: absolute;
        left: 900px;
        top: 180px;
        background-color: #f7f7f7;
        box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
      }

      .etc {
        position: absolute;
        left: 950px;
        top: 0px;
        background-color: #f7f7f7;
        box-shadow: inset -6px -6px 10px rgba(255, 255, 255, 0.8),
          inset 6px 6px 10px rgba(0, 0, 0, 0.25);
      }
    }

    .welcome-heading {
      width: 750px;
      text-align: center;

      span {
        font-size: 24px;
      }

      h1 {
        font-size: 30px;
        font-weight: 600;
        line-height: 1.2em;
        margin-top: 15px;
        margin-bottom: 30px;

        .typingBox {
          margin: 10px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          column-gap: 3%;

          em {
            display: block;
            font-style: normal;
            color: #7179f0;
            border: 2px solid #7179f0;
            width: 20%;
            font-weight: 700;
          }
          p {
            color: #7179f0;
            font-weight: 900;
          }
        }
      }
    }
    .mouse {
      border: 2px solid #ccc;
      position: absolute;
      width: 32px;
      height: 45px;
      border-radius: 30px;
      bottom: 0%;
      left: 50%;
      transform: translate(-50%, -50%);

      .wheele {
        position: absolute;
        display: block;
        width: 4px;
        height: 15px;
        background-color: #ccc;
        border-radius: 4px;
        left: 12px;
        top: 10px;
        animation: wheele 1.5s linear infinite;
      }
    }
    @keyframes wheele {
      0% {
        top: 10px;
      }
      50% {
        top: 20px;
      }
      100% {
        top: 10px;
      }
    }
  }
  .vision {
  }
  .banner {
  }
  .feature {
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
