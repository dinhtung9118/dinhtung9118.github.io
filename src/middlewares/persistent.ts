import { defaults, StoreState } from "react-sweet-state";
import databases from "storages";
import { AUTHENTICATION_STORE } from "stores/authenticationsStore/authentication";
import { UI_STORE } from "../stores/UIstore/UIStore";
import { I18N_STORE } from "../stores/Locale/LocaleStore";
import { BLOCKSPLITTIME_STORE } from "../components/BlockSplit/Store";

const WHITE_LIST = [
  AUTHENTICATION_STORE,
  UI_STORE,
  I18N_STORE,
  BLOCKSPLITTIME_STORE,
];

const persistent = (storeState: StoreState<any>) => (next: any) => (
  fn: any,
) => {
  const result = next(fn);
  const { key } = storeState;
  const isWhiteList: string[] = WHITE_LIST.filter((store) =>
    key.includes(store),
  );
  if (isWhiteList.length > 0) {
    const state = storeState.getState();
    databases.setItem(storeState.key, state).catch((err: Error) => {
      console.error(err);
    });
  }

  return result;
};

defaults.middlewares.add(persistent);
