import axios, {AxiosError} from "axios";
import {IReqPaging} from "../repos/interface";
import {ValueNotifier} from "untils/Notifier/ValueNotifier";
import {ChangeNotifier} from "untils/Notifier/ChangeNotifier";
import {Completer} from "../../untils";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});

export const config = axios.create({
  baseURL: process.env.REACT_APP_CONFIG_SERVER,
});

const valueNotifier = new ValueNotifier<Error>({} as Error);

function debounce<T = unknown>(
  time: number,
  gCall?: () => T,
) {
  let completer: Completer<T>;
  let timeout: NodeJS.Timeout;

  return (call?: () => T) => {
    if (completer?.completed !== false) {
      completer = new Completer<T>();
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      completer.resolve((call || gCall)?.());
    }, time);
  };
};

class ErrorNotifier extends ChangeNotifier {
  constructor(protected valueChanged: ValueNotifier<Error>) {
    super();
    valueChanged.listen(() => debounce(200,() => this.notify()));
  }

  listen(listener: (error: Error) => void) {
    return super.listen(() => listener(this.valueChanged.value));
  }

  close() {
    this.valueChanged.close();
    super.close();
  }
}

export const errorNotifier = new ErrorNotifier(valueNotifier);

const createError = (name: string, message?: string) => {
  const error = new Error(message);
  error.name = name;
  return error;
};

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
