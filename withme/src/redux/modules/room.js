import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { apis } from '../../shared/api';

const GET_ROOM = 'GET_ROOM';
const ADD_ROOM = 'ADD_ROOM';
const DEL_ROOM = 'DEL_ROOM';
const HOT_ROOM = 'HOT_ROOM';
const SEARCH_ROOM = 'SEARCH_ROOM';

const getRoom = createAction(GET_ROOM, (roomList) => ({ roomList }));
const addRoom = createAction(ADD_ROOM, (rooms) => ({ rooms }));
const delRoom = createAction(DEL_ROOM, (roomList) => ({ roomList }));
const hotRoom = createAction(HOT_ROOM, (roomList) => ({ roomList }));
const searchRoom = createAction(SEARCH_ROOM, (searchRoom) => ({ searchRoom }));

const initialState = {
  list: [],
  hotList: [],
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

const addRoomDB = (roomInfo, category) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        'http://15.164.48.35:80/api/room/new',
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const delRoomDB = () => {};

const hotRoomDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get('http://15.164.48.35:80/api/rooms?q=hot', {})
      .then((res) => {
        console.log('핫한 방 불러오기', res.data.data);
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
      .get(`http://15.164.48.35:80/api/rooms?q=${search}`, {
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
      .get(`http://15.164.48.35:80/api/rooms/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('is_login')}`,
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

const PossibleRoomDB =()=>{
  return function (dispatch, getState, { history }) {
    apis
      .getRoomPossible()
      .then((res) => {
        dispatch(getRoom(res.data.data));
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.roomList;
      }),
    [ADD_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.rooms);
      }),
    [DEL_ROOM]: (state, action) => produce(state, (draft) => {}),
    [HOT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.hotList = action.payload.roomList;
        console.log(draft.hotList);
      }),
  },
  initialState
);

const actionCreators = {
  addRoom,
  delRoom,
  hotRoom,
  searchRoom,

  getRoomDB,
  addRoomDB,
  delRoomDB,
  hotRoomDB,
  searchRoomDB,
  categoryRoomDB,
  PossibleRoomDB
};

export { actionCreators };
