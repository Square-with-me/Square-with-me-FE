import axios from 'axios';

const token = localStorage.getItem('login-token');
const accessToken = document.cookie.split("=")[1];

const api = axios.create({
  // http://14.45.204.153:7034/
  // baseURL: 'http://15.164.48.35:80',
  baseURL: 'http://14.45.204.153:7034',
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
};
