export const RESP = {
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
