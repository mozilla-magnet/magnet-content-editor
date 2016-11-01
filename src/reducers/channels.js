import { actions } from '../actions/constants';

export function selectedChannel(state = false, action) {
  switch(action.type) {
    case actions.SELECT_CHANNEL:
      return action.channelName;
    default:
      return state;
  }
}
