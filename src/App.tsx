import React from 'react';
import withAuthPersist from "./stores/authenticationsStore/withAuthPersist";
import Routes from "./pages/Routes";
import 'middlewares/logger'
import 'middlewares/persistent'

function App() {
  return <Routes/>
}

export default withAuthPersist(App);
