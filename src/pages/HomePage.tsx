import styled from 'styled-components';

import HomeNavContainer from '../containers/HomePage/HomeNavContainer';
import HomeFooter from '../components/Footer/HomeFooter';

function HomePage() {

  return (
    <Wrapper>
      <HomeNavContainer />
      
      <section className="welcome">
          <div className="logo-inner utd wow">
            <div className="logo">
              {/* <img src={logo} /> */}
            </div>
            <div className="sports ltr wow">
              {/* <Exercise fill="#E4E2EB" width="105px" /> */}
            </div>
            <div className="culture ltr wow">
              {/* <Culture fill="#E4E2EB" width="61px" /> */}
            </div>
            <div className="study ltr wow">
              {/* <Study fill="#E4E2EB" width="81px" /> */}
            </div>
            <div className="beauty rtl wow">
              {/* <Beauty fill="#E4E2EB" width="60px" /> */}
            </div>
            <div className="counseling rtl wow">
              {/* <Consulting fill="#E4E2EB" width="95px" /> */}
            </div>
            <div className="etc rtl wow">
              {/* <Other fill="#E4E2EB" width="77px" /> */}
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
                  {/* <img src={landing1}></img> */}
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
                  {/* <img src={landing2}></img> */}
                </div>
                <div>
                  <p>얻고 싶거나 알려주고 싶은</p>
                  <p>
                    <span>팁을 쉽게 공유</span>해요
                  </p>
                </div>
              </div>
              <div className="focus-item utd wow" data-wow-delay="0.5s">
                <div className="img-box">
                  {/* <img src={landing3}></img> */}
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
                {/*  */}
              </div>
            </div>
            <p className="msg">
              다양한 카테고리! 수 많은 방 중 원하는 곳에 참여하세요.
            </p>
          </div>
        </section>
        <section className="tutorial" id="feature2">
          <p>방을 만들고, 함께 시작해볼까요?</p>
          <div style={{ position: 'relative' }}>
            {/* <img src={iMac} alt="imac" />
            <video src={exVideo} autoPlay muted loop></video> */}
          </div>
        </section>
        <section className="review" id="feature3">
          {/* <Slider {...settings}>
            <div>
              <div className="review-box">
                <p className="content">
                  “로나코 시국에 집에서 친구들이랑 얼굴보고 떠들면서 랜선 술자리
                  했어요 채팅도 보낼수 있고, 얼마나 있었는지 알아서 너무
                  신기하고 즐거웠어요 ㅋㅋㅋㅋ“
                </p>
                <p className="nickname">- JINI</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “집에서 친구들화 함께 공부하니까 집중도 더 잘되고 모르는걸
                  실시간으로 물어보면서 하니까 더 도움이 되는거 같아요“
                </p>
                <p className="nickname">- 빛날 광!</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “회사 가기 전 아침에 친구랑 얼굴보면서 화장했는데
                  웃기더라구요ㅋㅋㅋ 종종 들어와서 화장하고 가려구요 타이머
                  있어서 시간 체크 해보니까 화장시간 너무 기네요“
                </p>
                <p className="nickname">- 나말리지마</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “요즘 취미가 운동이거든요? 근데 사실 헬린이라서 운동 잘
                  못하는데 알려달라고 방 만들었더니 모르는 분이 와서 알려주고
                  한참 웃다가 끝났네요 ㅋㅋ“
                </p>
                <p className="nickname">- 후니라고해</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “제가 요즘 진로에 고민이 많은데 친구들 한테 말하긴 좀
                  그렇잖아요 그래서 모르는 사람한테 털어놓고 싶어서 왔는데
                  생각보다 마음에 위로가 되네요“
                </p>
                <p className="nickname">- 슙</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “내가 활동한 시간이 눈으로 보이니까 재밌네요 ㅋㅋ 버즈 준다고
                  하셔서 열심히 써봤는데 그냥 친구랑 떠드는 것도 재밌네요 ~~“
                </p>
                <p className="nickname">- won two three</p>
              </div>
            </div>
            <div>
              <div className="review-box">
                <p className="content">
                  “친구랑 얼굴 보면서 각자 영화봤는데ㅋㅋㅋㅋ 앞에서 친구 얼굴
                  보면서 영화보니까 재밌고 색다르더라구요?ㅋㅋㅋㅋㅋㅋㅋㅋ“
                </p>
                <p className="nickname">- 나는 쪙이댜</p>
              </div>
            </div>
          </Slider> */}
        </section>
        
        <HomeFooter />
    </Wrapper>
  )
}

export default HomePage;

