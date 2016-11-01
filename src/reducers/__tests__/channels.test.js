import { selectedChannel, } from '../channels';
import { actions } from '../../actions/constants';
import * as channelActions from '../../actions/channels';
import * as mockData from './mockdata';

describe('channel reducers', () => {
  describe('selected channel', () => {
    it('should update update the state to the new channel', () => {

      const newChannel = 'TestChannel';

      const action = channelActions.selectChannel(newChannel);

      expect(selectedChannel(false, action))
        .toEqual(newChannel);
    });
  });
});

