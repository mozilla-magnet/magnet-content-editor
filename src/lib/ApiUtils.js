import ApiClient from './apiclient';
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

   return _client.getChannels()
      .then((channels) => {
        return channels;
      });
  },
  getBeaconsForChannel(channelId) {
    this._init();
    return _client.getBeaconsForChannel(channelId)
      .then((beacons) => {
        return beacons;
      });
  },
  _init: function() {
    if (_client === null) {
      _client =  createClient();
    }
  }
};

export default ApiUtils;
