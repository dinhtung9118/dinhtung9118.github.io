import React from 'react';
import clsx from 'clsx';
import Header from "components/Header";
import SideBar from "components/SideBar";
import {makeStyles} from "@material-ui/core/styles";
import useUI from 'stores/UIstore/UIStore';
import {drawerWidth} from "../../components/SideBar/index.style";

const useStyles = makeStyles((theme) => ({
  grow:{
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 50,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Layout: React.FC = ({children}) => {
  const classes = useStyles();
  const [state] = useUI();
  return (
    <div>
        <Header/>
        <SideBar/>
        <div className={classes.toolbar} />
        <main className={clsx(classes.content, {
          [classes.contentShift]: state.sideBar.collapsed,
        })} >
          {children}
        </main>
    </div>
  )
}

export default Layout;
