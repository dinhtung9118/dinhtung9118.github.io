import {IConfig} from "./index";

export const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER;

export const dev: IConfig= {
  API:{
    ROOT_ENDPOINT: `${REACT_APP_API_SERVER}`,
    DOCTOR_SERVICE: `/doctors`,
    AUTH_SERVICE: `/auth/login`,
    PARTNER_SERVICE: `$/partner`,
    SPECIALTYPE_SERVICE:`/partner`,
  }
};

export default config;
