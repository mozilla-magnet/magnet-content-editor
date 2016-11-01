import * as beacons from '../beacons';
import { actions } from '../constants';

describe('beacon actions', () => {
  const beaconId = '212Dop'

  describe('moveBeacon(beaconId, newLatLng)', () => {
    it('should create move beacon action', () => {
      const newLatLng = {
        latitude: 10,
        longitude: 11,
      };

      const expectedAction = {
        type: actions.MOVE_BEACON,
        beaconId,
        newLatLng,
      };

      expect(beacons.moveBeacon(beaconId, newLatLng))
        .toEqual(expectedAction);
    });
  });

  describe('resetBeacon(beaconId)', () => {
    it('should create a reset action', () => {

      const expectedAction = {
        type: actions.RESET_BEACON,
        beaconId,
      };

      expect(beacons.resetBeacon(beaconId))
        .toEqual(expectedAction);
    });
  });

  describe('updateUrl(beaconId, newUrl)', () => {
    it('should create an update URL action', () => {
      const url = 'http://example.com';
      const expectedAction = {
        type: actions.UPDATE_BEACON_URL,
        beaconId,
        newValue: url,
      };

      expect(beacons.updateUrl(beaconId, url))
        .toEqual(expectedAction);
    });
  });
});
