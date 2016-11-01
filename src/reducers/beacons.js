import { actions } from '../actions/constants';

export function beacon(state = {
  location: {},
  url: '',
  isInvalidated: false
}, action) {
  switch(action.type) {
    case actions.RECEIVE_BEACONS:
      return Object.assign({}, state, {
        isInvalidated: false,
      });
    case actions.UPDATE_BEACON_URL:
      return Object.assign({}, state, {
        isInvalidated: true,
        url: action.newValue
      });
    case actions.MOVE_BEACON:
      return Object.assign({}, state, {
        isInvalidated: true,
        location: action.newLatLng
      });
    default:
      return state;
  }
}

export function beacons(state = {}, action) {
  switch(action.type) {
    case actions.UPDATE_BEACON_URL:
    case actions.MOVE_BEACON:
      return Object.assign({}, state, {
        [action.beaconId]:
          beacon(state[action.beaconId], action),
      });
    case actions.RECEIVE_BEACONS:
      const refreshedState = Object.keys(state)
        .reduce((newState, beaconId) => {
          newState[beaconId] = beacon(state[beaconId], action);
          return newState;
        }, {});


      return Object.assign({}, state, refreshedState);
    default:
      return state;
  }
}

export default function beaconList(state = {
  isRequesting: false,
  beacons: {},
}, action) {
  switch (action.type) {
    case actions.UPDATE_BEACON_URL:
    case actions.MOVE_BEACON:
      return Object.assign({}, state, {
        beacons: beacons(state.beacons, action),
      });
    case actions.REQUEST_BEACONS:
      return Object.assign({}, state, {
        isRequesting: true,
      });
    case actions.RECEIVE_BEACONS:
      return Object.assign({}, state, {
        isRequesting: false,
        beacons: beacons(action.beacons, action),
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  };
}
