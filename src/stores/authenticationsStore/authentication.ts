import {
  createStore,
  createHook,
  StoreActionApi,
  createContainer
} from "react-sweet-state";
import {LoginFormValues} from 'components/FormLogin/index.d'
import { auth as authRepo } from "services/repos/Auth/index";
import {setHttpAuth} from "../../services/clients";
import {Account} from "../../models/account";
import databases from "../../storages";
// export const storeKey = `${Store.key.join('__')}@__global__`;

type StoreApi = StoreActionApi<IAuthState>;
type Actions = typeof actions;
export enum AuthStatus {
  INITIAL,
  VERIFY,
  LOGGED,
  PROTECTED,
}
const logged = false

export interface IAuthState<A = Account> {
  account?: A;
  status: AuthStatus;
  token?: string;
  error?: Error;
}
export const AUTHENTICATION_STORE = 'StoreAuthentication';

export const actions = {
  login: ((value: LoginFormValues) => async ({getState, setState}: StoreActionApi<IAuthState>) =>{
    try {
      const state = await authRepo.login(value.email, value.password);
      setHttpAuth(state.token);
      setState({ ...state, status: AuthStatus.LOGGED });
    } catch (error) {
      console.warn("TODO:", "Show message login error");
    }
  })
}

export const Store: any = createStore<IAuthState, Actions>({
  name: AUTHENTICATION_STORE,
  initialState: logged
    ? { ...logged, status: AuthStatus.VERIFY }
    : { status: AuthStatus.INITIAL },
  actions
   });

export const AuthenticationContainer = createContainer<IAuthState, Actions>(Store);

// @ts-ignore
export const storeKey = `${Store.key.join('__')}@__global__`;

const useAuthentication = createHook(Store);


