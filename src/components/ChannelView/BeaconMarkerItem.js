import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Marker from '../SvgMarker';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import BeaconForm from './BeaconForm';
import L from 'leaflet';

import LocationIcon from 'material-ui/svg-icons/maps/place';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const style = {
  placeIcon: {
    width: 50,
    height: 55,
  }
};

export default class BeaconMarkerItem extends Component {
  static propTypes = {
    beacon: PropTypes.object
  };

  lastSawLocation = {};

  _handleDragEnd(beaconId, event) {
    this.props.handleBeaconLocationUpdate(beaconId, this.lastSawLocation);
  }

  _handleMove(beaconId, event) {
    // Keep track of the position for use in dragend
    this.lastSawLocation.latitude = event.latlng.lat;
    this.lastSawLocation.longitude = event.latlng.lng;
  }

  _handleClick() {
    this.props.handleBeaconClick(this.props.beacon.id);
  }

  render() {
    const { beacon, ...inheritedProps, } = this.props;

    const position = [
      beacon.location.latitude,
      beacon.location.longitude,
    ];

    return (
      <Marker
        {...inheritedProps}
        position={position}
        iconSize={[style.placeIcon.width, style.placeIcon.height]}
        draggable={true}
        onDragEnd={this._handleDragEnd.bind(this, beacon.id)}
        onMove={this._handleMove.bind(this, beacon.id)}
        onClick={this._handleClick.bind(this)}
      >
      </Marker>
    );
  }
}
