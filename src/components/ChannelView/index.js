import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import BeaconMarkerItem from './BeaconMarkerItem';
import BeaconPropertyDrawer from '../BeaconPropertyDrawer';
import BeaconForm from './BeaconForm';
import MapView from '../MapView';

import './ChannelView.css';

export default class ChannelView extends Component {

  render() {
    return (
      <MapView
        points={this.props.beacons}
        onMarkerClick={this.props.onBeaconClick}
      />
    );
  }
}
