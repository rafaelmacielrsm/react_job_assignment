import GoogleMapReact from 'google-map-react';
import { Component } from 'react'
import MyLocation from 'material-ui/svg-icons/maps/my-location';
import PlacePin from 'material-ui/svg-icons/maps/place';
import RaisedButton from 'material-ui/RaisedButton';
import palette from '../../stylesheets/ui.scss'

export class MapComponent extends Component {
  state = {
    newLocation: {
      active: false
    }
  }

  componentWillUpdate = (newProps, nextState) => {
    if(this.props !== newProps) {
      this.setState({newLocation: {active: false}})
    }

  }

  render(){
    const { lat, lng, zoom } = this.props
    return(

      <div className="map-container">
        {this.state.newLocation.active ?
          <RaisedButton
            secondary={true}
            label="Save new Position"
            onClick={() => this.props.handleNewLocation(this.state.newLocation)}
            style={{float: 'left'}}/> : null
        }

        <GoogleMapReact
          center={{lat, lng}}
          defaultZoom={zoom}
          options={defaultMapOptions}
          onClick={(event) => this.setState(
            {
              newLocation:
              {
                  lat: event.lat,
                  lng: event.lng,
                  active: true
              }
            }
          )}>

            <MyLocationMarker lat={lat} lng={lng}/>

            {this.state.newLocation.active ?
              <NewLocationMarker
                lat={this.state.newLocation.lat}
                lng={this.state.newLocation.lng}/> : null}

        </GoogleMapReact>

      </div>
    );
  }
}

const defaultMapOptions = {
  fullscreenControl: false,
  draggableCursor: 'crosshair'
};


const MyLocationMarker = (props) => (
  <div style={{width: 50, marginLeft: -12, marginTop: -12}}>
    <MyLocation color={palette.accent_color_light} />
    <h2 style={{margin: 0, color: palette.accent_color_light}}>You</h2>
  </div>
)

const NewLocationMarker = (props) => (
  <div style={{width: 50, marginLeft: -12, marginTop: -12}}>
    <PlacePin color={palette.accent_color} />
    <h2 style={{margin: 0, color: palette.accent_color}}>New Location</h2>
  </div>
)
