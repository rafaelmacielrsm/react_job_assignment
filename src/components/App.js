import Favicon from 'react-favicon';
import { Component } from 'react'

import { Login } from './ui/Login'
import { Dashboard } from './ui/Dashboard'


export class App extends Component {
  state = {
    user: null
  }

  handleNewUser = (uuid) => {
    localStorage.setItem('user_id', uuid);
    this.setState({user: uuid});
  }

  componentWillMount = () => {
    this.setState({user: localStorage.getItem("user_id") || null})
  }

  render(){
    const {user} = this.state
    return(
      <div className="page">
        <Favicon url="/zombie.png"/>

        {user ?
          <Dashboard uuid={this.state.user}/>
          : <Login handleUser={this.handleNewUser}/>
        }


      </div>
    );
  }
}
