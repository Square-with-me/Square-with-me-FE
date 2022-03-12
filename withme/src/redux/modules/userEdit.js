import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { RESP } from '../../shared/responseP';
import { apis } from '../../shared/api';

//프로필 가져오기
const SET_USER = 'SET_USER';
//프로필 업로드
const EDIT_PROFILE = 'ADD_PROFILE';
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
const editProfile = createAction(EDIT_PROFILE, (profileUrl) => ({
  profileUrl,
}));
const editNick = createAction(EDIT_NICK, (nickname) => ({ nickname }));
const editStatus = createAction(EDIT_STATUS, (status) => ({ status }));
const editBadge = createAction(EDIT_BADGE, () => ({}));
const getBadge = createAction(GET_BADGE, () => ({}));
const todayTime = createAction(TODAY_TIME, () => ({}));
const weekTime = createAction(WEEK_TIME, () => ({}));
const monthTime = createAction(MONTH_TIME, () => ({}));

const initialState = {
  user: {
    id: '',
    origin: '',
    nickname: '',
    profileImg: '',
    statusMsg: '',
    MasterBadge: {
      id: '',
      name: '',
    },
  },
  today: '',
  week: '',
};
const resp = RESP;

// //로그인 체크 미들웨어
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

// 이미지 주소 받아오기
const getImageUrlDB = (file) => {
  return function (dispatch, getState, { history }) {
    console.log('디스패치', file);
    apis
      .imageUpload(file)
      .then((res) => {
        console.log('주소받은', res);
        //dispatch(editProfile(이미지주소));
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
  };
};

// 프로필 사진 수정하기
const editProfileDB = () => {};

// 사용자 닉네임 수정하기
const editNickDB = (userId, nickname) => {
  return function (dispatch, getState, { history }) {
    axios
      .patch(
        `http://14.45.204.153:7034/api/user/${userId}/profile/nickname`,
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
        `http://14.45.204.153:7034/api/user/${userId}/profile/statusMsg`,
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

const editBadgeDB = () => {};

const getBadgeDB = () => {};

const todayTimeDB = () => {};

const weekTimeDB = () => {};

const monthTimeDB = () => {};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log('마이페이지: ', action.payload.user);

        draft.user = action.payload.user;
        draft.is_login = true;
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
        console.log('이미지 변경: ', action.payload);
        draft.user.profileImg = action.payload.profileUrl;
      }),
  },
  initialState
);

const actionCreators = {
  editBadge,
  getBadge,
  todayTime,
  weekTime,
  monthTime,

  // 완료
  logInCheckDB,
  getImageUrlDB,
  editProfileDB,
  editNickDB,
  editStatusDB,

  // api 설계 후 작성
  editBadgeDB,
  getBadgeDB,
  todayTimeDB,
  weekTimeDB,
  monthTimeDB,
};

export { actionCreators };
