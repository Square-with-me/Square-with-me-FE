import axios from 'axios';
import { BackUrl } from './config';

const token = localStorage.getItem('login-token');
const accessToken = document.cookie.split('=')[1];

const api = axios.create({
  //배포된
  // baseURL: 'http://15.164.48.35:80',

  //현광님
  // baseURL: "http://14.45.204.153:7034",

  //창훈님
  //baseURL: 'http://52.79.234.176',

  // baseURL: 'https://api.nemowithme.com',

  baseURL: `${BackUrl}`,

  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

export const apis = {
  // user
  signup: (origin, nickname, pwd) =>
    api.post('/api/auth/local', { origin, nickname, pwd }),
  login: (origin, pwd) => api.post('/api/auth', { origin, pwd }),
  loginCheck: () => api.get('/api/user/me'),
  nonMemberLoginCheck: () => api.get('/api/user/me'),
  nonMemberLogin: (user) => api.get('/api/auth/anon', user),
  logout: (user) => api.delete('/api/auth/:type', user),

  // userEdit
  imageUpload: (image) => api.post('/api/upload/image', image),

  // room
  getRoomHot: () => api.get('/api/rooms?q=hot'),
  getRoomAll: () => api.get('/api/rooms?q=all'),
  getRoomPossible: () => api.get('/api/rooms?q=possible'),

  //checkPwd
  checkPwd: (pwd, roomId) => api.get(`/api/room/${roomId}/pwd/${pwd}`),

  //edit
  getBadges: (userId) => api.get(`/api/user/${userId}/badges`),
  editBadge: (userId, badgeId) =>
    api.patch(`/api/user/${userId}/profile/masterBadge`, { badgeId: badgeId }),
};
