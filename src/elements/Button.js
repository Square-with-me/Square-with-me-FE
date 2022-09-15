import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const {
    text,
    _onClick,
    children,
    margin,
    width,
    padding,
    disable,
    bg,
    color,
    cursor,
    borderRadius,
    position,
    fontSize,
    alignItems,
    display,
  } = props;

  const styles = {
    margin,
    width,
    padding,
    color,
    bg,
    cursor,
    borderRadius,
    position,
    fontSize,
    alignItems,
    display,
  };

  return (
    <>
      <ElButton {...styles} onClick={_onClick} disabled={disable}>
        {text ? text : children}
      </ElButton>
    </>
  );
};

Button.defaultProps = {
  text: false,
  _onClick: () => {},
  children: null,
  margin: false,
  padding: '12px 0px',
  disable: false,
  color: '#fff',
  width: '100%',
  cursor: 'pointer',
  bg: '#000000',
  borderRadius: '5px',
  position: false,
  fontSize: null,
};

const ElButton = styled.button`
  box-sizing: border-box;
  border: none;
  border-radius: ${(props) => props.borderRadius};
  ${(props) => (props.width ? `width:${props.width};` : '')};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin:${props.margin};` : '')};
  cursor: ${(props) => props.cursor};
  position: ${(props) => props.position};
  ${(props) => (props.fontSize ? `font-size:${props.fontSize};` : '')};
  align-items: ${(props) => props.alignItems};
  ${(props) => (props.display ? `display: ${props.display}; ` : '')}
`;

export default Button;
