import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../shared/api";

//로그인 체크
const SET_USER = "SET_USER";
const SET_SOCKET = "SET_SOCKET";
//login
const LOG_OUT = "LOG_OUT";
const USER_INFO = "USER_INFO";
const SET_OTHER_USERS = "SET_OTHER_USERS";  // 방 처음 들어와서, 다른 사람 목록 받았을 때
const SET_NEW_ROOM_USER = "SET_NEW_ROOM_USER";  // 방에 있는 상태에서 새로운 사람 들어왔을 때

const DELETE_ROOM_USER = "DELETE_ROOM_USER";
//프로필 업로드
const EDIT_PROFILE = "EDIT_PROFILE";
//닉네임 변경
const EDIT_NICK = "EDIT_NICK";
//상태메세지 변경
const EDIT_STATUS = "EDIT_STATUS";
//대표 뱃지 변경
const EDIT_BADGE = "EDIT_BADGE";
//보유 뱃지 가져오기
const GET_BADGE = "GET_BADGE";
//오늘 시간
const TODAY_TIME = "TODAY_TIME";
//이번주 시간
const WEEK_TIME = "WEEK_TIME";
//이번달 시간
const MONTH_TIME = "MONTH_TIME";

// 유저미디어 저장
const SET_USER_MEDIA = "SET_USER_MEDIA";

const setSocket = createAction(SET_SOCKET, (socket) => ({ socket }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const userInfo = createAction(USER_INFO, (userInfo) => ({ userInfo }));
const deleteRoomUser = createAction(DELETE_ROOM_USER, (userid) => ({ userid }));
const editProfile = createAction(EDIT_PROFILE, (profileUrl) => ({
  profileUrl,
}));
const editNick = createAction(EDIT_NICK, (nickname) => ({ nickname }));
const editStatus = createAction(EDIT_STATUS, (status) => ({ status }));
const editBadge = createAction(EDIT_BADGE, (badge) => ({ badge }));
const getBadge = createAction(GET_BADGE, (badgeList) => ({ badgeList }));
const todayTime = createAction(TODAY_TIME, () => ({}));
const weekTime = createAction(WEEK_TIME, (weekTime) => weekTime);
const monthTime = createAction(MONTH_TIME, (monthTime) => monthTime);
const setOtherUsers = createAction(SET_OTHER_USERS, (users) => ({ users }));
const setNewRoomUser = createAction(SET_NEW_ROOM_USER, (user) => ({ user }));
const setUserMedia = createAction(SET_USER_MEDIA, (media) => ({ media }));

const initialState = {
  user: {},
  is_login: false,
  otherUsers: [],
  today: "",
  week: "",
  month: [],
  badges: [],
  MasterBadge: "",
  myBadges: [],

  socket: null,
  userMedia: null,
};

//로그인 미들웨어
const logInDB = (origin, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(origin, pwd)
      .then((res) => {
        alert("로그인에 성공하였습니다!");
        localStorage.setItem("login-token", res.data.data.token);
        dispatch(setUser({ origin }));
        window.location.reload("/main");
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
  };
};

//회원가입 미들웨어
const signUpDB = (origin, nickname, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(origin, nickname, pwd)
      .then((res) => {
        window.alert(res.data.msg);
        dispatch(logInDB(origin,pwd))
      })
      .catch(function (error) {
        window.alert(error.response.data.msg);
      });
  };
};

//로그인 체크 미들웨어
const logInCheckDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .loginCheck()
      .then((res) => {
        if (!res.data.isSuccess) {
          alert("회원정보가 올바르지 않습니다.");
          history.replace("/main");
          return;
        }
        const user = res.data.data.user;
        dispatch(
          setUser({
            ...user,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        alert("로그인 후 이용 가능 합니다");
        history.replace("/main");
      });
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
  return function (dispatch, getState, { history }) {
    axios
      .patch(
        `/api/user/${userId}/profile/img`,
        { profileImg: profileUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login-token")}`,
          },
        }
      )
      .then(function (res) {
        dispatch(editProfile(profileUrl));
      })
      .catch(function (err) {
        alert(err.response.data.msg);
      });
  };
};

// 사용자 닉네임 수정하기
const editNickDB = (userId, nickname) => {
  return function (dispatch, getState, { history }) {
    axios
      .patch(
        `/api/user/${userId}/profile/nickname`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login-token")}`,
          },
        }
      )
      .then(function (res) {
        dispatch(editNick(nickname));
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
  };
};

// 사용자 상태메시지 수정하기
const editStatusDB = (userId, status) => {
  return function (dispatch, getState, { history }) {
    axios
      .patch(
        `/api/user/${userId}/profile/statusMsg`,
        { statusMsg: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login-token")}`,
          },
        }
      )
      .then(function (res) {
        dispatch(editStatus(status));
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
  };
};

//대표 뱃지 설정하기
const editBadgeDB = (userId, badgeId) => {
  return function (dispatch, getState, { history }) {
    apis
      .editBadge(userId, badgeId)
      .then((res) => {
        dispatch(editBadge(res.data.data));
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
};

//보유 뱃지 가져오기
const getBadgeDB = (userId) => {
  return function (dispatch, getState, { history }) {
    apis
      .getBadges(userId)
      .then((res) => {
        const badgeList = res.data.data.map((badge) => badge.id);
        dispatch(getBadge(badgeList));
        if (res.data.newBadge) {
          alert("새로운 뱃지가 열렸습니다!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 시간 받아오기
const timeGetDB = (userId) => {
  return function (dispatch, getState, { history }) {
    const token = localStorage.getItem("login-token");
    axios
      .get(`/api/user/${userId}/records`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        const monthData = res.data.data.monthRecord;
        const weekData = {
          beautyRecord: res.data.data.weekdaysRecord[0],
          sportsRecord: res.data.data.weekdaysRecord[1],
          studyRecord: res.data.data.weekdaysRecord[2],
          counselingRecord: res.data.data.weekdaysRecord[3],
          cultureRecord: res.data.data.weekdaysRecord[4],
          etcRecord: res.data.data.weekdaysRecord[5],
        };
        dispatch(weekTime(weekData));
        dispatch(monthTime(monthData));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//리덕스
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("login-token");
        draft.user = null;
        draft.is_login = false;
        window.location.reload("/main");
      }),

    [SET_OTHER_USERS]: (state, action) =>
      produce(state, (draft) => {
        draft.otherUsers = [...action.payload.users];
      }),

    [SET_NEW_ROOM_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.otherUsers = [...draft.otherUsers, ...action.payload.user];
      }),

    [DELETE_ROOM_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.otherUsers = draft.otherUsers.filter(
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
    [GET_BADGE]: (state, action) =>
      produce(state, (draft) => {
        draft.myBadges = action.payload.badgeList;
      }),
    [EDIT_BADGE]: (state, action) =>
      produce(state, (draft) => {
        draft.user.MasterBadge = action.payload.badge;
        // draft.MasterBadge = action.payload.badge;
      }),
    [SET_SOCKET]: (state, action) =>
      produce(state, (draft) => {
        draft.socket = action.payload.socket;
      }),
    [SET_USER_MEDIA]: (state, action) =>
      produce(state, (draft) => {
        draft.userMedia = action.payload.media;
      }),
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
  deleteRoomUser,

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

  setSocket,
  setOtherUsers,
  setNewRoomUser,

  setUserMedia,
};

export { actionCreators };
