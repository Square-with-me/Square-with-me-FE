import axios from 'axios';

const accessToken = document.cookie.split("=")[1];

export const api = axios.create({
  baseURL: 'http://175.112.86.142:8088/',
  withCredentials: true,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    authorization: `${accessToken}`,
  },
});

export const api_token = axios.create({
  baseURL: "http://175.112.86.142:8088/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    authorization: `${accessToken}`,
  },
});