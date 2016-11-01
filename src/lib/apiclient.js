import fetch from 'isomorphic-fetch';


export default class ApiClient {
  constructor({ host, auth, }) {

    this._host = host;
    this._authHeader = 'Basic ' + btoa(`apikey:${auth}`);
  }

  updateBeacon(channel, beacon) {
    const url = `${this._host}/v1/channel/${channel}/beacons/${beacon.id}`;
    return this._apiPatch(url, {
      location: beacon.location,
      url: beacon.url
    });
  }

  getChannels() {
    const url = `${this._host}/v1/channel`;
    return this._apiGet(url);
  }

  getBeaconsForChannel(channelName) {
    const url = `${this._host}/v1/channel/${channelName}/beacons`;
    return this._apiGet(url);
  }

  _apiPatch(url, patch) {
    return fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(patch),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this._authHeader,
      }
    });
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
