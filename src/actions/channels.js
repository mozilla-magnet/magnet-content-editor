import { actions } from './constants';

export function selectChannel(channelName) {
  return {
    type: actions.SELECT_CHANNEL,
    channelName,
  };
}
