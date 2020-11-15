import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./index.style";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { mockDataSidebar } from "./SideBarMenu";
import { MenuProps } from "./SideBar";
import useUI from "stores/UIstore/UIStore";
import Header from "../Header";

const SideBar: React.FC = () => {
  const [state, action] = useUI();
  const classes = useStyles();
  const handlerDrawer = () => {
    action.toggleSideBar(!state.sideBar.collapsed);
  };

  return (
    <>
      <Header
        className={clsx(classes.appBar, {
          [classes.appBarShift]: state.sideBar.collapsed,
        })}
      />
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
          <Typography variant="h5" noWrap color="primary">
            MebX
          </Typography>
          <IconButton onClick={handlerDrawer}>
            {state.sideBar.collapsed ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List>
          {mockDataSidebar.menus.map((menu: MenuProps, index: number) => (
            <Link
              key={`${menu.title}_${index}`}
              className={`${classes.link}`}
              to={menu.to}
            >
              <ListItem button>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <InboxIcon className={classes.IconMenu} />
                  ) : (
                    <MailIcon className={classes.IconMenu} />
                  )}
                </ListItemIcon>
                <ListItemText primary={menu.title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
