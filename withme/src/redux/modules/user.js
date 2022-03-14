import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { apis } from '../../shared/api';

import { RESPJ } from '../../shared/resopnseJ';

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
const NOT_USER = 'NOT_USER';
const NOT_USER_LOG_OUT = 'NOT_USER_LOG_OUT';

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const notUser = createAction(NOT_USER, (user) => ({ user }));
const notUserLogOut = createAction(NOT_USER_LOG_OUT, (user) => ({ user }));

const initialState = {
  user: { origin: null, nick: null },
  is_login: false,
  notUser_is_login: false,
  notUser: null,
};

//로그인 미들웨어
const logInDB = (origin, pwd) => {
  return function (dispatch, getState, { history }) {
    console.log(origin, pwd);
    apis
      .login(origin, pwd)
      .then((res) => {
        console.log(res);

        localStorage.setItem('login-token', res.data.data.token);
        dispatch(setUser({ origin }));
        window.location.replace('/');
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
  };
};

//회원가입 미들웨어
const signUpDB = (origin, nickname, pwd) => {
  return function (dispatch, getState, { history }) {
    console.log(origin, nickname, pwd);
    apis
      .signup(origin, nickname, pwd)
      .then((res) => {
        console.log(res);

        if (res.isSuccess === true) history.push('/login');
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response.data.msg);
      });
  };
};

//로그아웃 미들웨어
const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
    history.push('/');
  };
};

//로그인 체크 미들웨어
const logInCheckDB = () => {
  return function (dispatch, getState, { history }) {
    apis.loginCheck().then((res) => {
      if (!res.data.isSuccess) {
        alert('회원정보가 올바르지 않습니다.');
        history.replace('/');
        return;
      }

      const user = res.data.data.user;
      dispatch(
        setUser({
          ...user,
        })
      );
    });
  };
};

//비회원 로그인
const NotMemberloginDB = () => {
  return function (getState, dispatch, { history }) {
    //  axios.get('/api/user/anon')
    //  .then((response)=>{
    //      let token = response.data.token
    //      localStorage.setItem("notUser_is_login", token)
    //      dispatch(notUser({
    //         user_id : response.data.user.id,
    //         nick : response.data.user.nickname,
    //         statusMsg : response.data.user.statusMsg,
    //         token : response.data.token
    //      }))
    //  })
    //  .catch((error)=>{
    //      console.log(error)
    //  })
    if (RESPJ.NotMemberLogin.isSuccess === true) {
      localStorage.setItem('notUser_is_login', RESPJ.NotMemberLogin.data.token);
      let user_id = RESPJ.NotMemberLogin.data.id;
      let nick = RESPJ.NotMemberLogin.data.nickname;
      let statusMsg = RESPJ.NotMemberLogin.data.statusMsg;
      dispatch(notUser({ user_id, nick, statusMsg }));
    }
  };
};

//비회원 로그아웃
const NotMemberlogOutDB = () => {
  return function (getState, dispatch, { history }) {
    dispatch(notUserLogOut());
  };
};
//비회원 로그인 체킹 미들웨어
const NotMemberLoginCheckDB = () => {
  return function (getState, dispatch, { history }) {
    // axios
    // .get('',{
    //   headers:{
    //     Authorization: `Bearer ${localStorage.getItem("notUser_is_login")}`
    //   }
    // })
    // .then((response)=>{
    //   dispatch(notUser({
    //     user_id: response.data.user.origin,
    //     nick : response.data.user.nickname,
    //     statusMsg : response.data.user.statusMsg,
    //   }))
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })
    if (RESPJ.NotMemberLoginCheck.isSuccess === true) {
      let user_id = RESPJ.NotMemberLoginCheck.data.user.id;
      let nick = RESPJ.NotMemberLoginCheck.data.user.nickname;
      let statusMsg = RESPJ.NotMemberLoginCheck.data.user.statusMsg;
      dispatch(notUser({ user_id, nick, statusMsg }));
    }
  };
};

//리덕스
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log('user ', action.payload.user);

        draft.user = action.payload.user;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem('login-token');
        draft.user = null;
        draft.is_login = false;
      }),
    [NOT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.notUser = action.payload.user;
        draft.notUser_is_login = true;
      }),
    [NOT_USER_LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        console.log(draft.notUser);
        localStorage.clear();
        draft.notUser = null;
        draft.notUser_is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  logOut,
  logOutDB,
  logInDB,
  logInCheckDB,
  signUpDB,
  NotMemberloginDB,
  NotMemberlogOutDB,
  NotMemberLoginCheckDB,
  notUserLogOut,
};

export { actionCreators };
