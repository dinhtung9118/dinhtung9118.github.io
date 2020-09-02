import {dev} from './development';

export interface IConfig {
  API: {
    ROOT_ENDPOINT: string;
    DOCTOR_SERVICE: string;
    AUTH_SERVICE: string
    PARTNER_SERVICE: string;
    SPECIALTYPE_SERVICE: string;
  }
}

let config: IConfig = { ...dev };
const env = process.env.REACT_APP_ENV;

if (env === 'dev') {
  config = dev;
} else {
}

export const isDevEnv = () => {
  return process.env.REACT_APP_ENV === 'dev';
};
export default {
  // Add common config values here
  env,
  ...config,
};

