import ApiClient from './apiclient';
import MagnetServerActions from '../actions/MagnetServerActions';

let _client = null;

function createClient() {
  const endpoint = JSON.parse(localStorage.getItem('api'));

  if (endpoint === null) {
    throw new Error('API Client has not been initialized');
  }

  return new ApiClient(endpoint);
}

const ApiUtils = {
  getAllChannels: function() {
    this._init();

    _client.getChannels()
      .then((channels) => {
        MagnetServerActions.receiveChannels(channels);
      });
  },
  getBeaconsForChannel(channelId) {
    this._init();
    _client.getBeaconsForChannel(channelId)
      .then((beacons) => {
        MagnetServerActions.receiveBeacons(channelId, beacons);
      });
  },
  _init: function() {
    if (_client === null) {
      _client =  createClient();
    }
  }
};

export default ApiUtils;
