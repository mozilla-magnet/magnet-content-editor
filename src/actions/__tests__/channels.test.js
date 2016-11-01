import * as channels from '../channels';
import { actions } from '../constants';

describe('channel actions', () => {
  const channelName = 'TestChannel'

  describe('selectChannel(channelName)', () => {
    it('should create a select channel action', () => {
      const expectedAction = {
        type: actions.SELECT_CHANNEL,
        channelName,
      };

      expect(channels.selectChannel(channelName))
        .toEqual(expectedAction);
    });
  });
});

