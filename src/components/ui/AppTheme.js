import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, { Component } from 'react'
import paletteUi from '../../stylesheets/ui.scss'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: paletteUi.primary_color,
    accent1Color: paletteUi.accent_color,
    accent2Color: paletteUi.accent_color_light
  },
  textField: {
    focusColor: paletteUi.accent_color,
  },
  radioButton: {
    checkedColor: paletteUi.accent_color,
  }
});

const AppTheme = ({component: WrapedComponent, children, ...rest} = props) => {

  return(
    <MuiThemeProvider muiTheme={muiTheme}>
      <WrapedComponent {...rest} >
        {children ? children : null}
      </WrapedComponent>
    </MuiThemeProvider>
  );
}




export default AppTheme
