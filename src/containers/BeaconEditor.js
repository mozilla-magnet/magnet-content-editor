import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

import BeaconPropertyDrawer from '../components/BeaconPropertyDrawer';
import BeaconForm from '../components/ChannelView/BeaconForm';

import { connect } from 'react-redux';
import {
  fetchBeaconsForChannel, openBeaconEditor,
  closeBeaconEditor, editBeaconLocation,
  saveBeacon,
} from '../actions';
import MapView from '../components/MapView';
import Snackbar from 'material-ui/Snackbar';

class BeaconEditor extends Component {
  componentDidMount() {
    this.props.fetchBeaconsForChannel(this.props.channelName);
  }

  _closeBeaconEditor() {
    this.props.closeBeaconEditor();
  }

  _onMarkerClick() {
    this.props.openBeaconEditor();
  }

  _handleSave() {
    this.props.saveBeacon(this.props.channelName, this.props.editingBeacon);
  }

  _onMarkerMoved(point, newLocation) {
    console.log('marker moved', point, newLocation);
    this.props.editBeaconLocation(point.id, newLocation);
  }

  render() {
    return (
      <div className="MapContainer">
        <MapView
          points={this.props.pointsOnMap}
          draggablePoints={true}
          onMarkerClick={this._onMarkerClick.bind(this)}
          onMarkerMoved={this._onMarkerMoved.bind(this)}
        />
        <BeaconPropertyDrawer
          isOpen={this.props.beaconEditOpen}
          handleClose={this._closeBeaconEditor.bind(this)}>
          <BeaconForm
            onSubmit={this._handleSave.bind(this)}
            initialValues={this.props.beacon}
          />
        </BeaconPropertyDrawer>
		<Snackbar
		  open={this.props.displayingBeaconSaved}
		  message="Beacon saved successfully"
		/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps)  {
  const channelName = ownProps.params.channelName;
  const beaconId = ownProps.params.beaconId;
  const beacon = state.beacons[beaconId];
  const pointsOnMap = [];
  let editingBeacon = {};

  if (state.form && state.form.beaconeditform && state.form.beaconeditform.values) {
    pointsOnMap.push(state.form.beaconeditform.values);
    editingBeacon = state.form.beaconeditform.values;
  }

  return {
    channelName,
    beaconId,
    beacon,
    editingBeacon,
    pointsOnMap,
    displayingBeaconSaved: state.displayingBeaconSaved,
    beaconEditOpen: state.beaconEditState,
  };
}

export default connect(mapStateToProps, {
  fetchBeaconsForChannel,
  closeBeaconEditor,
  openBeaconEditor,
  editBeaconLocation,
  saveBeacon,
})(BeaconEditor);
