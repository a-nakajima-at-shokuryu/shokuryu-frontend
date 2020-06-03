import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar, 
  Typography, 
  IconButton,
  Tooltip, 
  Link, 
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'; 
import GitHubIcon from '@material-ui/icons/GitHub'; 
import clsx from 'clsx'; 

const useStyles = makeStyles(theme => ({
  root: {}, 
  spacer: {
    flex: 1, 
  }, 
}));

const AppHeader = ({
  title, 
  className, 
  ...other 
}) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} {...other} >
      <Toolbar>
        <IconLink icon={<MenuIcon />} title="メニュー" edge="start" />
        <Logo title={title} />
        <div className={classes.spacer} />
        <IconLink icon={<GitHubIcon />} title="Gitリポジトリ" edge="end" />
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader;

const IconLink = ({
  icon, 
  title, 
  ...other 
}) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" {...other}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
const Logo = ({
  title, 
  tooltip, 
  ...other 
}) => {
  return (
    <Tooltip title={tooltip || title}>
      <Link color="inherit" underline="none" style={{ cursor: 'pointer' }}>
        <Typography {...other}>
          {title}
        </Typography>
      </Link>
    </Tooltip>
  );
};