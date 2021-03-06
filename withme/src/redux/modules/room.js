import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../shared/api";

const GET_ROOM = "GET_ROOM";
const EMPTY_ROOM = "EMPTY_ROOM";
const ADD_ROOM = "ADD_ROOM";
const ENTER_ROOM = "ENTER_ROOM";
const SAVE_MY_CHAT = "SAVE_MY_CHAT";
const SAVE_OTHERS_CHAT = "SAVE_OTHERS_CHAT";
const SET_MY_ROOM = "SET_MY_ROOM";
const DELETE_CHAT ="DELETE_CHAT"

const getRoom = createAction(GET_ROOM, (roomList) => ({ roomList }));
const emptyRoom = createAction(EMPTY_ROOM, () => ({}));
const addRoom = createAction(ADD_ROOM, (rooms) => ({ rooms }));
const enterRoom = createAction(ENTER_ROOM, (roomInfo) => ({ roomInfo }));
const saveMyChat = createAction(SAVE_MY_CHAT, (chattingList) => ({ chattingList }));
const saveOthersChat = createAction(SAVE_OTHERS_CHAT, (chattingList) => ({ chattingList }));
const deleteChat = createAction(DELETE_CHAT, (chattingList)=>({chattingList}))
const setMyRoom = createAction(SET_MY_ROOM, (roomInfo) => ({ roomInfo }));

const initialState = {
  list: [],
  hotList: [],
  myRoom: null,
  chattingList: [],
};

// 방 전체 가져오기
const getRoomDB = (pageNum) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`/api/rooms?q=all&p=${pageNum}`)
      .then((response) => {
        const roomList = response.data.data;
        dispatch(getRoom(roomList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 방 생성하기
const addRoomDB = (roomInfo, category) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        "/api/room/new",
        {
          ...roomInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login-token")}`,
          },
        }
      )
      .then((response) => {
        dispatch(addRoom(response.data.data));
        dispatch(enterRoom(response.data.data));
        localStorage.setItem("myRoom", JSON.stringify(response.data.data));
        console.log("room module:", JSON.parse(localStorage.getItem("myRoom")))
        history.push(`/room/${response.data.data.id}`);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
};

// 검색 결과 방 가져오기
const searchRoomDB = (search, pageNum) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`api/rooms?q=${search}&p=${pageNum}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login-token")}`,
        },
      })
      .then((res) => {
        dispatch(getRoom(res.data.data));
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
};

// 카테고리별 방 가져오기
const categoryRoomDB = (categoryId, pageNum) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(
        //쿼리문 처음 쓸때 ?사용 이후 쿼리문이 더 들어가면 & 로 추가한다.
        `/api/rooms/category/${categoryId}?p=${pageNum}`
      )
      .then((res) => {
        dispatch(getRoom(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 방에 들어가기
const enteringRoomDB = (roomId, userId) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        `/api/room/${roomId}/user/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login-token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(enterRoom(res.data.data));
        localStorage.setItem("myRoom", JSON.stringify(res.data.data));
        history.push(`/room/${roomId}`);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
};

// 참여가능한 방 불러오기
const possibleRoomDB = (pageNum) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`/api/rooms?q=possible&p=${pageNum}`)
      .then((res) => {
        dispatch(getRoom(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 일반 방 => 방 참가 요청
// 비번 방 => 비번확인 요청 => 방 참가 요청

const CheckPwdDB = (pwd, roomId, userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .checkPwd(pwd, roomId)
      .then((res) => {
        dispatch(enteringRoomDB(roomId, userId));
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
};

export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.roomList);
      }),
    [EMPTY_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [];
      }),
    [ADD_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.rooms);
      }),
    [ENTER_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.myRoom = action.payload.roomInfo;
      }),
    [SAVE_MY_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chattingList.push(action.payload);
      }),
    [SAVE_OTHERS_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chattingList.push(action.payload);
      }),
    [SET_MY_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.myRoom = action.payload.roomInfo;
      }),
    [DELETE_CHAT]:(state, action)=>
      produce(state, (draft)=>{
        draft.chattingList = []
      })
  },
  initialState
);

const actionCreators = {
  emptyRoom,

  getRoomDB,
  addRoomDB,
  searchRoomDB,
  categoryRoomDB,
  possibleRoomDB,
  enteringRoomDB,
  CheckPwdDB,

  saveMyChat,
  saveOthersChat,
  setMyRoom,
  deleteChat,
};

export { actionCreators };
