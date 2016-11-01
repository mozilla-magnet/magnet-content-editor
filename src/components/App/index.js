import React, { Component, PropTypes, } from 'react';
import './App.css';
import Header from '../Header/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    console.log('Rendering app..');
    console.dir(this.props);
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
