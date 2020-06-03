import React, { useState } from 'react';
import {
  makeStyles,
  BottomNavigation, 
  BottomNavigationAction,
} from '@material-ui/core';
import clsx from 'clsx';
import HomeIcon from '@material-ui/icons/Home'; 
import RestoreIcon from '@material-ui/icons/Restore'; 
import LocationOnIcon from '@material-ui/icons/LocationOn'; 
import FavoriteIcon from '@material-ui/icons/Favorite'; 

const bottomNavigationWidth = 500;
const useStyles = makeStyles(theme => ({
  root: {
    width: bottomNavigationWidth, 
    boxShadow: theme.shadows[5], 
    position: 'sticky', 
    bottom: 0, 
    margin: '0 auto', 
  }, 
}));
const AppFooter = ({
  className, 
  ...other 
}) => {
  const classes = useStyles();
  const [value, setValue] = useState();

  return (
    <BottomNavigation 
      className={clsx(classes.root, className)} 
      value={value}
      onChange={(e, value) => {
        setValue(value); 
      }}
      showLabels 
      {...other}
    >
      <BottomNavigationAction icon={<HomeIcon />} label="Home" />
      <BottomNavigationAction icon={<RestoreIcon />} label="Recent" />
      <BottomNavigationAction icon={<FavoriteIcon />} label="Favorites" />
      <BottomNavigationAction icon={<LocationOnIcon />} label="LocationOn" />
    </BottomNavigation>
  )
}

export default AppFooter