const Wrapper = styled.div`
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    font-family: 'Noto Sans', 'Apple SD Gothic Neo', 'Sans-serif';
  }
  section {
    width: 80vw;
    @media screen and (max-width: 767px) {
      margin-top: 0;
      width: 100vw;
    }
  }
  header {
    background-color: #fff;
    box-shadow: -6px -6px 8px #ffffff, 0px 0px 8px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 0;
    left: 0%;
    width: 100%;
    z-index: 999;
    width: 100vw;
    .header-inner {
      margin: auto;
      width: 90%;
      overflow: hidden;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo img {
        width: 500px;
        background-color: #33344b;
        height: 50px;
      }
      .mobile-menu {
        display: none;
      }
      .gnb {
        .cencel {
          margin: 20px;
          display: none;
        }
        a {
          margin: 20px; // a 태그는 inine요소라서 위아래는 margin이 안걸린다.
          font-size: 1.3rem;
          font-weight: 900;
          text-decoration: none;
          color: #666;
          word-break: keep-all;
        }
        div {
          display: inline;
          margin: 20px;
          font-size: 1.3rem;
          font-weight: 900;
          text-decoration: none;
          color: #666;
          word-break: keep-all;
        }
      }
    }
    @media screen and (max-width: 860px) {
      background-color: none;
      box-shadow: none;
      .header-inner {
        display: flex;
        .mobile-menu {
          display: block;
        }
        .gnb {
          background-color: #fff;
          box-shadow: -3px 0 3px rgba(0, 0, 0, 0.15);
          width: 250px;
          height: 100vh;
          position: fixed;
          top: 0;
          right: -270px;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
          .cencel {
            display: block;
          }
          a {
            font-size: 18px;
          }
          div {
            font-size: 18px;
          }
        }
        .gnb.active {
          right: 0px;
        }
      }
    }
  }
  .welcome {
    height: 100vh;
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
        left: 17%;
        top: -10%;
        background-color: #f7f7f7;
        box-shadow: inset -6px -6px 10px rgba(255, 255, 255, 0.8),
          inset 6px 6px 10px rgba(0, 0, 0, 0.25);
      }
      .culture {
        position: absolute;
        left: 35%;
        top: 45%;
        background-color: #f7f7f7;
        box-shadow: inset -6px -6px 10px rgba(255, 255, 255, 0.8),
          inset 6px 6px 10px rgba(0, 0, 0, 0.25);
      }
      .study {
        position: absolute;
        left: 25%;
        top: 50%;
        background-color: #f7f7f7;
        box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
      }
      .beauty {
        position: absolute;
        left: 50%;
        top: 65%;
        background-color: #f7f7f7;
        box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
      }
      .counseling {
        position: absolute;
        left: 70%;
        top: 50%;
        background-color: #f7f7f7;
        box-shadow: inset -6px -6px 10px rgba(255, 255, 255, 0.8),
          inset 6px 6px 10px rgba(0, 0, 0, 0.25);
      }
      .etc {
        position: absolute;
        left: 75%;
        top: 0;
        background-color: #f7f7f7;
        box-shadow: -6px -6px 8px #ffffff, 6px 6px 8px rgba(0, 0, 0, 0.15);
      }
    }
    .welcome-heading {
      width: 755px;
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
    // 로고 없애기
    @media screen and (max-width: 1400px) {
      .logo-inner {
        height: 100px;
        .sports {
          display: none;
        }
        .culture {
          display: none;
        }
        .study {
          display: none;
        }
        .beauty {
          display: none;
        }
        .counseling {
          display: none;
        }
        .etc {
          display: none;
        }
      }
    }
    @media screen and (max-width: 767px) {
      height: auto;
      .logo-inner {
        height: 100px;
      }
      .logo {
        display: none;
      }
      .welcome-heading {
        width: auto;
        word-break: keep-all;
        span {
          font-size: 16px;
        }
        h1 {
          font-size: 22px;
        }
      }
      .mouse {
        display: none;
      }
    }
  }
  .focus {
    padding-top: 30px;
    .focus-inner {
      height: 764px;
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
          justify-content: flex-start;
          row-gap: 30px;
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
              background-color: rgba(188, 192, 255, 0.7);
              position: absolute;
              display: inline-block;
              bottom: 1px;
              left: 0;
              z-index: -1;
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
          margin: 10px;
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
        word-break: keep-all;
        text-align: center;
      }
    }
    @media screen and (max-width: 767px) {
      width: 100vw;
      height: auto;
      word-break: keep-all;
      .focus-inner {
        .focus-content {
          width: 100%;
          .focus-item {
            .img-box {
              width: 150px;
              height: 150px;
            }
          }
        }
        .slider {
          width: 100%;
          height: 110px;
          .categorySlider {
            width: 100%;
            height: 50px;
          }
          .categorySlider2 {
            width: 100%;
            height: 50px;
          }
          .category-box {
            width: 160px;
            height: 100%;
            margin: 10px;
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
      }
    }
    @media screen and (max-width: 420px) {
      width: 100vw;
      height: auto;
      word-break: keep-all;
      .focus-inner {
        .focus-content {
          .focus-item {
            .img-box {
              width: 120px;
              height: 120px;
            }
          }
        }
      }
    }
  }
  .tutorial {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    p {
      font-size: 24px;
      line-height: 36px;
      font-weight: 700;
    }
    img {
      width: 600px;
    }
    video {
      /* width: 550px; */
      height: 290px;
      position: absolute;
      left: 4%;
      top: 6%;
    }
    @media screen and (max-width: 767px) {
      img {
        display: none;
      }
      video {
        height: 200px;
        position: relative;
        margin: auto;
        left: 0;
        top: 0;
      }
    }
  }
  .review {
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
          font-weight: 600;
          font-size: 1.3rem;
          line-height: 35px;
          display: -webkit-box;
          word-wrap: break-word;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nickname {
          color: #000000;
        }
      }
    }
  }
  footer {
    width: 80vw;
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