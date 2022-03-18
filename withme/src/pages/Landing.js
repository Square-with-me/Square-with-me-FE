import React, { useEffect } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import TypeIt from 'typeit';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WOW from 'wowjs';

import { ReactComponent as Logo } from '../assets/landing/logo.svg';
import { ReactComponent as Beauty } from '../assets/landing/beautyIcon.svg';
import { ReactComponent as Consulting } from '../assets/category/consultingIcon.svg';
import { ReactComponent as Culture } from '../assets/category/cultureIcon.svg';
import { ReactComponent as Exercise } from '../assets/category/exerciseIcon.svg';
import { ReactComponent as Other } from '../assets/category/otherIcon.svg';
import { ReactComponent as Study } from '../assets/category/studyIcon.svg';
import exVideo from '../assets/videos/exVideo.mov';
import landing1 from '../assets/landing/landing.jpeg';
import landing2 from '../assets/landing/landing2.jpeg';
import landing3 from '../assets/landing/landing3.jpeg';

import iMac from '../assets/videos/imac.png';
import Footer from '../components/Main/Footer';

const Landing = () => {
  // TypeIt
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

  // WOW
  useEffect(() => {
    new WOW.WOW({
      boxClass: 'wow',
      offset: 150,
      mobile: true,
    }).init();
  }, []);

  // focus slier
  useEffect(() => {
    slide();
    slide2();
  });

  // review slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // 자동 스크롤 사용 여부
    autoplaySpeed: 3000,
  };

  const slide = () => {
    var bannerLeft = 0;
    var first = 1;
    var last;
    var imgCnt = 0;
    var $img = $('.categorySlider .category-box');
    var $first;
    var $last;

    $img.each(function () {
      // 5px 간격으로 배너 처음 위치 시킴
      $(this).css('left', bannerLeft);
      bannerLeft += $(this).width() + 5;
      $(this).attr('id', 'banner' + ++imgCnt); // img에 id 속성 추가
    });

    if (imgCnt > 8) {
      //배너 8개 이상이면 이동시킴
      last = imgCnt;

      setInterval(function () {
        $img.each(function () {
          $(this).css('left', $(this).position().left - 1); // 1px씩 왼쪽으로 이동
        });
        $first = $('#banner' + first);
        $last = $('#banner' + last);
        if ($first.position().left < -300) {
          // 제일 앞에 배너 제일 뒤로 옮김
          $first.css('left', $last.position().left + $last.width() + 5);
          first++;
          last++;
          if (last > imgCnt) {
            last = 1;
          }
          if (first > imgCnt) {
            first = 1;
          }
        }
      }, 50); //여기 값을 조정하면 속도를 조정할 수 있다.(위에 1px 이동하는 부분도 조정하면
    }
  };

  const slide2 = () => {
    var bannerLeft = 0;
    var first = 1;
    var last;
    var imgCnt = 0;
    var $img = $('.categorySlider2 .category-box');
    var $first;
    var $last;

    $img.each(function () {
      // 5px 간격으로 배너 처음 위치 시킴
      $(this).css('left', bannerLeft);
      bannerLeft += $(this).width() + 5;
      $(this).attr('id', 'banner2' + ++imgCnt); // img에 id 속성 추가
    });

    if (imgCnt > 8) {
      //배너 8개 이상이면 이동시킴
      last = imgCnt;

      setInterval(function () {
        $img.each(function () {
          $(this).css('left', $(this).position().left - 1); // 1px씩 왼쪽으로 이동
        });
        $first = $('#banner2' + first);
        $last = $('#banner2' + last);
        if ($first.position().left < -300) {
          // 제일 앞에 배너 제일 뒤로 옮김
          $first.css('left', $last.position().left + $last.width() + 5);
          first++;
          last++;
          if (last > imgCnt) {
            last = 1;
          }
          if (first > imgCnt) {
            first = 1;
          }
        }
      }, 25); //여기 값을 조정하면 속도를 조정할 수 있다.(위에 1px 이동하는 부분도 조정하면
    }
  };

  return (
    <>
      <Container>
        <header className="active">
          <div className="header-inner">
            <div className="gnb">
              <a href="#feature1">서비스 설명</a>
              <a href="#feature2">튜토리얼</a>
              <a href="#feature3">사용후기</a>
              <a href="/">시작하기</a>
            </div>
          </div>
        </header>
        <section className="welcome">
          <div className="logo-inner utd wow">
            <div className="logo ">
              <Logo />
            </div>
            <div className="sports ltr wow">
              <Exercise fill="#E4E2EB" width="105px" />
            </div>
            <div className="culture ltr wow">
              <Culture fill="#E4E2EB" width="61px" />
            </div>
            <div className="study ltr wow">
              <Study fill="#E4E2EB" width="81px" />
            </div>
            <div className="beauty rtl wow">
              <Beauty fill="#E4E2EB" width="60px" />
            </div>
            <div className="counseling rtl wow">
              <Consulting fill="#E4E2EB" width="95px" />
            </div>
            <div className="etc rtl wow">
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
        <section className="focus" id="feature1">
          <div className="focus-inner">
            <div className="focus-content">
              <div className="focus-item utd wow" data-wow-delay="0">
                <div className="img-box">
                  <img src={landing1}></img>
                </div>
                <div>
                  <p>
                    <span>서로를 응원</span>하며 집중력과
                  </p>
                  <p>성취도를 높여봐요</p>
                </div>
              </div>
              <div className="focus-item utd wow" data-wow-delay="0.25s">
                <div className="img-box">
                  <img src={landing2}></img>
                </div>
                <div>
                  <p>얻고 싶거나 알려주고 싶은</p>
                  <p>
                    <span>팁을 쉽게 공유</span>헤요
                  </p>
                </div>
              </div>
              <div className="focus-item utd wow" data-wow-delay="0.5s">
                <div className="img-box">
                  <img src={landing3}></img>
                </div>
                <div>
                  <p>
                    <span>공통 관심사</span>를 가지고 있는
                  </p>
                  <p>
                    친구와 <span>소통</span>해요
                  </p>
                </div>
              </div>
            </div>
            <div className="slider">
              <div className="categorySlider">
                <div className="category-box">
                  <div className="category">
                    운동
                    <Exercise width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category" fill="#7179f0">
                    뷰티
                    <Beauty width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    스터디
                    <Study width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    상담
                    <Consulting width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    문화
                    <Culture width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    기타
                    <Other width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    운동
                    <Exercise width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category" fill="#7179f0">
                    뷰티
                    <Beauty width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    스터디
                    <Study width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    상담
                    <Consulting width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    문화
                    <Culture width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    기타
                    <Other width="32px" fill="#7179f0" />
                  </div>
                </div>
              </div>
              <div className="categorySlider2">
                <div className="category-box">
                  <div className="category" fill="#7179f0">
                    뷰티
                    <Beauty width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    스터디
                    <Study width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    상담
                    <Consulting width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    문화
                    <Culture width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    기타
                    <Other width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    운동
                    <Exercise width="32px" fill="#7179f0" />
                  </div>
                </div>

                <div className="category-box">
                  <div className="category" fill="#7179f0">
                    뷰티
                    <Beauty width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    스터디
                    <Study width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    상담
                    <Consulting width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    문화
                    <Culture width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    기타
                    <Other width="32px" fill="#7179f0" />
                  </div>
                </div>
                <div className="category-box">
                  <div className="category">
                    운동
                    <Exercise width="32px" fill="#7179f0" />
                  </div>
                </div>
              </div>
            </div>
            <p className="msg">
              다양한 카테고리! 수 많은 방 중 원하는 곳에 참여하세요.
            </p>
          </div>
        </section>
        <section className="tutorial" id="feature2">
          <p>방을 만들고, 함께 시작해볼까요?</p>
          <img src={iMac} alt="imac" />
          {/* <video src={exVideo} autoPlay muted loop></video> */}
        </section>
        <section className="review" id="feature3">
          <Slider {...settings}>
            <div>
              <div className="review-box">
                <p className="content">
                  “비슷한 관심사를 가진 사람들이랑 직접 얼굴을 보고 다양한
                  주제로 무얼하니 더 즐거워요 !“
                </p>
                <p className="nickname">- 지금 잘 시간</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “비슷한 관심사를 가진 사람들이랑 직접 얼굴을 보고 다양한
                  주제로 무얼하니 더 즐거워요 !“
                </p>
                <p className="nickname">- 지금 잘 시간</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “비슷한 관심사를 가진 사람들이랑 직접 얼굴을 보고 다양한
                  주제로 무얼하니 더 즐거워요 !“
                </p>
                <p className="nickname">- 지금 잘 시간</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “비슷한 관심사를 가진 사람들이랑 직접 얼굴을 보고 다양한
                  주제로 무얼하니 더 즐거워요 !“
                </p>
                <p className="nickname">- 지금 잘 시간</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “비슷한 관심사를 가진 사람들이랑 직접 얼굴을 보고 다양한
                  주제로 무얼하니 더 즐거워요 !“
                </p>
                <p className="nickname">- 지금 잘 시간</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “비슷한 관심사를 가진 사람들이랑 직접 얼굴을 보고 다양한
                  주제로 무얼하니 더 즐거워요 !“
                </p>
                <p className="nickname">- 지금 잘 시간</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “비슷한 관심사를 가진 사람들이랑 직접 얼굴을 보고 다양한
                  주제로 무얼하니 더 즐거워요 !“
                </p>
                <p className="nickname">- 지금 잘 시간</p>
              </div>
            </div>
          </Slider>
        </section>
        <footer>
          <Footer />
        </footer>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    margin-top: 100px;
  }

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
          font-weight: 500;
          text-decoration: none;
          color: #000;
        }
      }
    }
  }

  header.active {
    background-color: #fff;
    box-shadow: -6px -6px 8px #ffffff, 0px 0px 8px rgba(0, 0, 0, 0.15);
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
    margin-top: 0;

    .logo-inner {
      width: 100%;
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
  .focus {
    padding-top: 40px;
    .focus-inner {
      width: 1100px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 50px;

      .focus-content {
        width: 80%;
        height: 280px;
        display: flex;
        justify-content: space-around;

        .focus-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          .img-box {
            width: 196px;
            height: 196px;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
            padding: 6px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          p {
            font-size: 20px;
            line-height: 25px;
            font-weight: 700;
            text-align: center;

            span {
              position: relative;
            }
            span::after {
              content: '';
              width: 100%;
              height: 15px;
              background-color: rgba(188, 192, 255, 0.5);
              position: absolute;
              display: inline-block;
              bottom: 1px;
              left: 0;
            }
          }
        }
      }

      .slider {
        width: 100%;
        height: 170px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .categorySlider {
          width: 100%;
          height: 78px;
          display: flex;
          position: relative;
          overflow: hidden;
          align-items: center;
        }

        .categorySlider2 {
          width: 100%;
          height: 78px;
          display: flex;
          position: relative;
          overflow: hidden;
          align-items: center;
        }

        .category-box {
          width: 160px;
          height: 100%;
          position: absolute;

          .category {
            box-sizing: border-box;
            width: 150px;
            height: 100%;
            border: 4px solid #7179f0;
            border-radius: 50px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 10%;

            font-size: 28px;
            font-weight: 700;
            color: #7179f0;
          }
        }
      }

      p.msg {
        font-size: 24px;
        font-weight: 700;
        color: #33344b;
      }
    }
  }
  .tutorial {
    width: 1100px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    position: relative;

    p {
      font-size: 24px;
      line-height: 36px;
      font-weight: 700;
    }

    img {
      width: 50%;
      position: relative;
    }

    video {
      width: 510px;
      position: absolute;
      top: 220px;
    }
  }

  .review {
    width: 1100px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    margin-top: 0;

    div {
      width: 100%;
      height: 302px;

      .review-box {
        width: 80%;
        height: 98%;
        margin: auto;
        background-color: #f7f7f7;
        box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
        padding: 18px 19px 18px 19px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .content {
          font-weight: 700;
          font-size: 20px;
          line-height: 30px;
        }

        .nickname {
          color: #000000;
        }
      }
    }
  }

  footer {
    width: 1100px;
  }

  .ltr {
    animation: ltr 0.5s linear both; // both가 없으면 0 -> 100 -> 0 이 된다.
  }

  .rtl {
    animation: rtl 0.5s linear both;
  }

  .utd {
    animation: utd 0.5s linear both;
  }

  // 왼쪽에서 오른쪽
  @keyframes ltr {
    0% {
      transform: translateX(-100px);
      opacity: 0;
    }
    100% {
      transform: translateX(0); // 제자리
      opacity: 1;
    }
  }
  // 오른쪽에서 왼쪽
  @keyframes rtl {
    0% {
      transform: translateX(100px);
      opacity: 0;
    }
    100% {
      transform: translateX(0); // 제자리
      opacity: 1;
    }
  }

  // 위에서 아래로
  @keyframes utd {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0); // 제자리
      opacity: 1;
    }
  }
`;

export default Landing;
