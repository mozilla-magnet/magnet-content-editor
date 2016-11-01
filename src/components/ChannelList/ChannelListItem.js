import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import { Link } from  'react-router';

class ChannelListItem extends Component {

  render() {
    return (
      <Link to={`/channel/${this.props.channel.name}`}>
        <ListItem
          primaryText={this.props.channel.name}
        />
      </Link>
    );
  }
}

ChannelListItem.propTypes = {
  channel: React.PropTypes.object,
};

export default ChannelListItem;
