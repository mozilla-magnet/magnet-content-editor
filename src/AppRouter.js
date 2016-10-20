import React, { PropTypes, Component } from 'react';
import { Router, Route } from 'react-router';
import App from './components/App/index';
import ChannelList from './components/ChannelList/index';
import ChannelView from './components/ChannelView/index';
import RouterActions from './actions/RouterActions';

export default class AppRouter extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  };
  componentWillMount() {
    /*
    if (this.props.params.channel) {
      RouterActions.navigateToChannel(this.props.params.channel);
    } else {
      RouterActions.navigateToChannelList();
    }
    */
  }

  componentWillReceiveProps(nextProps) {
    console.log("App receive props");
    if (nextProps.params && nextProps.params.channel) {
      if (nextProps.params.channel != this.props.params.channel) {
        RouterActions.navigateToChannel(nextProps.params.channel);
      }
    } else {
      RouterActions.navigateToChannel();
    }
  }

  render() {
    const { history, } = this.props;

    return (
      <Router history={history}>
        <Route name='root' path='/' component={App}>
          <Route name='channels' path='/channel' component={ChannelList} />
          <Route name='beacons' path='/channel/:channel' component={ChannelView} />
        </Route>
      </Router>
    );
  }
}
