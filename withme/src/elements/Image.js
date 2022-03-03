import styled from 'styled-components';
import React from 'react';

const Image = (props) => {
  const { shape, src, width, height, _onClick } = props;

  const styles = {
    src: src,
    width: width,
    height: height,
  };

  if (shape === 'circle') {
    return <ImageCircle {...styles} onClick={_onClick}></ImageCircle>;
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles} onClick={_onClick}></AspectInner>
      </AspectOutter>
    );
  }

  return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
  shape: 'circle',
  src: '/img/logo.png',
  height: '35px',
  width: '35px',
  _onClick: null,
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 350px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

const ImageCircle = styled.div`
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  margin: 4px;
`;

export default Image;
