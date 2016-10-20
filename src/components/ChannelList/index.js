import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import ChannelListItem from './ChannelListItem';
import ChannelStore from '../../stores/ChannelStore';


export default class ChannelList extends Component {

  constructor(props) {
    super(props);
    this.state = this.getStateFromStore();
  }

  getStateFromStore() {
    return {
      channels: ChannelStore.getAll(),
    }
  }

  componentDidMount() {
    ChannelStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ChannelStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(this.getStateFromStore());
  }

  render() {
    return (
      <List>
        {this.state.channels.map((channel) => (
          <ChannelListItem key={channel.id} channel={channel} />
        ))}
      </List>
    );
  }
}
