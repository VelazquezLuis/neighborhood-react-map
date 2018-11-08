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

  componentWillUnmount = () => {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState({show: true});
  }

  render = () => {
    return (
      <section>
        {this.state.show
          ? (
            <section>
              <h1>Error loading page</h1>
              <p> could not load map due to a network error. try agian later</p>
            </section>
          )
          : (<section><h1>loading</h1></section> )  
        } </section>
    )
  }
}

export default ErrMapPg;