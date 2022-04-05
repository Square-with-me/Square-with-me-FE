import React from 'react';
import styled from 'styled-components';

const MonthTime = ({ month }) => {
  //getMonth는 인덱스가 0부터 시작해서 +1 해줘야 함
  const todayMonth = new Date().getMonth() + 1;
  return (
    <Container>
      {month.map((data, index) => {
        return (
          <Cell
            className="tooltip"
            key={index}
            bg={
              // 색상 확인을 위해 임의값을 넣은거임 추후에 수정 필요!
              data.time === 0
                ? '#fff'
                : data.time >= 120
                ? '#8E94F2'
                : data.time >= 60
                ? '#BCC0FF'
                : data.time > 0
                ? '#E3E5FF'
                : ''
            }
          >
            {index + 1}
            <span className="tooltiptext">
              {todayMonth}월 {index + 1}일 {data.time}분
            </span>
          </Cell>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  place-items: center;

  .tooltip {
    position: relative;
    display: inline-block;

    .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: rgba(0, 0, 0, 0.75);
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      top: 150%;
      left: 50%;
      margin-left: -60px;
      word-break: keep-all;

      &::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #555 transparent;
      }
    }

    &:hover .tooltiptext {
      visibility: visible;
    }
  }
`;

const Cell = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  text-align: center;
  line-height: 2.5rem;
  color: #33344b;
  font-size: 14px;
  font-family: 'Noto Sans', 'Apple SD Gothic Neo', 'Sans-serif';
  font-weight: 700;
  transition: all 0.5s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 5px 10px,
      rgba(0, 0, 0, 0.23) 0px 3px 3px;
  }
`;

export default MonthTime;
