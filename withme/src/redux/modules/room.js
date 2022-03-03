import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const GET_ROOM = "GET_ROOM";
const ADD_ROOM = "ADD_ROOM";
const DEL_ROOM = "DEL_ROOM";
const HOT_ROOM = "HOT_ROOM";
const SEARCH_ROOM = "SEARCH_ROOM";

const getRoom = createAction(GET_ROOM, (roomList) => ({ roomList }));
const addRoom = createAction(ADD_ROOM, (rooms) => ({ rooms }));
const delRoom = createAction(DEL_ROOM, (roomList) => ({ roomList }));
const hotRoom = createAction(HOT_ROOM, (roomList) => ({ roomList }));
const searchRoom = createAction(SEARCH_ROOM, (searchRoom) => ({searchRoom}));

const initialState = {
  list: [],
};

const getRoomDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get("/api/rooms/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("is_login")}`,
        },
      })
      .then((response) => {
        dispatch.getRoom(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addRoomDB = (title, secret, pwd, category, tags) => {
  return function (dispatch, getState, { history }) {
    let _room = {
      title: title,
      secret: secret,
      pwd: pwd,
      category: category,
      tags: tags,
    };
    const room = { ..._room };
    console.log(room);
    axios
      .post(
        "/api/room/new",
        {
          title: title,
          secret: secret,
          pwd: pwd,
          category: category,
          tags: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("is_login")}`,
          },
        }
      )
      .then((response) => {
        dispatch(addRoom(room));
        history.push(`/detail/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const delRoomDB = () => {

};

const hotRoomDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get("/api/rooms/hot", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("is_login")}`,
        },
      })
      .then((response) => {
          let searchRoom = response.data
        dispatch.hotRoom(searchRoom);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const searchRoomDB = (search) => {
    return function(dispatch, getState, {history}){
        axios
        .get(`/api/rooms?q=${search}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("is_login")}`
            }
        })
        .then((response)=>{
            dispatch.searchRoom(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
};

export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.roomList;
      }),
    [ADD_ROOM]: (state, action) =>produce(state, (draft) => {
        draft.list.unShift(action.payload.rooms);
      }),
    [DEL_ROOM]: (state, action) => produce(state, (draft) => {
        
    }),
    [HOT_ROOM]: (state, action) =>produce(state, (draft) => {
        draft.hotList = action.payload.roomList;
      }),
    [SEARCH_ROOM]:(state, action)=>produce(state, (draft)=>{

    })
  },
  initialState
);

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
  searchRoomDB,
};

export { actionCreators };
