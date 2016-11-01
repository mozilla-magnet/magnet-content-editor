import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class BeaconPropertyDrawer extends Component {
  render() {
    return (
      <Drawer
        width={300}
        openSecondary={true}
        disableSwipeToOpen={true}
        open={this.props.isOpen}
      >
        <AppBar
          title={<span>Editing Beacon</span>}
          iconElementLeft={
            <IconButton
              onClick={this.props.handleClose}>
              <NavigationClose />
            </IconButton>}
        />
        {this.props.children}
      </Drawer>
    );
  }
}
