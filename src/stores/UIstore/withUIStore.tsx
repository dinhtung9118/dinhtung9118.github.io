import React, {
  FC,
  ComponentType,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";

import {
  UIContainer,
  storeKey,
  initialState as initialStoreState,
} from "./UIStore";
import databases from "storages";
import { useLocale } from "../Locale/LocaleStore";
import { RootThemeProvider } from "../../themes/Providers";
import {useLoaderActions} from "../loader";

const withUIPersist = <P extends object>(
  Component: ComponentType<P>,
): FC<P & any> => ({ ...props }: any) => {
  const [storePersisted, setStorePersisted] = useState(initialStoreState);
  const loader = useLoaderActions();
  const [, localeActions] = useLocale();
  useEffect(() => {
    loader.push(localeActions.load());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useLayoutEffect(() => {
    (async function getPersistData() {
      const data = await databases.getItem(storeKey).catch((err: Error) => {
        // tslint:disable-next-line:no-console
        console.error(err);
      });
      if (data) {
        setStorePersisted({
          ...data,
          initiated: true,
        });
      } else {
        setStorePersisted({
          ...initialStoreState,
          initiated: true,
        });
      }
    })();
  }, []);
  if (storePersisted && !storePersisted.initiated) return null;
  return (
    <UIContainer isGlobal={true} initialState={storePersisted}>
      <RootThemeProvider>
        <Component {...(props as P)} />
      </RootThemeProvider>
    </UIContainer>
  );
};

export default withUIPersist;
