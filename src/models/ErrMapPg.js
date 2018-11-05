import React, {Component} from 'react';

class ErrMapPg extends Component {
  state = {
    show: false,
    timeout: null
  }

  componentDidMount = () => {
    let timeout = window.setTimeout(this.showMessage, 1000);
    this.setState({timeout});
  }

  componentWillMount = () => {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState({show: true});
  }

  render = () => {
    return (
      <div>
        {this.state.show
          ? (
            <div>
              <h1>Error loading page</h1>
              <p> could not load map due to a network error. try agian later</p>
            </div>
          )
          : (<div><h1>loading</h1></div> )  
        } </div>
    )
  }
}

export default ErrMapPg;