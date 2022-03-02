import React, { useState } from "react"
import MakeRoomModal from "./MakeRoomModal"

const Main =()=>{
    const [MRooms, setMRooms] = useState(false)
    return (
        <React.Fragment>
            <button onClick={()=>{setMRooms(true)}}>방을 만들어볼까요?!</button>
            {MRooms && <MakeRoomModal setMRooms={setMRooms}/>}
        </React.Fragment>
    )
}

export default Main