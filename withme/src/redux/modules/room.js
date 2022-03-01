import { createAction, handleActions } from "redux-actions";
import {produce} from "immer"
import axios from "axios";

const GET_ROOM ='GET_ROOM'
const ADD_ROOM ='ADD_ROOM'
const DEL_ROOM ='DEL_ROOM'
const HOT_ROOM ='HOT_ROOM'
const SEARCH_ROOM ='SEARCH_ROOM' 

const getRoom = createAction(GET_ROOM, (roomList)=>({roomList}))
const addRoom = createAction(ADD_ROOM, (rooms)=>({rooms}))
const delRoom = createAction(DEL_ROOM,(roomList)=>({roomList}))
const hotRoom = createAction(HOT_ROOM, (roomList)=>({roomList}))
const searchRoom = createAction(SEARCH_ROOM,()=>({}))

const initialState ={
    list :[],
}

const getRoomDB = ()=>{

}

const addRoomDB=()=>{

}

const delRoomDB=()=>{

}

const hotRoomDB=()=>{

}

const searchRoomDB=()=>{

}

export default handleActions(
    {
        [GET_ROOM]: (state, action) =>produce(state, (draft)=>{

        }),
        [ADD_ROOM]:(state, action)=>produce(state, (draft)=>{

        }),
        [DEL_ROOM]:(state, action)=>produce(state, (draft)=>{

        }),
    },initialState
)

const actionCreators = {
    getRoom,
    addRoom,
    delRoom,
    hotRoom,
    searchRoom,

    getRoomDB,
    addRoomDB,
    delRoomDB,
    hotRoomDB,
    searchRoomDB
  }

  export { actionCreators }
