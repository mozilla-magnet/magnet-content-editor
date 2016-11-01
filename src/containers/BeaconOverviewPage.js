import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ChannelView from '../components/ChannelView';
import {
  fetchBeaconsForChannel, openBeaconEditor,
  closeBeaconEditor, editBeaconLocation,
} from '../actions';
import {
  push
} from 'react-router-redux';

class BeaconOverviewPage extends Component {
  componentDidMount() {
    this.props.fetchBeaconsForChannel(this.props.channelName);
  }

  _handleBeaconClick(beacon, event) {
    this.props.push(`/channel/${this.props.channelName}/${beacon.id}`);
    event.originalEvent.preventDefault();
  }

  render() {
    return (
      <ChannelView
        beacons={this.props.beacons}
        onBeaconClick={this._handleBeaconClick.bind(this)}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const channelName = ownProps.params.channelName;
  let beacons = [];

  if (state.channels[channelName]) {
    const channelInfo = state.channels[channelName];
    const beaconIds = channelInfo.beacons;

    beacons = beaconIds.map((id) => {
      return state.beacons[id];
    });
  }

  return {
    beacons,
    channelName,
  };
}

export default connect(mapStateToProps, {
  fetchBeaconsForChannel,
  push,
})(BeaconOverviewPage);
