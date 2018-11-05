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
    filtered:null,
    open: false

  }

  styles = {
    menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: "white",
      padding:10
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop:"0px"
    }
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }

  //shows the list
  toggleDrawer = () => {
    this.setState({
      open: !this.state.open
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
      <div className="App">
        <div>
          <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
            <i className= "fa fa-bars"></i>
          </button>          
          <h1>
              Vegas Casinos & Hotels
          </h1>          
        </div>
        <MapShowcase
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.filtered}
          selectedIndex={this.state.selectedIndex}
          clickListItem={this.clickListItem}/>
        <ListDD 
          locations={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
          filterLocations= {this.updateQuery}
          clickListItem={this.clickListItem}/>
      </div>
    );
  }
}

export default App;
