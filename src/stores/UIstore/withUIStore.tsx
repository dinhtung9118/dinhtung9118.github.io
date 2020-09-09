import React, { FC, ComponentType, useState, useLayoutEffect } from 'react';

import { UIContainer, storeKey, initialState as initialStoreState } from './UIStore';
import databases from "storages";

const withUIPersist = <P extends object>(Component: ComponentType<P>): FC<P & any> => ({ ...props }: any) => {
  const [storePersisted, setStorePersisted] = useState(initialStoreState);

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
      <Component {...(props as P)} />
    </UIContainer>
  );
};

export default withUIPersist;
