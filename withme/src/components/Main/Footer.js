import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BugModal from '../Modal/BugModal';

const Footer = () => {
  const [bug, setBug] = useState(false);
  return (
    <Wrap>
      <Div>
        <Grid>
          <div className="footerLogo">
            <svg
              viewBox="0 0 204 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M94.2637 0.50827L0.195312 0L-1.4838e-05 30.4916L94.0684 30.9999L94.2637 0.50827Z"
                fill="#58596A"
                fillOpacity="0.3"
              />
              <path
                d="M122.641 6.94235L121.084 25.7157C119.971 25.9063 118.174 25.9439 116.956 25.8397C116.956 25.8397 116.956 25.8397 116.956 25.7932C116.127 23.1614 115.146 19.7029 114.582 16.7316C112.904 22.3194 112.455 25.5282 112.296 25.7701C111.183 25.9607 109.386 25.8537 108.012 25.7024L106.397 6.8152C106.397 6.8152 108.994 6.4409 110.631 6.78976C110.631 6.78976 111.542 13.1183 111.523 15.844C112.179 12.7343 112.67 10.6924 112.723 10.45C114.049 10.214 115.477 10.0765 117.007 10.5178C117.21 11.8817 117.254 12.9505 117.712 15.6321C117.945 12.861 118.512 7.26771 118.515 6.82892C119.841 6.63934 121.425 6.64722 122.591 6.89564C122.591 6.89048 122.642 6.89073 122.641 6.94235Z"
                fill="#58596A"
                fillOpacity="0.3"
              />
              <path
                d="M128.839 6.88318C128.782 7.85318 128.57 14.9073 128.562 16.0737C128.503 17.2914 128.395 24.8313 128.388 25.8015C128.388 25.848 128.337 25.8993 128.281 25.8991C127.063 26.1356 125.69 26.0823 124.161 25.8786C124.11 25.8783 124.054 25.8316 124.055 25.7335C124.112 24.8564 124.256 19.4586 124.265 18.0961C124.275 16.7337 124.549 7.93018 124.556 6.86187C124.557 6.76382 124.608 6.71762 124.664 6.7179C125.988 6.62642 127.361 6.5868 128.677 6.78431C128.784 6.78484 128.84 6.83157 128.839 6.88318Z"
                fill="#58596A"
                fillOpacity="0.3"
              />
              <path
                d="M142.027 6.95113C142.126 7.97369 142.062 9.23804 141.846 10.4036C141.845 10.45 141.738 10.5011 141.688 10.5009C141.267 10.4988 139.892 10.4455 138.567 10.4389C138.501 12.7253 138.425 15.4504 138.421 16.1318C138.362 17.3497 138.252 24.9836 138.246 25.8611C138.246 25.9076 138.195 25.9589 138.139 25.9587C136.92 25.9991 135.438 26.0433 133.957 25.9379C133.906 25.9376 133.907 25.8912 133.907 25.8396C133.963 25.0139 134.108 19.5172 134.118 18.1545C134.124 17.277 134.201 13.4369 134.278 10.4692C132.902 10.4624 131.207 10.4539 130.736 10.4516C130.629 10.4511 130.579 10.4044 130.579 10.3063C130.266 9.4272 130.386 7.43529 130.553 6.85282C130.553 6.80637 130.66 6.75528 130.767 6.75581C131.615 6.76002 136.482 6.73775 136.482 6.73775C136.482 6.73775 140.664 6.80498 141.932 6.8629C141.972 6.85278 142.027 6.89952 142.027 6.95113Z"
                fill="#58596A"
                fillOpacity="0.3"
              />
              <path
                d="M155.849 7.02549C155.842 7.99591 155.636 15.0513 155.628 16.2179C155.569 17.4358 155.46 24.9769 155.453 25.9473C155.453 25.9938 155.402 26.0452 155.346 26.0449C154.126 26.2814 152.751 26.2282 151.22 26.0244C151.169 26.0241 151.113 25.9774 151.114 25.8793C151.171 25.0021 151.314 19.7014 151.324 18.2923C150.639 18.2889 149.842 18.2384 149.365 18.2825C149.152 18.2815 148.573 18.2786 147.939 18.229C147.921 20.9028 147.84 25.1868 147.835 25.9147C147.835 25.9611 147.784 26.0125 147.728 26.0122C146.508 26.2488 145.133 26.1955 143.602 25.9917C143.551 25.9914 143.495 25.9447 143.496 25.8466C143.553 24.9694 143.697 19.5707 143.706 18.208C143.716 16.8452 143.991 8.04026 143.998 6.97177C143.999 6.87369 144.05 6.82749 144.106 6.82777C145.431 6.73628 146.807 6.69667 148.125 6.89421C148.232 6.89474 148.282 6.94143 148.281 6.99305C148.226 7.72061 148.141 11.9066 148.072 14.4356C148.864 14.4395 149.605 14.4432 149.605 14.4432C149.605 14.4432 150.453 14.401 151.407 14.4057C151.479 11.3915 151.611 7.69097 151.616 7.00962C151.617 6.91154 151.668 6.86534 151.724 6.86562C153.049 6.77412 154.425 6.73451 155.743 6.93205C155.85 6.92742 155.9 6.97413 155.849 7.02549Z"
                fill="#58596A"
                fillOpacity="0.3"
              />
              <path
                d="M181.789 7.50539C181.83 8.86845 181.843 15.0479 181.832 16.6998C181.77 18.2585 181.622 24.1945 181.555 25.748C181.554 25.9442 181.447 26.0417 181.289 26.0874C180.232 26.2267 178.907 26.2201 177.74 26.0698C177.583 26.069 177.478 25.9239 177.479 25.7742C177.487 24.5095 177.575 19.2082 177.648 16.8235C176.999 18.8646 176.559 20.8086 176.341 22.1704C176.34 22.315 176.233 22.4125 176.075 22.4634C174.697 22.7972 173.48 22.6466 172.319 22.4912C172.162 22.4439 172 22.345 172.001 22.1953C171.848 21.5131 171.436 19.4668 170.715 16.5465C170.647 18.9776 170.608 24.625 170.6 25.8381C170.599 25.9827 170.491 26.0802 170.334 26.1311C169.008 26.269 167.212 26.1156 166.578 26.0143C166.471 26.0138 166.365 25.9152 166.366 25.7707C166.425 24.6507 166.624 19.3964 166.634 18.0336C166.643 16.7224 167.119 8.84183 167.236 7.28338C167.237 7.1853 167.288 7.08747 167.395 7.088C168.665 6.99622 170.204 6.90578 171.259 7.0091C171.416 7.05634 171.578 7.15524 171.627 7.30519C171.942 8.13273 173.082 11.2513 174.474 16.1728C175.499 13.256 176.637 9.56538 177.551 7.28299C177.603 7.1387 177.71 7.08761 177.873 7.04196C178.985 7.00102 180.467 7.00839 181.522 7.20463C181.69 7.21063 181.79 7.35568 181.789 7.50539Z"
                fill="#58596A"
                fillOpacity="0.3"
              />
              <path
                d="M194.953 18.1804C194.952 18.325 194.794 18.4739 194.58 18.5193C193.519 18.6121 190.132 18.8843 187.541 18.5308C187.74 20.4778 188.203 22.5243 189.472 22.5306C191.061 22.492 191.338 20.5938 191.393 19.9591C191.444 19.8613 191.552 19.7638 191.658 19.7643C192.399 19.8144 192.981 20.0135 193.401 20.2582C194.821 21.0447 195.129 22.7961 194.222 24.0098C192.352 26.4834 189.497 26.2266 189.497 26.2266C182.194 26.0458 183.432 16.0275 183.432 16.0275C183.759 6.92855 189.736 7.1544 189.736 7.1544C189.736 7.1544 196.574 6.36762 194.953 18.1804ZM189.715 11.0051C188.446 11.0969 187.847 13.2826 187.621 15.0314C189.579 15.1856 191.27 15.0495 191.27 15.0495C191.395 13.2486 191.248 10.9147 189.715 11.0051Z"
                fill="#58596A"
                fillOpacity="0.3"
              />
              <path
                d="M198.58 24.1383C198.749 22.436 202.502 21.8715 202.589 24.6434C202.589 24.6434 202.579 26.2019 200.359 26.2373C200.359 26.2425 198.405 26.0367 198.58 24.1383ZM198.969 6.04566C198.972 5.75149 199.187 5.46355 199.395 5.36653C199.873 5.12634 200.507 5.03143 201.089 5.03433C201.722 5.08393 202.354 5.33479 202.723 5.48113C202.879 5.57997 203.04 5.77689 203.039 5.96784C203.34 8.64275 202.629 18.9561 202.514 21.0457C202.512 21.2883 202.354 21.4836 202.14 21.5806C201.611 21.8206 201.135 21.8698 200.658 21.8674C200.076 21.8181 199.601 21.6661 199.287 21.6181C199.075 21.5189 198.919 21.322 198.921 21.0795C198.954 15.578 199.007 7.89349 198.969 6.04566Z"
                fill="#58596A"
                fillOpacity="0.3"
              />
            </svg>
          </div>
          <div>
            <P>네모위드미 소개 &nbsp; | &nbsp; </P>
            <A href="https://github.com/Square-with-me">
              네모위드미 깃허브 &nbsp; | &nbsp;
            </A>
            <P>네모위드미 인스타그램 &nbsp; | &nbsp; </P>
            <P
              onClick={() => {
                setBug(true);
              }}
            >
              버그제보/리뷰
            </P>
            {bug && <BugModal />}
          </div>
        </Grid>
      </Div>
    </Wrap>
  );
};

