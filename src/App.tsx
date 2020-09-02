import React from 'react';
import withAuthPersist from "./stores/authenticationsStore/withAuthPersist";
import Routes from "./pages/Routes";

function App() {
  return <Routes/>
}

export default withAuthPersist(App);
