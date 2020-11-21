import {
  createStore,
  createHook,
  StoreActionApi,
  createContainer,
  createSubscriber,
} from "react-sweet-state";
import { UIState } from "./UIStore.d";

export const UI_STORE = "StoreUI";

type StoreApi = StoreActionApi<UIState>;
type Actions = typeof actions;

export const initialState: UIState = {
  sideBar: {
    collapsed: false,
  },
};

export const actions = {
  toggleSideBar: (collapsed: boolean) => ({ setState }: StoreApi) => {
    const newSideBarState = { ...initialState.sideBar, collapsed };
    setState({ ...initialState, sideBar: newSideBarState });
  },
};

const Store = createStore<UIState, Actions>({
  initialState,
  actions,
  name: UI_STORE,
});

export const UISubscriber = createSubscriber(Store);

const useUI = createHook(Store);

export const storeKey = `${Store.key.join("__")}@__global__`;

type StoreContainerProps = {
  initialState: UIState;
};
export const UIContainer = createContainer<
  UIState,
  Actions,
  StoreContainerProps
>(Store, {
  onInit: () => ({ setState }: StoreApi, { initialState }) => {
    setState({ ...initialState });
  },
});

export default useUI;