const P = styled.p`
  font-size: 100%;
  font-weight: 500;
  margin: 10px 0px;
  color: #8a8ba3;
  float: left;
  font-weight: 650;
  cursor: pointer;
`;

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
  background-color: #f7f7f7;
  display: contents;
  padding: 30px;

  .footerLogo {
    width: 200px;
    height: 31px;
  }

  @media only screen and (min-width: 898px) {
    bottom: 0;
    justify-items: space-between;
    width: 100%;
    height: 6%;
    background-color: #f7f7f7;
  }

  @media only screen and (min-width: 691px) and (max-width: 898px) {
    bottom: 0;
    justify-items: space-between;
    margin: auto;
    width: 100%;
    height: 6%;
    background-color: #f7f7f7;
    font-size: 80%;

    .footerLogo {
      width: 120px;
      height: 21px;
      margin-top: 7px;
    }
  }

  @media only screen and (min-width: 525px) and (max-width: 691px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #f7f7f7;
    font-size: 10px;

    .footerLogo {
      display: none;
    }
  }

  @media only screen and (min-width: 0px) and (max-width: 525px) {
    position: relative;
    justify-items: center;
    justify-content: center;
    width: 100%;
    background-color: #f7f7f7;
    font-size: 10px;

    .footerLogo {
      display: none;
    }
  }
`;

export default Footer;
