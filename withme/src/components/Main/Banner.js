import React, { useState } from "react";
import "../../styles/banner.css";
import Event from "../Modal/Event";

const Banner = () => {
  //버그제보쪽 이벤트 모달 열기
  const [event, setEvent] = useState(false);
  //리뷰작성쪽 바로 진입 (새 페이지로)
  const CoffeeEvent = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSfjH1T4DhQp6fqdaB9Ordtpe3NMKw0bZAAl4IHTfc6e2ItN8w/viewform?usp=sf_link"
    );
  };
  return (
    <React.Fragment>
      <div className="slide">
        <ul>
          <li
            onClick={() => {
              setEvent(true);
            }}
          ></li>
          <li onClick={CoffeeEvent}></li>
          <li></li>
          <li></li>
        </ul>
        {event === true ? <Event setEvent={setEvent} /> : ""}
      </div>
    </React.Fragment>
  );
};

export default Banner;
