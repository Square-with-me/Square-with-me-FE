import React from "react";
import styled from "styled-components";

const Room = () => {
  return(
    <React.Fragment>
        <Container>

        </Container>
    </React.Fragment>
  )
   
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 254px);
  grid-gap: 30px;
  grid-template-rows: 184px;
  box-sizing: border-box;
  cursor: pointer;
`;

export default Room;
