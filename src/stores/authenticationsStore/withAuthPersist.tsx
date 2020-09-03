import React, {ComponentType, FC, useLayoutEffect, useState} from "react";
import {
  AuthenticationContainer,
  initialStoreState,
  storeKey
} from "./authentication";
import databases from "../../storages";

const withAuthPersist = <P extends object>(Component: ComponentType<P>): FC<P & any> => ({ ...props }: any) => {
  const [storePersisted, setStorePersisted] = useState(initialStoreState);

  useLayoutEffect(() => {
    (async function getPersistData() {
      console.log('storeKey', storeKey);
      const data = await databases.getItem(storeKey).catch((err: Error) => {
        // tslint:disable-next-line:no-console
        console.error(err);
      });
      console.log('new', data);
      if (data) {
        setStorePersisted({
          ...data,
        });
      } else {
        setStorePersisted({
          ...initialStoreState,
        });
      }
    })();
  }, []);

  return (
    <AuthenticationContainer isGlobal={true} initialState={storePersisted} >
      <Component {...(props as P)} />
    </AuthenticationContainer>
  );
};

export default withAuthPersist;
