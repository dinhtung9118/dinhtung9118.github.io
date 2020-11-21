import {
  createStore,
  createHook,
  createContainer,
  StoreActionApi,
} from "react-sweet-state";

import { I18n, Locale } from "untils";

import { i18n as repoI18n } from "services/repos";

export const I18N_STORE = "I18N";

export interface II8nState<A = any> {
  initial: boolean;
  supports: Array<Locale>;
  locale: Locale;
  i18n: I18n;
  initiated: boolean;
}

type StoreApi = StoreActionApi<II8nState>;
type Actions = typeof actions;

export const actions = {
  load: (code?: string) => async ({ getState, setState }: StoreApi) => {
    let { supports, locale } = getState();
    code = code || locale.code;

    if (!supports.length) {
      supports = await repoI18n.locales();
    }

    locale = supports.find((item) => item.code === code) || supports?.first;
    setState({ locale, supports, initial: true });
    const i18n = await repoI18n.query(locale.code);
    setState({ i18n });
  },

  update: (props: { locale?: Locale; data: I18n }) => async ({
    setState,
    getState,
  }: StoreApi) => {
    const { locale } = getState();
    const i18n = await repoI18n.update(locale.code, props);
    setState({ i18n, locale: props.locale || locale });
  },
};
export const initialState = {
  initial: false,
  supports: Array<Locale>(),
  locale: Locale.system(),
  i18n: new I18n(),
  initiated: false,
};

const Store = createStore({
  name: "I18n",
  initialState,
  actions,
});

type StoreContainerProps = {
  initialState: II8nState;
};
export const I18NContainer = createContainer<
  II8nState,
  Actions,
  StoreContainerProps
>(Store, {
  onInit: () => ({ setState }: StoreApi, { initialState }) => {
    setState({ ...initialState });
  },
});

export const storeKey = `${Store.key.join("__")}@__global__`;

export const getI18n = createHook(Store, { selector: ({ i18n }) => i18n });

export const useI18n = () => getI18n()[0] as I18n;

export const useLocale = createHook(Store, {
  selector: ({ locale, supports, initial }) => ({
    locale,
    supports,
    initial,
  }),
});
