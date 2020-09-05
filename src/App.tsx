import React from 'react';
import withAuthPersist from "stores/AuthenticationsStore/withAuthPersist";
import Routes from "./pages/Routes";
import 'middlewares/logger'
import 'middlewares/persistent'

export const App:React.FC = () => {
  return <Routes/>
}

export default withAuthPersist(App);
