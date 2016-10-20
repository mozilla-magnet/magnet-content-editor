import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/AppConstants';
import { join as pathJoin } from 'path';

import { hashHistory } from 'react-router';
import ApiUtils from '../lib/ApiUtils';

const RouterActions = Object.freeze({
  navigateToChannel: function(channelId) {
    Dispatcher.dispatch({
      type: Constants.ActionTypes.NAVIGATE_TO_CHANNEL,
      channelId,
    });

    ApiUtils.getBeaconsForChannel(channelId);

    // Navigate to the channel
    hashHistory.push(pathJoin('/channel', channelId));
  },

  navigateToChannelList: function() {
    Dispatcher.dispatch({
      type: Constants.ActionTypes.NAVIGATE_TO_CHANNEL_LIST,
    });

    ApiUtils.getAllChannels();
    hashHistory.push('/channel');
  }
});

export default RouterActions;

