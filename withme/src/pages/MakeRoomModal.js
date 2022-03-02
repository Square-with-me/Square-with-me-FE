import React from "react"
import styled from "styled-components";
import {AiOutlineClose} from "react-icons/ai"

const MakeRoomModal =({setMRooms})=>{
    return (
        <React.Fragment>
            <Black onClick={()=>{setMRooms(false)}}/>
            <Wrap>
                <Headers>
                    <AiOutlineClose style={{cursor:"pointer"}} onClick={()=>{setMRooms(false)}}/>
                    <div style={{marginRight:"40%"}}>방 만들기!</div>
                </Headers>
                
            </Wrap>
        </React.Fragment>
    )
}

const Black = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    background-color: rgba(0,0,0,0.50);
`
const Wrap = styled.div`
    width: 600px;
    max-width: 60%;
    z-index: 10;
    max-height: 50%;
    display: flex;
    flex-direction: column;
    box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
`

const Headers = styled.div`
    -webkit-box-pack: justify;
    -webkit-box-align: center ;
    display: flex ;
    flex: 0 0 auto ;
    align-items: center ;
    justify-content: space-between ;
    padding: 0px 24px ;
    min-height: 48px ;
    border-bottom: 1px solid rgb(235, 235, 235);
    color: rgb(34, 34, 34) ;
    font-size: 16px ;
    line-height: 20px ;
    font-weight: 800;
`
export default MakeRoomModal