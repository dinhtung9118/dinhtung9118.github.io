import {
  createContainer,
  createHook,
  createStore,
  StoreActionApi
} from "react-sweet-state";
import {LoginFormValues} from 'components/FormLogin/index.d'
import {auth as authRepo} from "services/repos/Auth/index";
import {setHttpAuth} from "../../services/clients";
import {Account, AccountRole, AccountStatus} from "../../models/account";


type StoreApi = StoreActionApi<IAuthState>;
type Actions = typeof actions;
export enum AuthStatus {
  INITIAL,
  VERIFY,
  LOGGED,
  PROTECTED,
}

// @ts-ignore


export interface IAuthState<A = Account> {
  account?: A;
  status: AuthStatus;
  token?: string;
}

export const initialStoreState = {
  account: new Account({
    id:'',
    email:'',
    firstName:'',
    lastName:'',
    phoneNumber:'',
    password:'',
    role:AccountRole.DOCTOR,
    status:AccountStatus.ACTIVE,
    active: true,
    avatar:''
  }),
  status: AuthStatus.INITIAL,
  token: '',
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

export const Store = createStore<IAuthState, Actions>({
  name: AUTHENTICATION_STORE,
  initialState: initialStoreState,
  actions
   });

export const storeKey = `${Store.key.join('__')}@__global__`;

type StoreContainerProps = {
  initialState: IAuthState;
};

export const AuthenticationContainer = createContainer<IAuthState, Actions, StoreContainerProps>(Store,{
  onInit: () => ({ setState }: StoreApi, { initialState }) => {
    setState({ ...initialState });
  },
});


const useAuthentication = createHook(Store);

export default useAuthentication;


