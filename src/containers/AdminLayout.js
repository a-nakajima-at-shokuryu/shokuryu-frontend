import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppHeader from '../components/AppHeader'; 
import AppSidebar from '../components/AppSidebar'; 
import AppFooter from '../components/AppFooter'; 
import MainContents from '../components/MainContents'; 

const sidebarWidth = 200; 

const useStyles = makeStyles(theme => ({
  root: {}, 
  header: {
    width: `calc(100vw - ${sidebarWidth}px)`, 
  }, 
  sidebar: {
    width: sidebarWidth, 
  }, 
  contents: {
    marginTop: theme.mixins.toolbar.minHeight, 
    marginLeft: sidebarWidth, 
    minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`, 
  }, 
  foolter: {}, 
})); 

const AdminLayout = ({
  title, 
  children, 
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppHeader className={classes.header} title={title} />
      <AppSidebar className={classes.sidebar} />
      <MainContents className={classes.contents}>
        {children}
      </MainContents>
      <AppFooter className={classes.footer} />
    </div>
  )
}

export default AdminLayout
