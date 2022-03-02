import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { RESP } from '../../shared/responseP';

import { useDispatch } from 'react-redux';

//프로필 사진 가져오기
const GET_PROFILE = 'GET_PROFILE';
//프로필 업로드
const ADD_PROFILE = 'ADD_PROFILE';
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

const initialState = {
  today: '',
  week: '',
};

const getProfile = createAction(GET_PROFILE, () => ({}));
const addProfile = createAction(ADD_PROFILE, () => ({}));
const editNick = createAction(EDIT_NICK, () => ({}));
const editStatus = createAction(EDIT_STATUS, () => ({}));
const editBadge = createAction(EDIT_BADGE, () => ({}));
const getBadge = createAction(GET_BADGE, () => ({}));
const todayTime = createAction(TODAY_TIME, () => ({}));
const weekTime = createAction(WEEK_TIME, () => ({}));
const monthTime = createAction(MONTH_TIME, () => ({}));

const getProfileDB = () => {};

const addProfileDB = () => {};

const editNickDB = () => {};

const editStatusDB = () => {};

const editBadgeDB = () => {};

const getBadgeDB = () => {};

const todayTimeDB = () => {
  // const today = RESP.TODAY;
  // console.log(today);
};

const weekTimeDB = () => {
  // const week = RESP.WEEK;
  // console.log(week);
};

const monthTimeDB = () => {};

export default handleActions({}, initialState);

const actionCreators = {
  getProfile,
  addProfile,
  editNick,
  editStatus,
  editBadge,
  getBadge,
  todayTime,
  weekTime,
  monthTime,

  getProfileDB,
  addProfileDB,
  editNickDB,
  editStatusDB,
  editBadgeDB,
  getBadgeDB,
  todayTimeDB,
  weekTimeDB,
  monthTimeDB,
};

export { actionCreators };
