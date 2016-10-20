import keyMirror from 'keymirror';

const Constants = Object.freeze({
  ActionTypes: keyMirror({
    CLICK_CHANNEL: null,
    RECEIVE_CHANNELS: null,
    RECEIVE_BEACONS: null,
    NAVIGATE_TO_CHANNEL: null,
    MOVE_BEACON: null,
    RESET_BEACON: null,
  })
});

export default Constants;
