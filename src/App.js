import React, {Component} from 'react';
import './App.css';
import locations from './data/locations.json';
import MapShowcase from './models/MapShowcase.js';

class App extends Component {
  //basic state of the map
  state = {
    lat: 36.1175759,
    lng: -115.1884364,
    zoom: 14,
    all: locations // change all to somthing similliar 
  }


  //renders google map into the browser 
  render = () => {
    return (
      <div className="App">
        <div>
            
            <h1>
                Vegas Casions & Hotels
            </h1>
          
        </div>
        <MapShowcase
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.all}/>  
      </div>
    );
  }
}

export default App;
