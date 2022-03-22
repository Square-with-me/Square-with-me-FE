import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { apis } from '../../shared/api';

const GET_ROOM = 'GET_ROOM';
const ADD_ROOM = 'ADD_ROOM';
const DEL_ROOM = 'DEL_ROOM';
const HOT_ROOM = 'HOT_ROOM';
const ENTER_ROOM = 'ENTER_ROOM';
const SAVE_CHAT = 'SAVE_CHAT';
const SET_MY_ROOM = 'SET_MY_ROOM'

const getRoom = createAction(GET_ROOM, (roomList) => ({ roomList }));
const addRoom = createAction(ADD_ROOM, (rooms) => ({ rooms }));
const delRoom = createAction(DEL_ROOM, (roomList) => ({ roomList }));
const hotRoom = createAction(HOT_ROOM, (roomList) => ({ roomList }));
const enterRoom = createAction(ENTER_ROOM, (roomInfo) => ({ roomInfo }));
const savechat = createAction(SAVE_CHAT, (chattingList) => ({ chattingList }));
const setMyRoom = createAction(SET_MY_ROOM, (roomInfo)=>({roomInfo}))

const initialState = {
  list: [],
  hotList: [],
  myRoom: null,
  chattingList: [],
};

// 방 정보 가져오기
const getRoomDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getRoomAll()
      .then((res) => {
        dispatch(getRoom(res.data.data));
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
  };
};

// 방 생성하기
const addRoomDB = (roomInfo, category) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        // 'http://15.164.48.35:80/api/room/new',
        'http://52.79.234.176//api/room/new',
        {
          ...roomInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
          },
        }
      )
      .then((response) => {
        dispatch(addRoom(response.data.data));
        dispatch(enterRoom(response.data.data));
        localStorage.setItem("myRoom", JSON.stringify(response.data.data))
        history.push(`/room/${response.data.data.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const delRoomDB = () => {};

// 핫한 방 불러오기
const hotRoomDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      // .get('http://15.164.48.35:80/api/rooms?q=hot', {})
      .get('http://52.79.234.176//api/rooms?q=hot', {})
      .then((res) => {
        dispatch(hotRoom(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 검색 결과 방 가져오기
const searchRoomDB = (search) => {
  return function (dispatch, getState, { history }) {
    axios
      // .get(`http://15.164.48.35:80/api/rooms?q=${search}`, {
      .get(`http://52.79.234.176//api/rooms?q=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        },
      })
      .then((res) => {
        dispatch(getRoom(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 카테고리별 방 가져오기
const categoryRoomDB = (categoryId) => {
  return function (dispatch, getState, { history }) {
    axios
      // .get(`http://15.164.48.35:80/api/rooms/category/${categoryId}`, {
      .get(`http://52.79.234.176//api/rooms/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        },
      })
      .then((res) => {
        dispatch(getRoom(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 방에 들어가기
const enteringRoomDB = (roomId, userId) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        // `http://15.164.48.35:80/api/room/${roomId}/user/${userId}`,
        `http://52.79.234.176/api/room/${roomId}/user/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
          },
        }
      )
      .then((res) => {
        dispatch(enterRoom(res.data.data));
        localStorage.setItem("myRoom", JSON.stringify(res.data.data))
        history.push(`/room/${roomId}`);
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };
};

const PossibleRoomDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getRoomPossible()
      .then((res) => {
        dispatch(getRoom(res.data.data));
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
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
        console.log(res);
        dispatch(enteringRoomDB(roomId, userId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.roomList;
      }),
    [ADD_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.rooms);
      }),
    [ENTER_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.myRoom = action.payload.roomInfo;
      }),
    [DEL_ROOM]: (state, action) => produce(state, (draft) => {}),
    [HOT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.hotList = action.payload.roomList;
      }),
    [SAVE_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chattingList.push(action.payload);
      }),
    [SET_MY_ROOM]:(state, action)=>
      produce(state,(draft)=>{
        draft.myRoom =action.payload.roomInfo
      })
  },
  initialState
);

const actionCreators = {
  delRoom,
  getRoomDB,
  addRoomDB,
  delRoomDB,
  hotRoomDB,
  searchRoomDB,
  categoryRoomDB,
  PossibleRoomDB,
  enteringRoomDB,
  CheckPwdDB,

  savechat,
  setMyRoom
};

export { actionCreators };
