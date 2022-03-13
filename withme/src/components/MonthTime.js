import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userEditActions } from '../redux/modules/userEdit';

const MonthTime = ({ userId }) => {
  const dispatch = useDispatch();

  const month = useSelector((store) => store.userEdit.month);

  console.log('month', month);

  useEffect(() => {
    dispatch(userEditActions.timeGetDB(userId));
  }, []);

  return (
    <Container>
      {month.map((data, index) => {
        return (
          <Cell
            key={index}
            bg={
              // 색상 확인을 위해 임의값을 넣은거임 추후에 수정 필요!
              data.time === 0
                ? '#fff'
                : data.time > 10000
                ? '#8E94F2'
                : data.time > 8000
                ? '#BCC0FF'
                : data.time > 0
                ? '#E3E5FF'
                : ''
            }
          >
            {index + 1}
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
`;

const Cell = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  text-align: center;
  line-height: 30px;
  color: #33344b;
  font-size: 14px;
  font-family: 'Noto Sans';
`;

export default MonthTime;
