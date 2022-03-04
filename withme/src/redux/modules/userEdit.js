import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { RESP } from '../../shared/responseP';

//프로필 가져오기
const SET_PROFILE = 'GET_PROFILE';
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

const setProfile = createAction(SET_PROFILE, (user) => ({ user }));
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

// 사용자 프로필 정보 가져오기
const getProfileDB = () => {
  return function (dispatch, getState, { history }) {
    if (resp.GETLOGIN.isSuccess) {
      const userData = resp.GETLOGIN.data.user;
      dispatch(setProfile(userData));
    }
  };
};

// 이미지 주소 받아오기
const getImageUrlDB = (formdata) => {
  return function (dispatch, getState, { history }) {
    if (resp.UPLOADIMGFILE.isSuccess) {
      const profileImg = resp.UPLOADIMGFILE.profileImg;
      console.log(formdata, profileImg);
      dispatch(editProfile(profileImg));
    }
  };
};

const editProfileDB = () => {};

// 사용자 닉네임 수정하기
const editNickDB = (nickname) => {
  return function (dispatch, getState, { history }) {
    if (resp.UPDATENICKNAME.isSuccess) {
      const updateData = resp.UPDATENICKNAME.data.nickname;
      dispatch(editNick(updateData));
      // console.log(nickname, updateData);
    }
  };
};

// 사용자 상태메시지 수정하기
const editStatusDB = (status) => {
  return function (dispatch, getState, { history }) {
    if (resp.UPDATESTATUS.isSuccess) {
      const updateData = resp.UPDATESTATUS.data.statusMsg;
      dispatch(editStatus(updateData));
    }
  };
};

const editBadgeDB = () => {};

const getBadgeDB = () => {};

const todayTimeDB = () => {};

const weekTimeDB = () => {};

const monthTimeDB = () => {};

export default handleActions(
  {
    [SET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
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

  getProfileDB,
  getImageUrlDB,
  editProfileDB,
  editNickDB,
  editStatusDB,

  editBadgeDB,
  getBadgeDB,

  todayTimeDB,
  weekTimeDB,
  monthTimeDB,
};

export { actionCreators };
