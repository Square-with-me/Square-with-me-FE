import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { apis,api_token } from '../../shared/api';
// import jwt_decode from "jwt-decode";

import { RESPJ } from '../../shared/resopnseJ';
import { setCookie } from '../../shared/Cookie';

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';
const NOT_USER = 'NOT_USER';
const NOT_USER_LOG_OUT = 'NOT_USER_LOG_OUT';
const USER_INFO = 'USER_INFO'
const DELETE_USER_INFO = 'DELETE_USER_INFO'

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const notUser = createAction(NOT_USER, (user) => ({ user }));
const notUserLogOut = createAction(NOT_USER_LOG_OUT, (user) => ({ user }));
const userInfo = createAction(USER_INFO, (userInfo)=>({userInfo}))
const deleteUserInfo =createAction(DELETE_USER_INFO, (userid)=>({userid}))

const initialState = {
  user: { origin: null, nick: null },
  is_login: false,
  notUser_is_login: false,
  notUser: null,
  userInfo:[]
};

//로그인 미들웨어
const logInDB = (origin, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(origin, pwd)
      .then((res) => {
        localStorage.setItem('login-token', res.data.data.token);
        dispatch(setUser({ origin }));
        window.location.reload('/')
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
        if (res.isSuccess === true) {
          window.alert(res.msg)
          window.location.reload('/')
        } else {
          window.alert(res.msg)
        }
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
      console.log(res)
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

//비회원 로그인
const NotMemberloginDB = () => {
  return function (getState, dispatch, { history }) {
     apis.nonMemberLogin()
     .then((response)=>{
         let token = response.data.data.token
         localStorage.setItem("notUser_is_login", token)
         dispatch(notUser({
            user_id : response.data.user.id,
            nick : response.data.user.nickname,
            statusMsg : response.data.user.statusMsg,
            token : response.data.token
         }))
         window.location.reload('/')
     })
     .catch((error)=>{
         console.log(error)
     })
  };
};

//비회원 로그인 체킹 미들웨어
const NotMemberLoginCheckDB = () => {
  return function (getState, dispatch, { history }) {
    apis.nonMemberLoginCheck().then((res) => {
      if (!res.data.isSuccess) {
        alert('회원정보가 올바르지 않습니다.');
        history.replace('/');
        return;
      }
      const user = res.data.data.user;
      console.log(res)
      dispatch(
        notUser({
          ...user,
        })
      );
    });
    // api_token.get(`/api/user/me`)
    // .then((res)=>{
    //   const user = res.data.data.user;
    //   dispatch(notUser({...user}))
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
        window.location.reload('/')
      }),

      [USER_INFO]:(state,action)=>
      produce(state,(draft)=>{
        draft.userInfo = [...draft.userInfo, ...action.payload.userInfo]
      }),

      [DELETE_USER_INFO]:(state, action)=>
      produce(state,(draft)=>{
        draft.userInfo = draft.userInfo.filter((user) => user.id !== action.payload.userid)
      })
  },
  initialState
);

const actionCreators = {
  setUser,
  logOut,
  logInDB,
  logInCheckDB,
  signUpDB,
  NotMemberloginDB,
  NotMemberLoginCheckDB,
  notUserLogOut,
  userInfo,
  deleteUserInfo
};

export { actionCreators };
