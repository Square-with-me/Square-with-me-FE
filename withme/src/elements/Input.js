import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements/Index';

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
  border-radius: 5px;
  width: 100%;
  height: 40px;
  margin: 5px 0;
  background: rgb(250, 250, 250);
  border: 1px solid rgb(219, 219, 219);
  padding: 0 10px;
  font-family: 맑은 고딕;
`;
export default Input;