import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/main/logo.svg";

const HomeFooter = () => {

  return (
    <footer>
      <Wrapper>
        <div className="div">
          <Logo className="logo" />
          <div className="text">
            <A className="a" href="/">
              네모위드미 소개 &nbsp; | &nbsp;{" "}
            </A>
            <A
              className="a"
              href="https://github.com/Square-with-me"
              target="_blank"
            >
              네모위드미 깃허브 &nbsp; | &nbsp;
            </A>
            <A
              className="a"
              href="#"
              target="_blank"
            >
              네모위드미 인스타그램 &nbsp; | &nbsp;{" "}
            </A>
            <A
              className="a"
              href="#"
              target="_blank"
            >
              버그제보
            </A>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default HomeFooter;

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
  @media screen and (max-width: 490px) {
    font-size: 4px;
  }
`;

const Wrapper = styled.div`
  bottom: 0;
  width: 100%;
  height: 6%;
  display: contents;
  .div {
    border-top: 1px solid #c7c7c7;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      margin: 0px;
    }
  }
  @media screen and (max-width: 875px) {
    .div {
      .logo {
        display: none;
      }
    .text {
      margin: auto;
    }
  }
  @media screen and (max-width: 490px) {
    .div {
      padding: 20px 0px;
      .logo {
        display: none;
      }
    }
  }
`;
