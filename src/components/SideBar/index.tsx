import React from 'react';
import {Link} from 'react-router-dom'
import clsx from 'clsx';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import {useStyles} from "./index.style";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {mockDataSidebar} from "./SideBarMenu";
import {MenuProps} from "./SideBar";
import useUI from "../../stores/UIstore/UIStore";


const SideBar: React.FC = () => {
  const [state, action] = useUI();
  const classes = useStyles();
  const handlerDrawer = () => {
    action.toggleSideBar(!state.sideBar.collapsed);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: state.sideBar.collapsed,
        [classes.drawerClose]: !state.sideBar.collapsed,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: state.sideBar.collapsed,
          [classes.drawerClose]: !state.sideBar.collapsed,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handlerDrawer}>
          {state.sideBar.collapsed ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
        </IconButton>
      </div>
      <Divider/>
      <List>
        {mockDataSidebar.menus.map((menu: MenuProps, index: number) => (
          <Link className={`${classes.link} underlineNone`} to={menu.to}>
            <ListItem button key={menu.featureName}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon/> :
                  <MailIcon/>}
              </ListItemIcon>
              <ListItemText primary={menu.title}/>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar
