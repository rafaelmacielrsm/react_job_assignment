import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#9DC8C8"
  }
});

const AppTheme = ({component: WrapedComponent, children, ...rest} = props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <WrapedComponent {...rest} >
      {children ? children : null}
    </WrapedComponent>
  </MuiThemeProvider>
);


export default AppTheme
