import ApiUtils from '../lib/ApiUtils';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export function receiveChannels(rawChannelData) {
  return {
    type: RECEIVE_CHANNELS,
    rawChannelData,
    receivedAt: Date.now(),
  };
}

export const ERROR_RECEIVE_CHANNELS = 'ERROR_RECEIVE_CHANNELS';
export function errorReceiveChannels(error) {
  return {
    type: ERROR_RECEIVE_CHANNELS,
    error: error
  };
}

export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export function requestChannels() {
  return {
    type: REQUEST_CHANNELS
  };
}

export const FETCH_CHANNELS = 'FETCH_CHANNELS';
export function fetchChannels() {
 return dispatch => {
   dispatch(requestChannels());

   return ApiUtils.getAllChannels()
    .then(rawChannelData => {
      return dispatch(receiveChannels(rawChannelData));
    })
    .catch((e) => {
      return dispatch(errorReceiveChannels(e));
    });
 };
}

export const RECEIVE_BEACONS = 'RECEIVE_BEACONS';
export function receiveBeacons(forChannel, rawBeaconData) {
  return {
    type: RECEIVE_BEACONS,
    rawBeaconData,
    channelId: forChannel
  };
}

export const REQUEST_BEACONS = 'REQUEST_BEACONS';
export function requestBeacons() {
  return {
    type: REQUEST_BEACONS,
  }
}

export const FETCH_BEACONS_FOR_CHANNEL = 'FETCH_BEACONS_FOR_CHANNEL';
export function fetchBeaconsForChannel(channelId) {
  return dispatch => {
    dispatch(requestBeacons());

    return ApiUtils.getBeaconsForChannel(channelId)
      .then(rawBeaconData => {
        dispatch(receiveBeacons(channelId, rawBeaconData));
      })
  };
}
