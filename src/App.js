import React, {Component} from 'react';
import './App.css';
import locations from './data/locations.json';
import MapShowcase from './models/MapShowcase.js';
import ListDD from './models/ListDD'
class App extends Component {
  //basic state of the map
  state = {
    lat: 36.1175759,
    lng: -115.1884364,
    zoom: 14,
    all: locations, // change all to somthing similliar 
    filtered: null,
    open: false

  }
  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }  

  //refresh the query string
  updateQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all,query)
    });
  }

  //mateches query
  filterLocations = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  //make the location match the state
  clickListItem = (index) => {
    this.setState({ selectedIndex: index, open: !this.state.open})
  }

  //renders google map into the browser 
  render = () => {
    return (
      <section className="App">
        <section>                    
          <h1>
              Vegas Casinos & Hotels
          </h1>          
        </section>
        <MapShowcase
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.filtered}
          selectedIndex={this.state.selectedIndex}
          clickListItem={this.clickListItem}
          />
        <ListDD 
          locations={this.state.filtered}
          filterLocations= {this.updateQuery}
          clickListItem={this.clickListItem}/>
      </section>
    );
  }
}

export default App;
