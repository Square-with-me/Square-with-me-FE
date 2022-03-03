import React from "react";
import styled from "styled-components";
import '../shared/App.css'


const Grid =(props) => {
    const {
        is_flex,
        width,
        margin,
        padding,
        bg,
        children,
        center, _font,
        _onClick,
        height,
        is_detail,
        } = props;

    const styles = {
        is_flex: is_flex,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
        center: center,
        _font: _font,
        _onClick: _onClick,
        height: height,
        is_detail : is_detail,
    }
    return (
        <React.Fragment>
            <GridBox {...styles} onClick={_onClick}>
                {children}
            </GridBox>
        </React.Fragment>
    )
}


Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: "100%",
    height: "auto",
    padding: false,
    margin: false,
    bg: false,
    center: false,
    _font: false,
    _onClick: () => {},
    is_detail : null,
}

const GridBox = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    box-sizing: border-box;
    ${(props) => props.height? `height: ${props.height};` : ""}
    ${(props) => props.padding? `padding: ${props.padding};` : ""}
    ${(props) => props.margin? `margin: ${props.margin};` : ""}
    ${(props) => props.bg? `background-color: ${props.bg};` : ""}
    ${(props) => props.is_flex? `display : flex; align-items: center; justify-content: space-between;` : ""}
    ${(props) => props.center? 'text-align: center': ""};
    ${(props) => props._font? `font-family : Yfont;` : ""}
    ${(props) => props.is_detail? `
    @media screen and (max-width: 1127px) { padding : 0px 40px 0px 40px }
    @media screen and (max-width: 743px) { padding : 0px }
    ` : ""}
`


export default Grid;