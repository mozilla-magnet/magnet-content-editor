import React, { Component, PropTypes, } from 'react';
import './App.css';
import Header from '../Header/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RouterActions from '../../actions/RouterActions';

class App extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  componentDidMount() {
    if (this.props.params.channel) {
      RouterActions.navigateToChannel(this.props.params.channel);
    } else {
      RouterActions.navigateToChannelList();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("App receive props");
    if (nextProps.params && nextProps.params.channel) {
      if (nextProps.params.channel != this.props.params.channel) {
        RouterActions.navigateToChannel(nextProps.params.channel);
      }
    } else {
      if (this.props.params && this.props.params.channel) {
        RouterActions.navigateToChannelList();
      }
    }
  }

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
