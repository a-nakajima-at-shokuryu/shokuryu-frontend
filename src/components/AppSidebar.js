import React from 'react';
import {
  makeStyles,
  Drawer, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Tooltip, 
} from '@material-ui/core';
import clsx from 'clsx';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import DesktopIcon from '@material-ui/icons/DesktopWindows';
import KeyboardIcon from '@material-ui/icons/Keyboard';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: theme.shadows[5], 
  }, 
  toolbar: {
    ...theme.mixins.toolbar, 
  }, 
}));

const AppSidebar = ({
  className, 
  ...other
}) => {
  const classes = useStyles();

  return (
    <Drawer
      className={clsx(classes.root, className)}
      classes={{
        paper: clsx(classes.root, className), 
      }}
      {...other}
      open 
      variant="persistent"
    >
      
      <div className={classes.toolbar} />
      
      <Divider />
      
      <List>
        <MenuComponent icon={<SmartphoneIcon />} title="スマートフォン" />
        <MenuComponent icon={<DesktopIcon />} title="デスクトップ" />
        <MenuComponent icon={<KeyboardIcon />} title="キーボード" />
      </List>
      
    </Drawer>
  )
}

export default AppSidebar; 

const MenuComponent = ({
  icon, 
  title, 
  ...other
}) => {
  return (
    <ListItem button {...other}>
      <Tooltip title={title}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      </Tooltip>
      <ListItemText>
        {title}
      </ListItemText>
    </ListItem>
  );
};