import React from 'react';
import withAuthPersist from "stores/AuthenticationsStore/withAuthPersist";
import Routes from "./pages/Routes";
import 'middlewares/logger'
import 'middlewares/persistent'
import withUIPersist from "./stores/UIstore/withUIStore";
import withI18nPersist from "./stores/Locale/withLocalePersist";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";

export const App:React.FC = () => {
  return <Routes/>
}

export default withI18nPersist(withUIPersist(withAuthPersist(App)));
