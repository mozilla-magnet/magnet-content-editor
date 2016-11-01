import React, { Component, PropTypes } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import EventedMarker from './EventedMarker';

const style = {
  marker: {
    width: 50,
    height: 55
  }
};

export default class MapView extends Component {
  static propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      })
    })).isRequired
  }

  _handleMarkerClick(point, event) {
    if (this.props.onMarkerClick) {
      this.props.onMarkerClick(point, event);
    }
  }

  _handleMarkerLocationChange(point, newLocation) {
    if (this.props.onMarkerMoved) {
      this.props.onMarkerMoved(point, newLocation);
    }
  }

  render() {
    // Record a list of all positions so Leaflet
    // can create a bounding box for the map view
    const bounds = [];

    const markers = this.props.points.map((point) => {
      const position = [
        point.location.latitude,
        point.location.longitude,
      ];

      bounds.push(position);

      return (
        <EventedMarker
          key={point.id}
          position={position}
          draggable={this.props.draggablePoints || false}
          onLocationChange={this._handleMarkerLocationChange.bind(this, point)}
          onMarkerClick={this._handleMarkerClick.bind(this, point)}
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
