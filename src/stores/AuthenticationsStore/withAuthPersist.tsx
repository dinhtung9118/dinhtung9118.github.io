import React, { ComponentType, FC, useLayoutEffect, useState } from "react";
import {
  AuthenticationContainer,
  initialStoreState,
  storeKey,
} from "./authentication";
import databases from "storages";

const withAuthPersist = <P extends object>(
  Component: ComponentType<P>,
): FC<P & any> => ({ ...props }: any) => {
  const [storePersisted, setStorePersisted] = useState(initialStoreState);

  useLayoutEffect(() => {
    (async function getPersistData() {
      const data = await databases.getItem(storeKey).catch((err: Error) => {
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
    <AuthenticationContainer isGlobal={true} initialState={storePersisted}>
      <Component {...(props as P)} />
    </AuthenticationContainer>
  );
};

export default withAuthPersist;
