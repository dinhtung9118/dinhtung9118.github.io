import React, {useState} from 'react';
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


const SideBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handlerDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handlerDrawer}>
          {open ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
        </IconButton>
      </div>
      <Divider/>
      <List>
        {mockDataSidebar.menus.map((menu: MenuProps, index: number) => (
          <ListItem button key={menu.featureName}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon/> :
                <MailIcon/>}
            </ListItemIcon>
            <ListItemText primary={menu.title}/>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar
