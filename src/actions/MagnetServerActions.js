import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/AppConstants';

const MagnetServerActions = Object.freeze({
  receiveChannels: function(channelData) {
    Dispatcher.dispatch({
      type: Constants.ActionTypes.RECEIVE_CHANNELS,
      channels: channelData,
    });
  },
  receiveBeacons: function(forChannelId, beacons) {
    Dispatcher.dispatch({
      type: Constants.ActionTypes.RECEIVE_BEACONS,
      forChannelId,
      beacons,
    });
  }
});

export default MagnetServerActions;
