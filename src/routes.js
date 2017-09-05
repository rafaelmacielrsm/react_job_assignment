import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Favicon from 'react-favicon';
import App from './components/App'
import AppTheme from './components/ui/AppTheme'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';




const routes = (
    <BrowserRouter>
        <div className="page">
          <Favicon url="/zombie.png"/>
          <AppTheme component={FloatingActionButton} >
            <ContentAdd />
          </AppTheme>

          <Route path="/" component={App}/>
        </div>
    </BrowserRouter>
)

export default routes
