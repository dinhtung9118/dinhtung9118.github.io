import React, {
  ComponentType,
  FC,
  useLayoutEffect,
  useState
} from "react";
import {
  I18NContainer,
  initialState,
  storeKey
} from "./LocaleStore";
import databases from "storages";

const withI18nPersist = <P extends object>(Component: ComponentType<P>): FC<P & any> => ({ ...props }: any) => {
  const [storePersisted, setStorePersisted] = useState(initialState);

  useLayoutEffect(() => {
    (async function getPersistData() {
      const data = await databases.getItem(storeKey).catch((err: Error) => {
        console.error(err);
      });
      if (data) {
        setStorePersisted({
          ...data,
          initiated: true
        });
      } else {
        setStorePersisted({
          ...initialState,
          initiated: true
        });
      }
    })();
  }, []);

  if (storePersisted && !storePersisted.initiated) return null;
  return (
    <I18NContainer isGlobal={true} initialState={storePersisted} >
    <Component {...(props as P)} />
  </I18NContainer>
);
};

export default withI18nPersist;
