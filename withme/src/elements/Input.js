import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from './Index';

function Input(props) {
  const { label, placeholder, _onChange, type, multiLine } = props;

  if (multiLine) {
    return (
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElTextarea
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <InputBox placeholder={placeholder} type={type} onChange={_onChange} />
  );
}

Input.defaultProps = {
  multiLine: false,
  label: '텍스트',
  placeholder: '',
  type: 'text',
  _onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const InputBox = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: static;
  width: 488px;
  height: 50px;
  background: #FFFFFF;
  border-radius: 4px;
  margin: 10px 0px;
`;

export default Input;
