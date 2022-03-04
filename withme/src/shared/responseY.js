export const RESP ={
  SIGNUP: {
    isSuccess: true,
  },

  CHECK_ID: {
    isSuccess: true,
    data: {
      user: {
        id: 1,
        origin: "wkdgusrhkd@naver.com",
        nickname: "wkdgusrhkd",
        profileImg: "url",
        statusMsg: "실패는 성공의 어머니!",
        MasterBadge: {
          id: 1,
          name: "badge 1"
        }
      }
    }
  },
  
  LOGIN: {
    isSuccess: true,
    data: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndrZGd1c3Joa2RAbmF2ZXIuY29tIiwiaWF0IjoxNjQ2MTk4MzE5fQ.W-RFSrM_NUNGLfHF8f7W6KSBhqY27jF-Xv6wBt_5xMI",
      user: {
        id: 1,
        origin: "wkdgusrhkd@naver.com",
        nickname: "wkdgusrhkd",
        profileImg: null,
        statusMsg: "실패는 성공의 어머니!",
        type: "local/kakao",
        MasterBadge: {
          id: 1,
          name: "badge 1"
        }
      }
    }
  }
}