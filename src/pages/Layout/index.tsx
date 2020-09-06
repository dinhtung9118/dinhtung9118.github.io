import React from 'react';
import Header from "components/Header";
import SideBar from "components/SideBar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grow:{
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const Layout: React.FC = ({children}) => {
  const classes = useStyles();
  return (
    <div>
      <Header/>
      <SideBar/>
      <div className={classes.toolbar} />
      <main className={classes.content}>
        {children}
      </main>
    </div>
  )
}

export default Layout;
