import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import RouterActions from '../../actions/RouterActions';

class ChannelListItem extends Component {

  _handleClick() {
    RouterActions.navigateToChannel(this.props.channel.id);
  }

  render() {
    return (
      <ListItem
        primaryText={this.props.channel.name}
        onClick={this._handleClick.bind(this)}
      />
    );
  }
}

ChannelListItem.propTypes = {
  channel: React.PropTypes.object,
};

export default ChannelListItem;
