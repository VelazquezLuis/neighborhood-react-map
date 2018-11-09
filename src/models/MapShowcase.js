import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import ErrMapPg from './ErrMapPg'

const api_Key = "AIzaSyAM4l2gAoyd3OxMlqhkICZ_IfFoQ1E-Uds";
const FS_ClientID = "3I1W1BDIM1IXGXRZ4VJTABHNFZ1ZAKSWBCFEKHXBQ0THH1VC";
const FS_ClientSecret ="2ZUKK5CRH5TCR55DHKTYHUXH51PXJLHZH1HKSRLL45GPYBQO";
const FS_Version = "20181108"

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

  componentDidMount ()  {

  }

  //
  componentWillReceiveProps = (props) => {
    this.setState({firstDrop: false});

    //update markers
    if (this.state.markers.length !== props.locations.length) {
      this.closeInfoWindow();
      this.updateMarkers(props.locations);
      this.setState({activeMarker: null});
      return;
    }

    //close window of any non selected markers
    if (!props.selectedIndex || (this.state.activeMarker &&
    (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
      this.closeInfoWindow();
    }

    //check for a selected index
    if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined") {
      return;
    };

    ///index clicked
    this.onMarkerClick(this.state.markerProps[props.selectedIndex],
    this.state.markers[props.selectedIndex]);

  }

  //once map has loaded this will execute and pass the map object
  mapReady = (props,map) => {
    //savethe map refrence in state and prepare the location  markers
    this.setState({map});
    this.updateMarkers(this.props.locations);
  }

  //close markers animation
  closeInfoWindow = () => {
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});
  }
  // gets data from 4 square
  getBusinessInfo = (props, data) => {
    return data.response.venues.filter(item => item.name.includes(props.name) || props.name.includes(item.name));
  }
  
  //closes all info windows 
  onMarkerClick = (props, marker, e) => {
    this.closeInfoWindow();

    //get FS data
    let url=  `https://api.foursquare.com/v2/venues/search?client_id=${FS_ClientID}&client_secret=${FS_ClientSecret}&v=${FS_Version}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
    let headers = new Headers();
    let request = new Request(url, {
      method: 'GET',
      headers
    });

    //Create props for the active marker
    let activeMarkerProps;
    fetch(request)
    .then(response => response.json())
    .then(result => {
      // fecthes  the name from FS
      let restaurant =  this.getBusinessInfo(props, result);
      activeMarkerProps = {
        ...props,
        foursquare: restaurant[0]
      };

      //
      if (activeMarkerProps.foursquare) {
        let url = `https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=${FS_ClientID}&client_secret=${FS_ClientSecret}&v=${FS_Version}`;
        fetch(url)
        .then(response => response.json())
        .then(result => {
          activeMarkerProps = {
        ...activeMarkerProps,
        images: result.response.photos
        };
        if (this.state.activeMarker)
          this.state.activeMarker.setAnimation(null);
        marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
        this.setState({showingInfoWindow: true,activeMarker: marker, activeMarkerProps});
        })
      } else {
        marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
        this.setState({showingInfoWindow:true ,activeMarker:marker, activeMarkerProps: props});
      }
    })
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
        index:index,
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
          <section>
            <h3> {amProps &&  amProps.name} </h3>
            {amProps && amProps.url
              ? (
                <a href={"http://"+ amProps.url}>See Website</a>
              )
              : ""}
            {amProps && amProps.images
              ? (
                <section><img
                  alt={amProps.name + "casino picture"}
                  src={amProps.images.items[0].prefix + "100x100" + amProps.images.items[0].suffix}/>
                  <p>image form foursquare</p>
                </section>
              )
              : ""
            }
          </section>
        </InfoWindow>
      </Map>
    )
  }
}
export default GoogleApiWrapper({apiKey: api_Key, LoadingContainer: ErrMapPg})(MapShowcase)