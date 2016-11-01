import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ChannelView from '../components/ChannelView';
import { fetchBeaconsForChannel } from '../actions';

class BeaconOverviewPage extends Component {
  componentDidMount() {
    this.props.fetchBeaconsForChannel(this.props.channelName);
  }

  render() {
    return (
      <ChannelView beacons={this.props.beacons} />
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
  fetchBeaconsForChannel
})(BeaconOverviewPage);
