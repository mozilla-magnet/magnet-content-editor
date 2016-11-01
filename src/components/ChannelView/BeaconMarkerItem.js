import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Marker, Popup, } from 'react-leaflet';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import BeaconForm from './BeaconForm';

export default class BeaconMarkerItem extends Component {
  static propTypes = {
    beacon: PropTypes.object
  };

  _handleDragEnd(beaconId, event) {
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
        draggable={true}
        onDragEnd={this._handleDragEnd.bind(this, beacon.id)}
      >
        <Popup>
          <BeaconForm beacon={beacon} />
        </Popup>
      </Marker>
    );
  }
}
