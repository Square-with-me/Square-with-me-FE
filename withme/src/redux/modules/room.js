import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { apis } from '../../shared/api';

import { RESPJ } from '../../shared/resopnseJ';

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

const getRoomDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getRoomAll()
      .then((res) => {
        console.log('전체 방 불러오기', res.data.data);
        dispatch(getRoom(res.data.data));
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
  };
};

const addRoomDB = (title, secret, pwd, category, tags) => {
  return function (dispatch, getState, { history }) {
    // let _room = {
    //   title: title,
    //   secret: secret,
    //   pwd: pwd,
    //   category: category,
    //   tags: tags,
    // };
    // const room = { ..._room };
    // console.log(room);
    // axios
    //   .post(
    //     "/api/room/new",
    //     {
    //       title: title,
    //       secret: secret,
    //       pwd: pwd,
    //       category: category,
    //       tags: tags,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("is_login")}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     if(response.isSuccess === false){
    //       window.alert(response.msg)
    //     } else if(response.isSuccess===true){
    //       tags = response.data.tags.forEach((v,idx)=>{

    //       })
    //       dispatch(addRoom({
    //         title : response.data.title,
    //         roomId : response.data.id,
    //         secret : response.data.isSecret,
    //         pwd : response.data.pwd,
    //         masterUserId : response.data.masterUserId,
    //         category : response.data.category.name,
    //         tags : response.data.tags,
    //       }))
    //       history.push(`/detail/`);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    if (RESPJ.MakeRoom.isSuccess === true) {
      let title = RESPJ.MakeRoom.data.title;
      let roomId = RESPJ.MakeRoom.data.id;
      let secret = RESPJ.MakeRoom.data.isSecret;
      let pwd = RESPJ.MakeRoom.data.pwd;
      let masterUserId = RESPJ.MakeRoom.data.masterUserId;
      let category = RESPJ.MakeRoom.data.category.name;
      let tags = RESPJ.MakeRoom.data.Tags;
      // .forEach((t)=>{
      //   let tag = t
      //   // console.log(tag)
      //   dispatch(addRoom({tag}))
      // })
      dispatch(
        addRoom({ title, roomId, secret, pwd, masterUserId, category, tags })
      );
    }
  };
};

const delRoomDB = () => {};

const hotRoomDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get('/api/rooms/hot', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('is_login')}`,
        },
      })
      .then((response) => {
        let searchRoom = response.data;
        dispatch.hotRoom(searchRoom);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const searchRoomDB = (search) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://14.45.204.153:7034/api/rooms?q=${search}`, {
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

const categoryRoomDB = (categoryId) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://14.45.204.153:7034/api/rooms/category/${categoryId}`, {
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

export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.roomList;
      }),
    [ADD_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unShift(action.payload.rooms);
        console.log(draft.list);
      }),
    [DEL_ROOM]: (state, action) => produce(state, (draft) => {}),
    [HOT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.hotList = action.payload.roomList;
      }),
    [SEARCH_ROOM]: (state, action) => produce(state, (draft) => {}),
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
};

export { actionCreators };
