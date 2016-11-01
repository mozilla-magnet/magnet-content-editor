import ApiUtils from '../lib/ApiUtils';
import { actions } from './constants';

export function moveBeacon(beaconId, newLatLng) {
  return {
    type: actions.MOVE_BEACON,
    beaconId,
    newLatLng,
  };
}

export function resetBeacon(beaconId) {
  return {
    type: actions.RESET_BEACON,
    beaconId,
  };
}

export function updateUrl(beaconId, newValue) {
  return {
    type: actions.UPDATE_BEACON_URL,
    beaconId,
    newValue,
  };
}


export function receiveBeacons(channelName, beacons) {
  const _beacons = beacons.reduce((beacons, beacon) => {
    beacons[beacon.id] = {
      url: beacon.url,
      location: beacon.location
    };
    return beacons;
  }, {});

  return {
    type: actions.RECEIVE_BEACONS,
    channelName,
    beacons: _beacons,
    receivedAt: Date.now(),
  };
}

export function requestBeacons(channelName) {
  return dispatch => {
    return ApiUtils.getBeaconsForChannel(channelName)
      .then(rawBeaconData => {
        return dispatch(receiveBeacons(channelName, rawBeaconData));
      });
  };
}

