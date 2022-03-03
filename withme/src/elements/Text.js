import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  // children : 들어갈 텍스트 내용
  const {
    bold,
    color,
    size,
    children,
    font,
    is_center,
    _onClick,
    is_contents,
  } = props;

  const styles = { bold, color, size, font, is_center, is_contents };
  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: '#222831',
  size: '14px',
  font: null,
  is_center: null,
  _onClick: null,
  is_contents: null,
};

const P = styled.p`
  width: 100%;
  ${(props) => (props.font ? `font-family: ${props.font}` : '')};
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  height: ${(props) => props.size};
  ${(props) => (props.is_center ? 'text-align: center' : '')};
  margin-bottom: 5px;
  ${(props) =>
    props.is_contents
      ? 'width:100px; overflow:hidden; text-overflow:ellipsis; white-space:pre-line;'
      : ''};
`;

export default Text;