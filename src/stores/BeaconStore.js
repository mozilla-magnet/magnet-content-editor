import EventEmitter from 'eventemitter2';
import Constants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';
import ChannelStore from './ChannelStore';

const CHANGE_EVENT = 'change';

class BeaconStore extends EventEmitter {
  dispatchToken = Dispatcher.register((action) => {
    switch (action.type) {
    case Constants.ActionTypes.RECEIVE_BEACONS:
      this.receiveBeacons(action.forChannelId, action.beacons);
      this.emitChange();
      break;
    case Constants.ActionTypes.MOVE_BEACON:
      const { beaconId, newLatLong, } = action;
      if (this.moveBeacon(beaconId, newLatLong)) {
        this.emitChange();
      }
      break;
    case Constants.ActionTypes.RESET_BEACON:
      this.resetBeacon(action.beaconId);
      this.emitChange();
      break;
    default:
      // nop
    }
  });

  constructor() {
    super([ CHANGE_EVENT ]);

    // We depend on the ChannelStore for state in here, so listen for changes there and
    // propagate to listeners
    ChannelStore.addChangeListener(this.emitChange.bind(this));

    this._beacons = new Map();

    // Beacons that have been edited in the UI, but not saved yet
    this._dirtyBeacons = new Map();

    this._channelToBeaconMap = new Map();
  }

  receiveBeacons(forChannelId, beacons) {
    this._beacons.clear();

    const allBeaconIds = beacons.map((beacon) => {
      this._beacons.set(beacon.id, beacon);
      return beacon.id;
    });

    this._channelToBeaconMap.set(forChannelId, allBeaconIds);
  }

  resetBeacon(beaconId) {
    this._dirtyBeacons.delete(beaconId);
  }

  // Move the beacon, keeping a copy in the dirty list, don't update the
  // beacons list
  moveBeacon(beaconId, newLatLng) {
    // get current from cached _beacons
    const currentBeaconInfo = this._beacons.get(beaconId);

    // No change
    if (!this._hasLocationChanged(currentBeaconInfo.location, newLatLng)) {
      return false;
    }

    // TODO:SG: Could probably be better logic D:
    const hasDirtyBeaconInfo = this._dirtyBeacons.get(beaconId);
    if (!hasDirtyBeaconInfo) {

      const newDirtyObject = Object.assign({}, currentBeaconInfo)
      newDirtyObject.location = newLatLng;
      this._dirtyBeacons.set(beaconId, newDirtyObject);
      return true;
    }

    // get dirty beacon info, or create if not exists
    const dirtyBeaconInfo = this._dirtyBeacons.get(beaconId);
    if (!this._hasLocationChanged(dirtyBeaconInfo.location, newLatLng)) {
      return false;
    }

    dirtyBeaconInfo.location = newLatLng;

    return true;
  }

  _hasLocationChanged(oldLocation, newLocation) {
    return oldLocation.latitude !== newLocation.latitude ||
      oldLocation.longitude !== newLocation.longitude;
  }

  // Get all the beacons for the current channel
  getAllForCurrentChannel() {
    // If no current channel, return no beacons
    const currentChannelId = ChannelStore.getCurrentChannel();

    if (!currentChannelId) {
      return [];
    }

    return this._mapChannelToBeacons(currentChannelId)
      .map((beacon) => {
        // if in the dirty list, return the dirty copy with a dirty flag
        const dirtyObject = this._dirtyBeacons.get(beacon.id);

        if (dirtyObject) {
          console.log("Dirty object..");
          return Object.assign({dirty: true}, dirtyObject);
        } else {
          return Object.assign({dirty: false}, beacon);
        }
      });
  }

  // Get beacons from the beacon Map, based on the mapping to beacon ids in the
  // _channelToBeaconMap
  _mapChannelToBeacons(channelId) {
    const beaconIds = this._channelToBeaconMap.get(channelId) || [];

    return beaconIds
      .map((id) => {
        return this._beacons.get(id);
      })
      .filter(beacon => !!beacon);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
}

const _BeaconStore = new BeaconStore();
export default _BeaconStore;
