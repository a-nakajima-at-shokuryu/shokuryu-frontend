import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1), 
  }, 
}));

const MainContents = ({
  className, 
  children, 
  ...other
}) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, className)}
      {...other}
    >
      {children}
    </div>
  )
}

export default MainContents
