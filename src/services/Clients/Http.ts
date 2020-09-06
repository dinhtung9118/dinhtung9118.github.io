import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});

export const config = axios.create({
  baseURL: process.env.REACT_APP_CONFIG_SERVER,
});

export function setHttpAuth(token?: string) {
  if (token) {
    http.defaults.headers.Authorization = "Bearer " + token;
  } else {
    delete http.defaults.headers.Authorization;
  }
}
