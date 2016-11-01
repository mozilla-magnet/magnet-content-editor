import reducer, { beacon, beacons, } from '../beacons';
import { actions } from '../../actions/constants';
import * as beaconActions from '../../actions/beacons';
import * as mockData from './mockdata';

import MockDate from 'mockdate';

describe('beacon reducers', () => {
  const beaconId = '123abc';
  const newUrl = 'https://pm0.io/123456';
  const newLatLng = { latitude: 1, longitude: 2 };

  const beaconInitialState = {
    location: { latitude: 10, longitude: 11 },
    url: 'https://mozilla.org',
    isInvalidated: false,
  };

  const beaconsInitialState = {
    [beaconId]: beaconInitialState,
  };

  const beaconStoreInitialState = {
    isRequesting: false,
    beacons: beaconsInitialState
  };


  describe('reducer()', () => {
    it('should handle UPDATE_BEACON_URL and MOVE_BEACON', () => {
      const expectedState = {
        isRequesting: false,
        beacons: {
          [beaconId]: {
            location: newLatLng,
            url: newUrl,
            isInvalidated: true,
          }
        }
      };

      const actionMove = beaconActions.moveBeacon(beaconId, newLatLng);
      const actionUpdateUrl = beaconActions.updateUrl(beaconId, newUrl);

      const newState =
        reducer(
          reducer(beaconStoreInitialState, actionMove),
          actionUpdateUrl
        );

      expect(newState).toEqual(expectedState);
    });

    it('should handle RECEIVE_BEACONS', () => {
      const newBeacons = JSON.parse(mockData.beaconResponseStringA);

      const expectedState = {
        isRequesting: false,
        beacons: mockData.beaconResponseAExpectedState,
        lastUpdated: 1515151515151,
      };


      MockDate.set(1515151515151)
      const action = beaconActions
        .receiveBeacons('UncoveringLondonTest', newBeacons);
      MockDate.reset();

      const newState =
        reducer(
          beaconStoreInitialState, action
        );

      expect(newState).toEqual(expectedState);
    });
  });

  describe('beacon()', () => {

    it('should handle UPDATE_BEACON_URL', () => {

      const expectedState = {
        location: { latitude: 10, longitude: 11 },
        url: newUrl,
        isInvalidated: true,
      };

      const action = beaconActions.updateUrl(beaconId, newUrl);

      expect(beacon(beaconInitialState, action))
        .toEqual(expectedState);
    });

    it('should handle MOVE_BEACON', () => {

      const expectedState = {
        location: newLatLng,
        url: 'https://mozilla.org',
        isInvalidated: true,
      };

      const action = beaconActions.moveBeacon(beaconId, newLatLng);

      expect(beacon(beaconInitialState, action))
        .toEqual(expectedState);
    });
  });

  describe('beacons()', () => {
    it('should handle MOVE_BEACON', () => {

      const expectedState = {
        [beaconId]: {
          location: newLatLng,
          url: 'https://mozilla.org',
          isInvalidated: true,
        }
      };

      const action = beaconActions.moveBeacon(beaconId, newLatLng);

      expect(beacons(beaconsInitialState, action))
        .toEqual(expectedState);
    });

    it('should handle UPDATE_BEACON_URL', () => {

      const newUrl = 'https://pm0.io/123456';

      const expectedState = {
        [beaconId]: {
          location: { latitude: 10, longitude: 11 },
          url: newUrl,
          isInvalidated: true,
        }
      };

      const action = beaconActions.updateUrl(beaconId, newUrl);

      expect(beacons(beaconsInitialState, action))
        .toEqual(expectedState);
    });
  });
});
