import axios, {AxiosError} from "axios";
import {IReqPaging} from "../repos/interface";
import {ValueNotifier} from "untils/Notifier/ValueNotifier";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});

export const config = axios.create({
  baseURL: process.env.REACT_APP_CONFIG_SERVER,
});

const createError = (name: string, message?: string) => {
  const error = new Error(message);
  error.name = name;
  return error;
};

const valueNotifier = new ValueNotifier<Error>({} as Error);

const offlineHandle = () => {
  valueNotifier.value = createError("offline", "You are in offline mode");
  return Promise.reject("Offline");
};


http.interceptors.response.use(
  (res) => {
    if (!navigator.onLine) {
      return offlineHandle();
    }
    if (res.data?.data?.data) {
      return res.data.data;
    } else {
      return res;
    }
    return res;
  },
  async (error: AxiosError) => {
    return Promise.reject(error)
  }
);

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
