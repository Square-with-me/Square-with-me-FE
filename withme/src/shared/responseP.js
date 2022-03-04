export const RESP = {
  GETLOGIN: {
    isSuccess: true,
    data: {
      user: {
        id: 1,
        origin: 'wkdgusrhkd@naver.com',
        nickname: '이 구역 짱구',
        profileImg:
          'https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
        statusMsg: '실패는 성공의 어머니!',
        MasterBadge: {
          id: 1,
          name: 'badge 1',
        },
      },
    },
  },

  UPDATENICKNAME: {
    isSuccess: true,
    data: {
      nickname: '변경된 닉네임',
    },
  },

  BADGES: {
    isSuccess: true / false,
    data: {
      badges: [
        'https://cdn-icons-png.flaticon.com/512/20/20100.png',
        'https://cdn-icons-png.flaticon.com/512/20/20100.png',
        'https://cdn-icons-png.flaticon.com/512/20/20100.png',
        'https://cdn-icons-png.flaticon.com/512/20/20100.png',
      ],
    },
  },
  TODAY: {
    isSuccess: true / false,
    data: {
      times: {
        doTime: 3600,
        shareTime: 1200,
        talkTime: 600,
      },
    },
  },
  WEEK: {
    isSuccess: true / false,
    data: [
      { doTime: 3600, shareTime: 3660, talkTime: 4200 }, // 월요일
      { doTime: 3600, shareTime: 3660, talkTime: 4200 },
      { doTime: 3600, shareTime: 3660, talkTime: 4200 },
      { doTime: 3600, shareTime: 3660, talkTime: 4200 },
      { doTime: 3600, shareTime: 3660, talkTime: 4200 },
      { doTime: 3600, shareTime: 3660, talkTime: 4200 },
      { doTime: 3600, shareTime: 3660, talkTime: 4200 }, // 일요일
    ],
  },
};
