import axios from "axios";
import { BackUrl } from "./config";

const token = localStorage.getItem("login-token");

const api = axios.create({
  baseURL: BackUrl,

  headers: {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

export const apis = {
  // user
  signup: (origin, nickname, pwd) =>
    api.post("/api/auth/local", { origin, nickname, pwd }),
  login: (origin, pwd) => api.post("/api/auth", { origin, pwd }),
  loginCheck: () => api.get("/api/user/me"),
  nonMemberLoginCheck: () => api.get("/api/user/me"),
  nonMemberLogin: (user) => api.get("/api/auth/anon", user),
  logout: (user) => api.delete("/api/auth/:type", user),

  // userEdit
  imageUpload: (image) => api.post("/api/upload/image", image),

  // room
  getRoomHot: () => api.get("/api/rooms?q=hot"),
  getRoomAll: () => api.get("/api/rooms?q=all"),
  getRoomPossible: () => api.get("/api/rooms?q=possible"),

  //checkPwd
  checkPwd: (pwd, roomId) => api.get(`/api/room/${roomId}/pwd/${pwd}`),

  //edit
  getBadges: (userId) => api.get(`/api/user/${userId}/badges`),
  editBadge: (userId, badgeId) =>
    api.patch(`/api/user/${userId}/profile/masterBadge`, { badgeId: badgeId }),
};
