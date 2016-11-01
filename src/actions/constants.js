import keyMirror from 'keymirror';

export const actions = keyMirror({
  // Channels
  SELECT_CHANNEL: null,

  // Beacons
  MOVE_BEACON: null,
  RESET_BEACON: null,
  UPDATE_BEACON_URL: null,
  RECEIVE_BEACONS: null,
  REQUEST_BEACONS: null,
});
