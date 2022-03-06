import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsonData from "../shared/responseJ.json"
import styled from "styled-components";
import "../styles/Drop.css"

//icons
import {RiArrowDropDownLine} from "react-icons/ri"
import { FaSearch } from "react-icons/fa";
import {FiLock, FiUnlock} from "react-icons/fi"
//pages
import MakeRoomModal from "./MakeRoomModal";
import Banner from "../components/Banner";
import Room from "../components/Room";
//redux
import { actionCreators as roomActions } from "../redux/modules/room";
import { actionCreators as userActions } from "../redux/modules/user";

const Main = () => {
  //드롭다운 부분
  const dropdownRef = useRef(null);

  //드롭여부 확인
  const [isActive, setIsActive]= useState(false)
  const Visible = (active)=>{
    setIsActive(active)
  }

  //카테고리
  const [beauty , setBeauty] = useState("")
  const [exercise, setExercise] =useState("")
  const [study, setStudy] = useState("")
  const [consulting, setConsulting] =useState("")
  const [culture, setCulture] =useState("")
  const [etc, setEtc] = useState("")

  const dispatch =useDispatch()

  const [MRooms, setMRooms] = useState(false);
  //검색
  const [search, setSearch] = useState("");
  //참여가능한 방
  const [possible, setPossible] =useState(false)
  console.log(search, possible)

  let roomList = useSelector((state) => state.room);
  // const hotRoom = useSelector((state)=>state.room.hotList)

  // React.useEffect(()=>{
  //   dispatch(roomActions.hotRoomDB())
  // },[])

  // React.useEffect(()=>{
  //   dispatch(userActions.NotMemberLoginCheckDB())
  // },[])
  
  const notUser_is_login = useSelector((state)=>state.user.notUser_is_login)
  const notUser_is_local = localStorage.getItem("notUser_is_login")? true: false

  return (
    <Wrap>
      <SearchBarWrap>
        <SearchBarInput placeholder="search.." onChange={(e) => setSearch(e.target.value)}/>
        <FaSearch style={{cursor:"pointer", width:"32px", height:"32px", margin:"auto", position:"absolute", marginRight:"20px", color:"#aaf"}} onClick={()=>{dispatch(roomActions.searchRoomDB(search))}}/>
      </SearchBarWrap>

      <Banner/>

      <MenuBar>
        <div>
          <Btn onClick={()=>{setPossible(false)}}> <Text>ALL</Text></Btn>
          <Btn onClick={()=>{setPossible(true)}}><Text>참여 가능</Text></Btn>
          <Btn><Text>관전 가능</Text></Btn>
        </div>

        <div className="container" >
          <div className="menu-container">
            <DropBtn onClick={()=> setIsActive(!isActive)} className="menu-trigger"><Text>카테고리</Text> <RiArrowDropDownLine/> </DropBtn>
            <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
              <ul>
                <li>
                  <a onChange={(e)=>setBeauty(e.target.value)} >뷰티</a>
                </li>
                <li>
                  <a onChange={(e)=>setExercise(e.target.value)}>운동</a>
                </li>
                <li>
                  <a onChange={(e)=>setStudy(e.target.value)}>스터디</a>
                </li>
                <li>
                  <a onChange={(e)=>setConsulting(e.target.value)}>상담</a>
                </li>
                <li>
                  <a onChange={(e)=>setCulture(e.target.value)}>문화</a>
                </li>
                <li>
                  <a onChange={(e)=>setEtc(e.target.value)}> 기타</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div></div>
      </MenuBar>
      
      <RoomListContainer>
        {possible === true ?
         jsonData.map((r, idx) => {
          return (
            <RoomCard>
            {r.members==="4" || r.isSecrect ==="false"?            
              null:
              <div>
                <div>{r.roomNumber}</div>
                <div>{r.roomTitle}</div>
                <div>{r.category}</div>
                <div>{r.tags}</div>
                <div>{r.isSecrect==="false"?<FiUnlock/> :<FiLock/>}</div>
              </div>
            }
            </RoomCard>
          );
        })
        : jsonData.map((r, idx) => {
          return (
            <RoomCard>
              {r.members==="4"?
              <div style={{backgroundColor:"gray"}}>
                <div>{r.roomNumber}</div>
                <div>{r.roomTitle}</div>
                <div>{r.category}</div>
                <div>{r.tags}</div>
                <div>{r.isSecrect==="false"?<FiUnlock/> :<FiLock/>}</div>
              </div>:
              <div>
                <div>{r.roomNumber}</div>
                <div>{r.roomTitle}</div>
                <div>{r.category}</div>
                <div>{r.tags}</div>
                <div>{r.isSecrect==="false"?<FiUnlock/> :<FiLock/>}</div>
              </div>}
            </RoomCard>           
          );
        })}
      </RoomListContainer>

      <Btn>더보기</Btn>

    </Wrap>
  );
};

//share
const Wrap = styled.div`
width: 1110px;
margin: auto;
`
const Btn = styled.button`
padding: 14px;
border: none;
border-radius: 5px;
margin-right: 16px;
background-color: #aaf;
:hover{
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
}
`
const Text = styled.div`
size: 2rem;
color: #2f2e2e;
`
const MenuBar = styled.div`
display:flex;
margin-bottom: 25px;
`
const DropBtn = styled.button`
margin-left: 24px;
display: flex;
justify-content: space-between;
background-color: #aaf;
align-items: center;
border-radius: 5px;
padding: 15px;
border: none;
width: 200px;
`

//searchbar
const SearchBarWrap = styled.div`
display: flex;
justify-content:flex-end;
width:540px;
height:50px;
position:relative;
align-items:center;
margin:25px auto;
`
const SearchBarInput = styled.input`
width:100%;
height:100%;
border: 1px solid #aaf;
border-radius: 4px;
padding: 10px;
`

//room
const RoomListContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid #aaf;
  @media screen and (min-width: 1607px){
    grid-template-columns: repeat(4, minmax(0px, 1fr)) !important;
    row-gap: 32px;
  }
  @media screen and (min-width: 1232px) and (max-width: 1607px) {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
    row-gap: 32px;
  }
  @media screen and (min-width: 878px) and (max-width: 1232px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr)) !important;
  }
  @media screen and (min-width: 551px) and (max-width: 878px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
  @media screen and (min-width: 0px) and (max-width: 551px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
  
`
const RoomCard = styled.div`
border: 1px solid #aaf;
padding: 19px;
border-radius: 16px;
`



const CardListArea = styled.div`
  display: grid;
  gap: 25px;
  box-sizing: border-box;
  @media screen and (min-width: 1607px){
    grid-template-columns: repeat(5, minmax(0px, 1fr)) !important;
    row-gap: 32px;
  }
  @media screen and (min-width: 1232px) and (max-width: 1607px) {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
    row-gap: 32px;
  }
  @media screen and (min-width: 878px) and (max-width: 1232px) {
    grid-template-columns: repeat(3, minmax(0px, 1fr)) !important;
  }
  @media screen and (min-width: 551px) and (max-width: 878px) {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
  @media screen and (min-width: 0px) and (max-width: 551px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
`

export default Main;