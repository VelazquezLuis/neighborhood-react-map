import React, { Component } from 'react';
class ListDD extends Component {
  state = {
    query: ""
  }
  
  //refresh the query string
  updateQuery = (newQuery) => {
    this.setState({query : newQuery});
    this.props.locationFilter(newQuery);
  }

  render () {
    return (
      <section className="sideBar">
          <section className="list">
            <input className="filterText"
              type="text"
              placeholder="Filter list"
              name="filter"
              onChange={e => this
                .updateQuery(e.target.value)}
                value={this.state.query} />
            <ul className="unCasinoList">
              {this.props.locations && this
              .props
              .locations
              .map((location, index) => {
                return (
                  <li className="listItem" key={index}>
                    <button className="listLink" key={index} onClick={e => this.props.itemClick(index)}> {location.name} </button>
                  </li>
                )
              })}
            </ul>
          </section>
      </section>
    )
  }
}

export default ListDD;
