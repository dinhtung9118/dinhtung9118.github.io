import React, {ComponentType, FC} from "react";
import {AuthenticationContainer} from "./authentication";

const withAuthPersist = <P extends object>(Component: ComponentType<P>): FC<P & any> => ({ ...props }: any) => {
  return (
    <AuthenticationContainer isGlobal={true}>
      <Component {...(props as P)} />
    </AuthenticationContainer>
  );
};

export default withAuthPersist;
