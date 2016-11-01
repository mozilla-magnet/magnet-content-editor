import React from 'react';
import { Router, Route } from 'react-router';
import App from './containers/App';
import ChannelListPage from './containers/ChannelListPage';
import BeaconOverviewPage from './containers/BeaconOverviewPage';
import BeaconEditor from './containers/BeaconEditor';

export default <Route path="/" component={App}>
  <Route path="/channel"
    component={ChannelListPage} />
  <Route path="/channel/:channelName"
    component={BeaconOverviewPage}/>
  <Route path="/channel/:channelName/:beaconId"
    component={BeaconEditor} />
  />
</Route>
