import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ActionTypes from '../actions';

function channels(state = {}, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_BEACONS:
      const { rawBeaconData, channelId } = action;
      const ids = rawBeaconData.map(beacon => beacon.id);
      const newState = Object.assign({}, state);

      if (!newState[channelId]) {
        newState[channelId] = {
          name: channelId,
          beacons: ids
        };
      } else {
        newState[channelId].beacons = ids;
      }
      return newState;

    case ActionTypes.RECEIVE_CHANNELS:
      const channelData = action.rawChannelData;
      return channelData.reduce((map, channel) => {
        const _channel = Object.assign({ beacons: [] }, channel);
        map[channel.name] = _channel;
        return map;
      }, {});

    default:
      return state;
  }
};

function beacons(state = {}, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_BEACONS:
      const beaconData = action.rawBeaconData;
      return beaconData.reduce((map, beacon) => {
        map[beacon.id] = beacon;
        return map;
      }, {});
    default:
      return state;
  };
}

function loadingState(state = 0, action) {
  if (action.type.startsWith('RECEIVE_')) {
    return state - 1;
  }

  if (action.type.startsWith('REQUEST_')) {
    return state + 1;
  }

  return state;
}

const rootReducer = combineReducers({
  channels,
  beacons,
  loadingState,
  routing: routerReducer,
});

export default rootReducer;
