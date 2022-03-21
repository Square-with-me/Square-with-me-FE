import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { apis, api_token } from '../../shared/api';
// import jwt_decode from "jwt-decode";

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
const USER_INFO = 'USER_INFO';
const DELETE_USER_INFO = 'DELETE_USER_INFO';

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const userInfo = createAction(USER_INFO, (userInfo) => ({ userInfo }));
const deleteUserInfo = createAction(DELETE_USER_INFO, (userid) => ({ userid }));

const initialState = {
  user: { origin: null, nick: null },
  is_login: false,
  notUser_is_login: false,
  notUser: null,
  userInfo: [],
};

//로그인 미들웨어
const logInDB = (origin, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(origin, pwd)
      .then((res) => {
        alert('로그인에 성공하였습니다!');
        localStorage.setItem('login-token', res.data.data.token);
        dispatch(setUser({ origin }));
        window.location.reload('/');
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
    // apis.post('/api/auth',{
    //   origin:origin,
    //   pwd:pwd
    // }).then((res)=>{
    //   const accessToken ="Bearer" + res.data.token
    //   setCookie('is_login', `${accessToken}`);
    //   window.alert(res.data.msg)
    //   window.location.reload('/')
    //   // const {origin, nickname} =jwt_decode(res.data.token)
    //   dispatch(setUser({
    //     origin:origin,
    //     // nickname:nickname
    //   }))
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  };
};

//회원가입 미들웨어
const signUpDB = (origin, nickname, pwd) => {
  return function (dispatch, getState, { history }) {
    console.log(origin, nickname, pwd);
    apis
      .signup(origin, nickname, pwd)
      .then((res) => {
        window.alert(res.data.msg);
        console.log(res);
        window.location.reload('/');
      })
      .catch(function (error) {
        window.alert(error.response.data.msg);
      });
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
      console.log(res);
      dispatch(
        setUser({
          ...user,
        })
      );
    });
    // api_token.get(`/api/user/me`)
    // .then((res)=>{
    //   const user = res.data.data.user;
    //   dispatch(setUser({...user}))
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
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
        window.location.reload('/');
      }),

    [USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = [...draft.userInfo, ...action.payload.userInfo];
      }),

    [DELETE_USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = draft.userInfo.filter(
          (user) => user.id !== action.payload.userid
        );
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  logOut,
  logInDB,
  logInCheckDB,
  signUpDB,
  userInfo,
  deleteUserInfo,
};

export { actionCreators };
