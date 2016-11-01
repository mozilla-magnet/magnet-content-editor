import ApiUtils from '../lib/ApiUtils';
import { change, untouch, touch, reset } from 'redux-form';

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

export const EDIT_BEACON_LOCATION = 'EDIT_BEACON_LOCATION';
export function editBeaconLocation(beaconId, newLocation) {
  return dispatch => {
    dispatch(change('beaconeditform', 'location', newLocation));
    // Force update of form
    dispatch(touch('beaconeditform', 'location'));
    dispatch(untouch('beaconeditform', 'location'));
  }
}

export const SAVE_BEACON = 'SAVE_BEACON';
export function saveBeacon(channelId, beacon) {
  return dispatch => {
    dispatch(isSavingBeacon());
    return ApiUtils.updateBeacon(channelId, beacon)
      .then(() => {
        dispatch(beaconSaved());
      });
  };
}

export const IS_SAVING_BEACON = 'IS_SAVING_BEACON';
export function isSavingBeacon() {
  return {
    type: IS_SAVING_BEACON,
  };
}

export const BEACON_SAVED = 'BEACON_SAVED';
export function beaconSaved() {
  return dispatch => {
    dispatch({
      type: BEACON_SAVED
    });

    setTimeout(() => {
      dispatch(hideBeaconSavedMessage());
    }, 4000);
  };
}

export const HIDE_BEACON_SAVED_MESSAGE = 'HIDE_BEACON_SAVED_MESSAGE';
export function hideBeaconSavedMessage() {
  return {
    type: HIDE_BEACON_SAVED_MESSAGE
  };
}

export const OPEN_BEACON_EDITOR = 'OPEN_BEACON_EDITOR';
export function openBeaconEditor() {
  return {
    type: OPEN_BEACON_EDITOR,
  };
}

export const CLOSE_BEACON_EDITOR = 'CLOSE_BEACON_EDITOR';
export function closeBeaconEditor() {
  return {
    type: CLOSE_BEACON_EDITOR,
  };
}

export const RESET_BEACON_EDITOR = 'RESET_BEACON_EDITOR';
export function resetBeaconEditor() {
  return reset('beaconeditform');
};

