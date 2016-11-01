import React, { Component, PropTypes } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default class EventedMarker extends Component {
  static propTypes = {
    beacon: PropTypes.object
  };

  lastSawLocation = {};

  _handleDragEnd(event) {
    if (this.props.onLocationChange) {
      this.props.onLocationChange(this.lastSawLocation);
    }
  }

  _handleMove(event) {
    // Keep track of the position for use in dragend
    this.lastSawLocation.latitude = event.latlng.lat;
    this.lastSawLocation.longitude = event.latlng.lng;
  }

  _handleClick(event) {
    if (this.props.onMarkerClick) {
      this.props.onMarkerClick(event);
    }

    if (event.originalEvent.defaultPrevented) {
      return;
    }

    event.originalEvent.preventDefault();
  }

  render() {
    const { ...inheritedProps } = this.props;

    return (
      <Marker
        {...inheritedProps}
        onDragEnd={this._handleDragEnd.bind(this)}
        onMove={this._handleMove.bind(this)}
        onClick={this._handleClick.bind(this)}
      />
    );
  }
}

