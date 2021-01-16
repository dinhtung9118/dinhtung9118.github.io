import {IConfig} from "./index";

export const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER;

export const dev: IConfig= {
  API:{
    ROOT_ENDPOINT: `${REACT_APP_API_SERVER}`,
    DOCTOR_SERVICE: `${REACT_APP_API_SERVER}/doctors`,
    AUTH_SERVICE: `${REACT_APP_API_SERVER}/auth/login`,
    PARTNER_SERVICE: `${REACT_APP_API_SERVER}/partner`,
    SPECIALTYPE_SERVICE:`${REACT_APP_API_SERVER}/partner`,
  }
};
