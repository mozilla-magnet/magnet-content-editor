import EventEmitter from 'eventemitter2';
import Constants from '../constants/AppConstants';
import Dispatcher from '../dispatcher/Dispatcher';

const CHANGE_EVENT = 'change';

class ChannelStore extends EventEmitter {
  dispatchToken = Dispatcher.register((action) => {
    switch (action.type) {

    case Constants.ActionTypes.NAVIGATE_TO_CHANNEL:
      this._currentChannel = action.channelId;


      this.emitChange();
      break;

    case Constants.ActionTypes.RECEIVE_CHANNELS:
      this.init(action.channels);
      this.emitChange();
      break;

    default:
      // nop
    }
  });

  constructor() {
    super([ CHANGE_EVENT ]);
    this._currentChannel = null;
    this._channels = new Map();
  }

  init(channels) {
    this._channels.clear();

    channels.forEach((channel) => {
      this._channels.set(channel.id, channel);
    });
  }

  getAll() {
    const result = [];

    this._channels.forEach((value, key) => {
      result.push(value);
    });

    return result.sort();
  }

  getCurrent() {
    return this._channels.get(this._currentChannel);
  }

  getCurrentChannel() {
    return this._currentChannel;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const _ChannelStore = new ChannelStore();
export default _ChannelStore;

