import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { apis } from '../../shared/api';

//로그인 체크
const SET_USER = 'SET_USER';

//login
const LOG_OUT = 'LOG_OUT';
const USER_INFO = 'USER_INFO';
const DELETE_USER_INFO = 'DELETE_USER_INFO';
//프로필 업로드
const EDIT_PROFILE = 'EDIT_PROFILE';
//닉네임 변경
const EDIT_NICK = 'EDIT_NICK';
//상태메세지 변경
const EDIT_STATUS = 'EDIT_STATUS';
//대표 뱃지 변경
const EDIT_BADGE = 'EDIT_BADGE';
//전체 뱃지 가져오기
const GET_BADGE = 'GET_BADGE';
//오늘 시간
const TODAY_TIME = 'TODAY_TIME';
//이번주 시간
const WEEK_TIME = 'WEEK_TIME';
//이번달 시간
const MONTH_TIME = 'MONTH_TIME';


const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const userInfo = createAction(USER_INFO, (userInfo) => ({ userInfo }));
const deleteUserInfo = createAction(DELETE_USER_INFO, (userid) => ({ userid }));
const editProfile = createAction(EDIT_PROFILE, (profileUrl) => ({profileUrl}));
const editNick = createAction(EDIT_NICK, (nickname) => ({ nickname }));
const editStatus = createAction(EDIT_STATUS, (status) => ({ status }));
const editBadge = createAction(EDIT_BADGE, (badge) => ({badge}));
const getBadge = createAction(GET_BADGE, (badgeList) => ({badgeList}));
const todayTime = createAction(TODAY_TIME, () => ({}));
const weekTime = createAction(WEEK_TIME, (weekTime) => weekTime);
const monthTime = createAction(MONTH_TIME, (monthTime) => monthTime);

const initialState = {
  user: {},
  is_login: false,
  userInfo: [],
  today: '',
  week: '',
  month: [],
  badges:[]
};

//로그인 미들웨어
const logInDB = (origin, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(origin, pwd)
      .then((res) => {
        console.log(res)
        alert("로그인에 성공하였습니다!")
        localStorage.setItem('login-token', res.data.data.token);
        dispatch(setUser({ origin }));
        window.location.reload('/main')
      })
      .catch(function (error) {
        console.log(error)
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
    apis
      .signup(origin, nickname, pwd)
      .then((res) => {
        window.alert(res.data.msg);
        console.log(res);
        window.location.reload('/main');
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
        history.replace('/main');
        return;
      }
      const user = res.data.data.user;
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

// 이미지 주소 받아오기
const getImageUrlDB = (userId, file) => {
  return function (dispatch, getState, { history }) {
    apis
      .imageUpload(file)
      .then((res) => {
        const data = res.data;
        dispatch(editProfileDB(userId, data));
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
  };
};

// 프로필 사진 수정하기
const editProfileDB = (userId, profileUrl) => {
  console.log('fgasgfsadf', userId, profileUrl);
  return function (dispatch, getState, { history }) {
    axios
      .patch(
        `http://52.79.234.176/api/user/${userId}/profile/img`,
        { profileImg: profileUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
          },
        }
      )
      .then(function (res) {
        dispatch(editProfile(profileUrl));
      })
      .catch(function (err) {
        window.alert(err);
      });
  };
};

// 사용자 닉네임 수정하기
const editNickDB = (userId, nickname) => {
  return function (dispatch, getState, { history }) {
    axios
      .patch(
        `http://52.79.234.176/api/user/${userId}/profile/nickname`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
          },
        }
      )
      .then(function (res) {
        console.log('닉네임 수정하기', res);
        // 에러 메시지 이상함 확인부탁 9자리인데도 에러 뜸
        // 에러 메시지는 상태메시지 에러가 뜸
        dispatch(editNick(nickname));
      })
      .catch(function (error) {
        window.alert(error.response.data.msg);
      });
  };
};

// 사용자 상태메시지 수정하기
const editStatusDB = (userId, status) => {
  console.log(userId, status);
  return function (dispatch, getState, { history }) {
    axios
      .patch(
        `http://52.79.234.176/api/user/${userId}/profile/statusMsg`,
        { statusMsg: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('login-token')}`,
          },
        }
      )
      .then(function (res) {
        console.log('상태메시지 수정하기', res);
        dispatch(editStatus(status));
      })
      .catch(function (error) {
        console.log(error);
        window.alert(error.response.data.msg);
      });
  };
};

const editBadgeDB = (userId, badgeId) => {
  return function(dispatch, getState, {history}){
    apis
    .editBadge(userId, badgeId)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
};

//전체 뱃지 가져오기
const getBadgeDB = (userId) => {
  return function(dispatch, getState, {history}){
    apis
    .getBadges(userId)
    .then((res)=>{
      dispatch(getBadge(res.data.data))
      if(res.data.data.newBadge){
        alert("새로운 뱃지가 열렸습니다!")
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
};

// 시간 받아오기
const timeGetDB = (userId) => {
  return function (dispatch, getState, { history }) {
    const token = localStorage.getItem('login-token');
    axios
      .get(`http://52.79.234.176/api/user/${userId}/records`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        console.log('timeGet :  ', res.data.data);
        const monthData = res.data.data.monthRecords;
        const weekData = {
          beautyRecord: res.data.data.beautyRecord,
          counselingRecord: res.data.data.counselingRecord,
          cultureRecord: res.data.data.cultureRecord,
          etcRecord: res.data.data.etcRecord,
          sportsRecord: res.data.data.sportsRecord,
          studyRecord: res.data.data.studyRecord,
        };
        dispatch(weekTime(weekData));
        dispatch(monthTime(monthData));
      })
      .catch(function (error) {
        window.alert(error.response.data.msg);
      });
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
        window.location.reload('/main')
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
      [EDIT_NICK]: (state, action) =>
      produce(state, (draft) => {
        draft.user.nickname = action.payload.nickname;
      }),
    [EDIT_STATUS]: (state, action) =>
      produce(state, (draft) => {
        draft.user.statusMsg = action.payload.status;
      }),
    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user.profileImg = action.payload.profileUrl;
      }),
    [WEEK_TIME]: (state, action) =>
      produce(state, (draft) => {
        draft.week = action.payload;
      }),
    [MONTH_TIME]: (state, action) =>
      produce(state, (draft) => {
        draft.month = action.payload;
      }),
    [GET_BADGE] :(state, action)=>
      produce(state, (draft)=>{
        draft.badges = action.payload.badgeList
      }),
    [EDIT_BADGE]:(state, action)=>
      produce(state, (draft)=>{

      })
  },
  initialState
);

const actionCreators = {
  logInCheckDB,
  setUser,

  logOut,
  logInDB,
  signUpDB,

  userInfo,
  deleteUserInfo,

  editBadge,
  getBadge,
  editBadgeDB,
  getBadgeDB,

  todayTime,
  timeGetDB,

  getImageUrlDB,
  editProfileDB,
  editNickDB,
  editStatusDB,

};

export { actionCreators };
