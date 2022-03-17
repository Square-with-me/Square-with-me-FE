import React from 'react';
import styled from 'styled-components';

const Landing = () => {
  return (
    <Container>
      {/* header */}
      <header>
        <div className="header-inner">
          <div className="logo">
            <a href="#none">
              <image src=""></image>
            </a>
          </div>
          <div className="gnb"></div>
        </div>
      </header>
      <section className="welcome"></section>
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
  max-width: 1110px;
  height: 100vh;
  margin: auto;

  background-color: skyblue;
  header {
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
