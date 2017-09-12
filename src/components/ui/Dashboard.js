import { Component } from 'react'
import { BrowserRouter, Route, Switch, NavLink, withRouter } from 'react-router-dom'
import { Overview } from './Overview'
import { Trading } from './Trading'
import { ReportInfection } from './ReportInfection'

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';

import PageLoading from './PageLoading'
import AppTheme from './AppTheme'
import { getPersonByUUID, getItems, saveNewPosition } from '../../lib/AxiosHelper'
import palette from '../../stylesheets/ui.scss'
import parameterize from '../../lib/parameterize'

export class Dashboard extends Component {

  state = {
    loading: true,
    loadingItems: true,
    alertMessage: false,
    snackbar: {message: "", isActive: false},
    user: {},
    items: {hasLoadedItems: false}
  }

  componentWillMount = () => {
    var promiseObj = getPersonByUUID(this.props.uuid)
    promiseObj
        .then( response => {
              const {name, gender, age, lonlat} = response.data;
              var positionArray = lonlat.substring(lonlat.indexOf('(') + 1,
                lonlat.indexOf(')')).split(' ').map(e => parseFloat(e));
              this.setState({
                user: {
                  name, gender, age,
                  position: {
                    latitude: positionArray[1],
                    longitude: positionArray[0]
                  }
                },
                loading: false
              });
          }
        )
        .catch(error => {
          if (error.response) {
            this.setState({
              loading: false,
              alertMessage: "Not Found"
            })
          }else if (error.request) {
            this.setState({
              loading: false,
              alertMessage: 'We are sorry, it seems like there was a network \
              error, try again in a few minutes'})
          }
        }
      )
  }

  handleSnackbarClosing= () => {
    this.setState({snackbar: {...this.state.snackbar, isActive: false }});
  }

  componentDidMount = () => {
    this.handleGetItems();
  }

  handleNewLocation = (newLocation) => {
    var json = {
      person: {
        lonlat: `POINT (${newLocation.lng} ${newLocation.lat})`
      }
    };

    var promiseObj = saveNewPosition(this.props.uuid, parameterize(json));
    promiseObj
      .then( response => {
        const {lonlat} = response.data;

        var positionArray = lonlat.substring(lonlat.indexOf('(') + 1,
          lonlat.indexOf(')')).split(' ').map(e => parseFloat(e));

        this.setState({
          user: {
            ...this.state.user,
            position: {
                latitude: positionArray[1],
                longitude: positionArray[0]
            }
          },
          snackbar: {
            message: "Location updated", isActive: true}
        });
      })
      .catch(error => {
        if (error.response) {
          this.setState({
            snackbar: {
              message: "Couldn't update your location", isActive: true}
          });
        }else if (error.request) {
          this.setState({
            alertMessage: 'We are sorry, it seems like there was a network \
              error, try again in a few minutes'
          });
        }
      });
  }

  handleGetItems = () => {
    var promiseObj = getItems(this.props.uuid)
    promiseObj
        .then( response => {
          var items = {}
          response.data.map((item) => (
            items[item.item.name] = {
              value: item.item.points, quantity: item.quantity})
          )

          this.setState({
            loadingItems: false, items: {...items, hasLoadedItems: true}})
        })
        .catch(error =>
        {
          if (error.response) {
            this.setState({
              loadingItems: false,
              alertMessage: "Couldn't load items."
            });
          }else if (error.request) {
            this.setState({
              loadingItems: false,
              alertMessage: 'We are sorry, it seems like there was a network \
                error, try again in a few minutes'
            });
          }
        });
  }

  render(){
    const alert =
      <Dialog modal={false} open={this.state.alertMessage ? true : false}>
        <p>{this.state.alertMessage}</p>
        <hr/>
        <RaisedButton secondary={true} label="Ok" style={{float: 'right'}}
          onClick={(e) => this.setState({alertMessage: false})}/>
      </Dialog>

      const snackbar = (
        <Snackbar
          open={this.state.snackbar.isActive}
          message={this.state.snackbar.message}
          action="dismiss"
          onActionTouchTap={this.handleSnackbarClosing}
          onRequestClose={this.handleSnackbarClosing}
        />
      )

    return(
      <div className="dashboard">
        <AppTheme component={Paper} className="paper-container">
          { alert }
          { snackbar }
          { this.state.loading ?
            <PageLoading color={palette.accent_color_dark}/> : null }

          <NavBar name={this.state.user.name} match={this.props.match}/>

          <div className="page-content">
            <Route exact path='/' render={() =>
              <Overview user={this.state.user} {...this.props.match}
                loadingItems={this.state.loadingItems} items={this.state.items}
                handleGetItems={this.handleGetItems}
                handleNewLocation={this.handleNewLocation}
              />}/>
            <Route exact path='/trades' component={Trading}/>
            <Route exact path='/report-infection'
              component={ReportInfection}/>
          </div>
    </AppTheme>
    </div>
    );
  }
}

const NavBar = (props) => {
    const {history} = props.match;
    return(
        <Tabs className="menu" inkBarStyle={{height: 3, marginTop: '-3px'}} >
          <Tab className="menu-item" label="Home"
            onActive={() => history.push('/') } />
          <Tab className="menu-item" label="Trade"
            onActive={() => history.push('/trades') } />
          <Tab className="menu-item" label="Report Infected"
            onActive={() => history.push('/report-infection') } />
          <Tab className="menu-item" label="About ZSSN"
            onActive={() => history.push('/zssn') } />
          </Tabs>
    );

}
