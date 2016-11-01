import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import ChannelListItem from './ChannelListItem';

export default class ChannelList extends Component {
  render() {
    return (
      <List>
        {this.props.channels.map((channel) => (
          <ChannelListItem key={channel.id} channel={channel} />
        ))}
      </List>
    );
  }
}
