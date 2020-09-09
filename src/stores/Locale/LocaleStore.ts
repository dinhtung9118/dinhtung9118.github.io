import { createStore, createHook } from "react-sweet-state";

import { I18n, Locale } from "untils";

import { i18n as repoI18n } from "services/repos";

const Store = createStore({
  name: "I18n",
  initialState: {
    initial: false,
    supports: Array<Locale>(),
    locale: 'Locale.system()',
    i18n: 'new I18n()',
  },

  actions: {
    load: (code?: string) => async ({ getState, setState }) => {
      // let { supports, locale } = getState();
      // code = code ?? locale.code;
      //
      // if (!supports.length) {
      //   supports = await repoI18n.locales();
      // }
      //
      // locale = supports.find((item) => item.code === code) ?? supports.first;
      // setState({ locale, supports, initial: true });
      //
      // const i18n = await repoI18n.query(locale.code);
      // storage.locale.set(locale);
      // setState({ i18n });
    },

    update: (props: { locale?: Locale; data: I18n }) => async ({
                                                                 setState,
                                                                 getState,
                                                               }) => {
      // const { locale } = getState();
      // const i18n = await repoI18n.update(locale.code, props);
      // setState({ i18n, locale: props.locale ?? locale });
    },
  },
});
const getI18n = createHook(Store, { selector: ({ i18n }) => i18n });

export const useI18n = () => getI18n()[0];

export const useLocale = createHook(Store, {
  selector: ({ locale, supports, initial }) => ({
    locale,
    supports,
    initial,
  }),
});
