import axios from "axios";
import {IReqPaging} from "../repos/interface";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});

export const config = axios.create({
  baseURL: process.env.REACT_APP_CONFIG_SERVER,
});

export const buildRequestParams = (req: IReqPaging) => {
  const { offset, limit, sort, filter } = req;

  const params: Record<string, any> = { offset, limit, ...filter };
  sort &&
  Object.assign(params, {
    sortField: sort.name,
    sortType: sort.desc ? "desc" : "asc",
  });
  return params;
};

export function setHttpAuth(token?: string) {
  if (token) {
    http.defaults.headers.Authorization = "Bearer " + token;
  } else {
    delete http.defaults.headers.Authorization;
  }
}
