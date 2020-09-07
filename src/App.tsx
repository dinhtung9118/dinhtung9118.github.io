import React from 'react';
import withAuthPersist from "stores/AuthenticationsStore/withAuthPersist";
import Routes from "./pages/Routes";
import 'middlewares/logger'
import 'middlewares/persistent'
import withUIPersist from "./stores/UIstore/withUIStore";

export const App:React.FC = () => {
  return <Routes/>
}

export default withUIPersist(withAuthPersist(App));
