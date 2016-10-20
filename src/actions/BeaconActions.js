import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/AppConstants';

const BeaconActions = Object.freeze({
  moveBeacon: function(beaconId, beaconMarker) {
    const newLatLong = beaconMarker.getLatLng();
    Dispatcher.dispatch({
      type: Constants.ActionTypes.MOVE_BEACON,
      beaconId,
      newLatLong: {
        latitude: newLatLong.lat,
        longitude: newLatLong.lng,
      },
    });

    beaconMarker.openPopup();
  },
  resetBeacon: function(beaconId) {
    Dispatcher.dispatch({
      type: Constants.ActionTypes.RESET_BEACON,
      beaconId,
    });
  }
});

export default BeaconActions;
