import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import BeaconStore from '../../stores/BeaconStore';
import BeaconMarkerItem from './BeaconMarkerItem';

import 'leaflet/dist/leaflet.css';
import './ChannelView.css';

export default class ChannelView extends Component {

  constructor(props) {
    super(props);
    this.state = this.getStateFromStore();
  }

  getStateFromStore() {
    return {
      beacons: BeaconStore.getAllForCurrentChannel() || []
    };
  }

  componentDidMount() {
    BeaconStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillMount() {
    BeaconStore.addChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(this.getStateFromStore());
  }

  render() {
    // Record a list of all positions so Leaflet
    // can create a bounding box for the map view
    const bounds = [];

    const markers = this.state.beacons.map((beacon) => {
      const position = [
        beacon.location.latitude,
        beacon.location.longitude,
      ];

      bounds.push(position);

      return (
        <BeaconMarkerItem
          key={beacon.id}
          beacon={beacon}
        />
      );
    });

    if (bounds.length === 0) {
      // Create a London Area Bounding box by default
      bounds.push([51.3757, -0.4358]);
      bounds.push([51.6188, 0.1867]);
    }

    return (
      <div className="MapContainer">
        <Map
          bounds={bounds}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers}
        </Map>
      </div>
    );
  }
}