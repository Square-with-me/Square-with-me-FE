import styled from "styled-components";

import RoomsPageNavContainer from "../containers/RoomsPage/RoomsPageNavContainer";

function RoomsPage() {

  return (
    <Back>
      <Wrapper>
        <RoomsPageNavContainer />

        <div className="logo">
          {/* <Logo style={{ margin: 'auto' }} /> */}
        </div>
        <div className="searchbar">
          {/* <SearchBar
            search={search}
            setSearch={setSearch}
            setIsSearch={setIsSearch}
            pageNum={pageNum}
            setPageNum={setPageNum}
          /> */}
        </div>

        <div className="banner">
          {/* <Banner /> */}
        </div>

        <div className="menuList">
          {/* <MenuBar
            possible={possible}
            setPossible={setPossible}
            setChoiceCate={setChoiceCate}
            category={category}
            setCategory={setCategory}
            setPageNum={setPageNum}
            setIsSearch={setIsSearch}
          /> */}
        </div>

        <RoomListContainer>

        </RoomListContainer>

        <div className="morebtn">
          <Btn>더보기</Btn>
        </div>

        <div className="footer">
          {/* <FooterTest /> */}
        </div>

      </Wrapper>
    </Back>
  )
}

export default RoomsPage;

const Back = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  min-width: 390px;
  background-color: #f7f7f7;

  * {
    font-family: 'Noto Sans', 'Apple SD Gothic Neo', 'Sans-serif';
  }
`;

//share
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 30px;
  position: relative;
  min-height: 100vh;
  max-width: 1110px;
  min-width: 390px;
  margin: auto;

  .header {
    grid-column: 12/13;
    display: flex;
    justify-content: end;
    @media screen and (max-width: 1110px) {
      margin-right: 12px;
    }
  }
  .logo {
    grid-column: 1/13;
    display: flex;
    align-items: center;
    margin: 0px auto;
  }
  .searchbar {
    grid-column: 1/13;
    width: 524px;
    margin: auto;
    @media screen and (max-width: 563px) {
      grid-column: 1/13;
      width: 95%;
      margin: auto;
    }
  }
  .banner {
    grid-column: 1/13;
    width: 100%;
    margin: auto;
    @media screen and (max-width: 1110px) {
      width: 97%;
      margin: auto;
    }
  }
  .hotroomlist {
    grid-column: 1/13;
  }
  .menuList {
    grid-column: 1/13;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    @media screen and (max-width: 1110px) {
      width: 97%;
      margin: auto;
    }
  }
  .roomlist {
    grid-column: 1/13;
  }
  .morebtn {
    grid-column: 1/13;
    margin: auto;
  }
  .footer {
    grid-column: 1/13;
  }
  .flex {
    display: flex;
  }
`;

const Btn = styled.button`
  width: 78px;
  height: 51px;
  padding: 12px 14px;
  background-color: #bcc0ff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  transition: all 0.3s;

  :hover {
    background-color: #7179f0;
    color: #fff;
    box-shadow: 0 1px 5px rgb(113, 121, 240);
  }
  @media screen and (max-width: 563px) {
    font-size: 13px;
  }
`;

//room
const RoomListContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  place-items: center;
  position: relative;
  @media screen and (min-width: 1110px) {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
  }
  @media screen and (min-width: 813px) and (max-width: 1110px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
  @media screen and (min-width: 563px) and (max-width: 812px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
  @media screen and (max-width: 563px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
  `;