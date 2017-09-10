import { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Overview } from './Overview'
import PageLoading from './PageLoading'
import palette from '../../stylesheets/ui.scss'

export class Dashboard extends Component {

  state = {
    loading: false,
    alertMessage: undefined
  }

  componentWillMount = () => {
    
  }

  render(){
    return(
      <div className="dashboard">
      { this.state.loading ? <PageLoading color={palette.accent_color_dark}/> :
          <div className="page-content">
            <BrowserRouter>
              <Route exact path='/' component={Overview}/>
            </BrowserRouter>
          </div>
      }
    </div>
    );
  }
}
