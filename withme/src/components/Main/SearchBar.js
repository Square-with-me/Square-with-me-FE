import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
//icons
import { ReactComponent as Search } from "../../assets/main/searchIcon.svg";
import { actionCreators as roomActions } from "../../redux/modules/room";

const SearchBar = (props) => {
  const dispatch = useDispatch();

  function onKeyPress(e) {
    if (e.key === "Enter") {
      dispatch(roomActions.emptyRoom());
      dispatch(roomActions.searchRoomDB(props.search, 1));
      props.setIsSearch(true);
      props.setPageNum(2);
    }
  }

  return (
    <React.Fragment>
      <SearchBarWrap>
        <SearchBarInput
          placeholder="방 제목를 입력해주세요. (방 제목만 검색 가능합니다)"
          onChange={(e) => props.setSearch(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <Search
          className="search"
          style={{
            cursor: "pointer",
            width: "30px",
            height: "30px",
            margin: "auto 10px",
            position: "absolute",
            fill: "#33344B",
          }}
          onClick={() => {
            dispatch(roomActions.emptyRoom());
            dispatch(roomActions.searchRoomDB(props.search, 1));
            props.setIsSearch(true);
            props.setPageNum(2);
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
  @media screen and (min-width: 550px) and (max-width: 812px) {
    margin: 0px;
  }
  @media screen and (max-width: 550px) {
    margin: 0px;
  }
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #ceced9;
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;
  @media screen and (max-width: 550px) {
    ::placeholder {
      font-size: 12px;
    }
  }
  &:focus {
    border: none;
    outline: 1px solid #7179f0;
    box-shadow: 0px 0px 6px rgba(113, 121, 240, 0.3);
  }
`;
export default SearchBar;
