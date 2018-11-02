import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react';

const api_Key = "AIzaSyAM4l2gAoyd3OxMlqhkICZ_IfFoQ1E-Uds";

class MapShowcase extends Component {
  //holds map object
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false

  };


  componentDidMount = () => {

  }

  //once map has loaded this will execute and pass the map object 
  mapReady = (props,map) => {
    //savethe map refrence in state and prepare the location  markers 
    this.setState({map});
    this.updateMarkers(this.props.locations);
  }

  //close markers animation
  closeInfoWindow = () => {
    this.state.activeMarker && this
      .state
      .activeMarker
      .setAnimation(null);
    this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});    
  }

  //closes all info windows 
  onMarkerClick = (props, marker, e) => {
    this.closeInfoWindow();

    this.setState({showingInfoWindow:true ,activeMarker:marker, activeMarkerProps: props});
  }

  //handles location markers after filtering
  updateMarkers = (locations) => {
    if(!locations)
      return;
    
    //clears out markers first 
    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps =[];
    let markers = locations.map((location, index) => {
      let mProps = { // change name to temp maeker props
        key:index,
        index,
        name: location.name,
        position: location.pos,
        url: location.url
      };
      markerProps.push(mProps);

      let animation = this.props.google.maps.Animation.DROP;
      let marker = new this.props.google.maps.Marker({
        position: location.pos,
        map: this.state.map,
        animation
      });
      marker.addListener('click', () => {
        this.onMarkerClick(mProps, marker, null);
      });
      return marker;
    })
    this.setState({markers,markerProps});
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
    let amProps = this.state.activeMarkerProps; //cnage amprps to activemarkerprops

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
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}>
          <div>
            <h3>{amProps &&  amProps.name} </h3>
            {amProps && amProps.url ? (<a href={amProps.url}>See Website</a> )
            : ""}
          </div>
          </InfoWindow>
      </Map>
    )
  }
}
export default GoogleApiWrapper({apiKey: api_Key})(MapShowcase)