import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const api_Key = "AIzaSyAM4l2gAoyd3OxMlqhkICZ_IfFoQ1E-Uds";

class MapShowcase extends Component {
  //hold map object
  state = {
    map: null
  };


  componentDidMount = () => {

  }

  //once map has loaded this will execute and pass the map object 
  mapReady = (props,map) => {
    //savethe map refrence in state and prepare the location  makrkers 
    this.setState({map});
  }

  // rednders the mab object
  render = () => {
    //style and center can be teaked later 
    const style = {
      width: '100%',
      height: '100%'
    }
    const center = {
      lat: this.props.lat,
      lng: this.props.lng
    }
    return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        google={this.props.google}
        zoom={this.props.zoom}
        style={style}
        initialCenter={center}
        onClick={this.closeInfoWindow}>
      </Map>
    )
  }
}
export default GoogleApiWrapper({apiKey: api_Key})(MapShowcase)