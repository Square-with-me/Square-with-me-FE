import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../assets/main/searchIcon.svg';
import { actionCreators as roomActions } from '../../redux/modules/room';
import { useDispatch } from 'react-redux';

const SearchBar = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <SearchBarWrap>
        <SearchBarInput
          placeholder="방 정보를 입력해주세요"
          onChange={(e) => props.setSearch(e.target.value)}
        />
        <Search
          style={{
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            margin: 'auto 20px',
            position: 'absolute',
            fill: '#33344B',
          }}
          onClick={() => {
            dispatch(roomActions.searchRoomDB(props.search));
          }}
        />
      </SearchBarWrap>
    </React.Fragment>
  );
};

//searchbar
const SearchBarWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  position: relative;
  align-items: center;
  margin: 0px auto 19px auto;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #8a8ba3;
  border-radius: 4px;
  padding: 10px;

  &:focus {
    background-color: transparent;
    outline-color: #7179f0;
    box-shadow: 0px 0px 6px rgba(113, 121, 240, 0.3);
  }
`;
export default SearchBar;
