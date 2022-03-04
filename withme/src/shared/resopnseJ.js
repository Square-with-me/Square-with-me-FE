export const RESPJ = {
  NotMemberLogin: {
    isSuccess: true,
    data: {
      user: {
        id: 3,
        origin: "10e90dc7-3974-41a9-8764-205010750cf7",
        nickname: "익명의 유저",
        pwd: "0",
        statusMsg: "익명의 유저입니다.",
        type: "anon",
        updatedAt: "2022-03-03T04:51:39.255Z",
        createdAt: "2022-03-03T04:51:39.255Z",
      },
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnaW4iOiIxMGU5MGRjNy0zOTc0LTQxYTktODc2NC0yMDUwMTA3NTBjZjciLCJpYXQiOjE2NDYyODMwOTl9.wQCUwHJRXGbRtGOcur2Byuqw1NM0qFKyNxEdE4mF0LY",
    },
  },
  NotMemberLoginCheck: {
    isSuccess: true,
    data: {
      user: {
        id: 1,
        origin: "wkdgusrhkd@naver.com",
        nickname: "wkdgusrhkd",
        profileImg: "",
        statusMsg: "실패는 성공의 어머니!",
        MasterBadge: {
          id: 1,
          name: "badge 1",
        },
      },
    },
  },
  MakeRoom: {
    isSuccess: true,
    data: {
      id: 3,
      title: "테스트용 방3",
      isSecret: false,
      pwd: "",
      masterUserId: 1,
      category: {
        id: 1,
        name: "뷰티",
      },
      Tags: [
        {
          id: 2,
          name: "메롱",
        },
        {
          id: 3,
          name: "방만듬",
        },
        {
          id: 1,
          name: "안녕",
        },
      ],
      Participants: [
        {
          id: 1,
          nickname: "장현광이다",
          masterBadgeId: null,
        },
      ],
    },
  },
};
