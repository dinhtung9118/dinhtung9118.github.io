import {
  createContainer,
  createHook,
  createStore,
  StoreActionApi
} from "react-sweet-state";
import {LoginFormValues} from 'components/FormLogin/index.d'
import {auth as authRepo} from "services/repos/Auth/index";
import {setHttpAuth} from "services/Clients";
import {IAccount, AccountRole, AccountStatus} from "models/account";
import databases from "../../storages";


type StoreApi = StoreActionApi<IAuthState>;
type Actions = typeof actions;
export enum AuthStatus {
  INITIAL,
  VERIFY,
  LOGGED,
  PROTECTED,
}
// @ts-ignore

export interface IAuthState<A = any> {
  account?: A;
  status: AuthStatus;
  token?: string;
  initiated: boolean;
}

export const initialStoreState = {
  account: {
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
  },
  status: AuthStatus.INITIAL,
  token: '',
  initiated: false,
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
  }),
  logout:() => async ({ setState }: StoreApi) => {
    try {
      await databases.removeItem(storeKey);
      setState({...initialStoreState} );
    } catch (error) {
      await databases.removeItem(storeKey);
      setState({...initialStoreState} );
      console.warn("TODO:", "Show message login error");
    }
  }
};

const Store = createStore<IAuthState, Actions>({
  initialState: initialStoreState,
  actions,
  name: AUTHENTICATION_STORE,
   });
const useAuthentication = createHook(Store);

export const storeKey = `${Store.key.join('__')}@__global__`;

type StoreContainerProps = {
  initialState: IAuthState;
};

export const AuthenticationContainer = createContainer<IAuthState, Actions, StoreContainerProps>(Store,{
  onInit: () => ({ setState }: StoreApi, { initialState }) => {
    setHttpAuth(initialState.token);
    setState({ ...initialState });
  },
});

export default useAuthentication;


