import fetch from 'isomorphic-fetch';


export default class ApiClient {
  constructor({ host, auth, }) {

    this._host = host;
    this._authHeader = 'Basic ' + btoa(`apikey:${auth}`);
  }

  getChannels() {
    const url = `${this._host}/v1/channel`;
    return this._apiGet(url);
  }

  getBeaconsForChannel(channelName) {
    const url = `${this._host}/v1/channel/${channelName}/beacons`;
    return this._apiGet(url);
  }

  _apiGet(url) {
    return fetch(url, {
      headers: {
        'Authorization': this._authHeader,
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed API request: ${url}`);
      }

      return response.json();
    });
  }
}
