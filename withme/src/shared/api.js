import axios from 'axios';

const token = localStorage.getItem('login-token');

const api = axios.create({
  // http://14.45.204.153:7034/
  baseURL: 'http://localhost:3000/',
  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

export const apis = {
  //user
  signup: (user) => api.post('/api/auth/local', user),
  login: (user) => api.post('/api/user', user),
  loginCheck: () => api.get('/api/user/me'),
  nonMemberLogin: (user) => api.get('/api/user/anon', user),
  logout: (user) => api.delete('/api/auth/:type', user),
};