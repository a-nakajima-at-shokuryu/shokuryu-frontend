import React from 'react';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },
  },
  typography: {
    fontSize: 12,
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

const MuiProvider = ({
  children, 
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default MuiProvider
