import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/AppConstants';
import { join as pathJoin } from 'path';

import { hashHistory } from 'react-router';
import ApiUtils from '../lib/ApiUtils';

const ChannelActions = Object.freeze({
  clickChannel: function(channelId) {
    Dispatcher.dispatch({
      type: Constants.ActionTypes.CLICK_CHANNEL,
      channelId,
    });

    ApiUtils.getBeaconsForChannel(channelId);
    // Navigate to the channel
    hashHistory.push(pathJoin('/channel', channelId));
  }
});

export default ChannelActions;
