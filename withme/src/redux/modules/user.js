import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { api} from '../../shared/logapi';
import { apis } from '../../shared/api';

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
  user: { origin: null, nick: null },
  is_login: false,
};

//로그인 미들웨어
const logInDB = (origin, pwd) => {
  return function (dispatch, getState, { history }) {
    api.post('/api/auth',{
      origin:origin,
      pwd:pwd
    }).then((response)=>{
      // localStorage.setItem('login-token', 1234)
      // console.log(response.headers.get('Set-Cookie'))
      // window.alert(res.data.msg)
      // window.location.reload('/')
      // const {origin, nickname} =jwt_decode(res.data.token)
      dispatch(setUser({
        origin:response.data.data.user.origin,
        nickname:response.data.data.user.nickname,
        type:response.data.data.user.type,
        statusMsg:response.data.data.user.statusMsg,
        profileImg:response.data.data.user.profileImg,
        MasterBadge:response.data.data.user.MasterBadge,
      }))
    })
    .catch((err)=>{
      console.log(err)
    })
  };
};

//회원가입 미들웨어
const signUpDB = (origin, nickname, pwd) => {
  return function (dispatch, getState, { history }) {
    api.post('/api/auth/local',{
      origin:origin,
      nickname:nickname,
      pwd:pwd
    })
    .then((res)=>{
      console.log(res.data.msg)
    })
    .catch((err)=>{
      console.log(err)
    })
  };
};

//로그아웃 미들웨어
const logOutDB = (type) => {
  return function (dispatch, getState, { history }) {
    api.delete(`api/auth/${type}`)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  };
};


//로그인 체크 미들웨어
const logInCheckDB = () => {
  return function (dispatch, getState, { history }) {
    // apis.loginCheck().then((res) => {
    //   if (!res.data.isSuccess) {
    //     alert('회원정보가 올바르지 않습니다.');
    //     history.replace('/');
    //     return;
    //   }
    //   const user = res.data.data.user;
    //   console.log(res)
    //   dispatch(
    //     setUser({
    //       ...user,
    //     })
    //   );
    // });
    api.get('/api/user/me')
    .then((response)=>{
      dispatch(setUser({        
        origin:response.data.data.user.origin,
        nickname:response.data.data.user.nickname,
        type:response.data.data.user.type,
        statusMsg:response.data.data.user.statusMsg,
        profileImg:response.data.data.user.profileImg,
        MasterBadge:response.data.data.user.MasterBadge,}))
    })
    .catch((err)=>{
      console.log(err)
    })
  };
};

//리덕스
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
        console.log(draft.user)
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem('login-token');
        draft.user = null;
        draft.is_login = false;
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
  logOutDB,
};

export { actionCreators };
