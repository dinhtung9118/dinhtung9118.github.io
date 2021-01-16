import React from "react";
import Routes from "./pages/Routes";
import "middlewares/logger";
import "middlewares/persistent";
import withUIPersist from "./stores/UIstore/withUIStore";
import withI18nPersist from "./stores/Locale/withLocalePersist";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
import withAuthPersist from "./stores/authenticationsStore/withAuthPersist";

export const App: React.FC = () => {
  return <Routes />;
};

export default withI18nPersist(withUIPersist(withAuthPersist(App)));
