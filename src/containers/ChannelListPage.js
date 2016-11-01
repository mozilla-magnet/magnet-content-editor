import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ChannelList from '../components/ChannelList';
import { fetchChannels } from '../actions';

class ChannelListPage extends Component {
  static propTypes = {
    channels: PropTypes.array,
    isLoading: PropTypes.bool,
  }

  componentWillMount() {
    this.props.fetchChannels();
  }

  render() {
    return (
      <ChannelList channels={this.props.channels} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    channels: Object.keys(state.channels).map(id => state.channels[id]),
  };
}

export default connect(mapStateToProps, {
  fetchChannels,
})(ChannelListPage);
