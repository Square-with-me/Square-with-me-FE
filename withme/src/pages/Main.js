import React, { useState } from "react";
import MakeRoomModal from "./MakeRoomModal";
import { FaSearch } from "react-icons/fa";
import Room from "../components/Room";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import { actionCreators as userActions } from "../redux/modules/user";
import {FiLock, FiUnlock} from "react-icons/fi"

import jsonData from "../shared/responseJ.json"

const Main = () => {
  const dispatch =useDispatch()

  const [MRooms, setMRooms] = useState(false);
  const [search, setSearch] = useState("");
  const [possible, setPossible] =useState("")
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
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input placeholder="search.." onChange={(e) => setSearch(e.target.value)}/>
        <span>
          <button onClick={()=>{dispatch(roomActions.searchRoomDB(search))}}><FaSearch/></button>
        </span>
      </div>
      <button onClick={() => {setMRooms(true);}}>방을 만들어볼까요?!</button>
      {MRooms && <MakeRoomModal setMRooms={setMRooms} />}

      {roomList &&
        roomList.map((info, idx) => {
          return (
            <React.Fragment >
              <Room info={info} key={idx}/>
            </React.Fragment>
          );
        })}

        {notUser_is_local===false ?
          <button onClick={()=>{dispatch(userActions.NotMenberloginDB())}}> 비회원으로 즐기기 </button>:
          <button onClick={()=>{dispatch(userActions.notUserLogOut())}}> 비회원은 그만할래요 </button>}

        <div onChange={(e)=>{setPossible(e.target.value)}}>
          <input type="radio" name="1" value="possible" />입장가능한 방만 보기
          <input type="radio" name="1" value="" /> 모든 방만 보기
        </div>

      {/* <div>
        {hotRoom.map((r, idx)=>{

        })}
      </div> */}
      
      <div>
        {possible ? jsonData.map((r,idx)=>{
          return(
            <div>
            {r.members==="4" || r.isSecrect ==="false"?            
              null:
              <div key={idx}>
              <p>{r.roomNumber}</p>
              <p>{r.roomTitle}</p>
              <p>{r.category}</p>
              <p>{r.tags}</p>
              <p>{r.isSecrect==="true"?<FiUnlock/> :<FiLock/>}</p>
              </div>
            }
            </div>
          )
        }) : jsonData.map((r,idx)=>{
          return(
            <div>
            {r.members==="4"?            
            <div style={{backgroundColor:"gray"}} key={idx}>
            <p>{r.roomNumber}</p>
            <p>{r.roomTitle}</p>
            <p>{r.category}</p>
            <p>{r.tags}</p>
            <p>{r.isSecrect==="true"?<FiUnlock/> :<FiLock/>}</p>
            </div>:
              <div key={idx}>
              <p>{r.roomNumber}</p>
              <p>{r.roomTitle}</p>
              <p>{r.category}</p>
              <p>{r.tags}</p>
              <p>{r.isSecrect==="true"?<FiUnlock/> :<FiLock/>}</p>
              </div>
            }
            </div>
          )
        })}
      </div>

    </React.Fragment>
  );
};
export default Main;