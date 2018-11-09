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
  
  componentDidMount () {    
    this.setState({
      ...this.state,
      filtered: this.locationFilter(this.state.all, "")
    });

    setTimeout(function(){ if(window.google) {
      console.log("maps work"); 
    } else { alert
      ("Error loading page could not load map due to a network error. try agian later" );
    } }, 3000);
  }

  //refresh the query string
  updateQuery =(query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.locationFilter(this.state.all,query)
    });
  }

  //mateches query
  locationFilter = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  //make the location match the state
  itemClick = (index) => {
    this.setState({ selectedIndex: index, open: !this.state.open})
  }

  //renders google map into the browser
  render () {
    return (
      <section className="App">
        <header>
          <h1 className="headertitle">
              Vegas Casinos & Hotels
          </h1>
        </header>
        <ListDD
          locations={this.state.filtered}
          locationFilter= {this.updateQuery}
          itemClick={this.itemClick}
          tabIndex={0}/>          
        <MapShowcase          
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.filtered}
          selectedIndex={this.state.selectedIndex}
          itemClick={this.itemClick}
          tabIndex={-1}/>        
      </section>
    );
  }
}

export default App;
