import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import BeaconActions from '../../actions/BeaconActions';

export default class BeaconForm extends Component {
  static propTypes = {
    beacon: PropTypes.object
  };

  renderIdField(id) {
    return (
      <TextField
        disabled={true}
        hintText="Beacon ID"
        defaultValue={id}
        floatingLabelText="Beacon ID"
      />
    );
  }

  renderUrlField(url) {
    return (
      <TextField
        disabled={false}
        hintText="URL"
        defaultValue={url}
        floatingLabelText="URL"
      />
    );
  }

  renderLocation(location) {
    const locationString = `${location.latitude}, ${location.longitude}`;
    return (
      <TextField
        disabled={true}
        hintText="Location"
        defaultValue={locationString}
        floatingLabelText="Location"
      />
    );
  }

  renderSaveButton(beaconIsDirty) {
    return (
      <div>
        <RaisedButton label="Save" fullWidth={true}  disabled={!beaconIsDirty} />
      </div>
    );
  }

  renderResetButton() {
    return (
      <RaisedButton
        label="Reset"
        fullWidth={true}
        secondary={true}
        onClick={this._handleResetClick.bind(this)}
      />
    );
  }

  _handleResetClick() {
    const beaconId = this.props.beacon.id;
    console.log('reset click');
    BeaconActions.resetBeacon(beaconId);
  }

  render() {
    const { id, url, location, dirty, } = this.props.beacon;

    return (
      <MuiThemeProvider>
        <List>
          <ListItem disabled={true} children={this.renderIdField(id)} />
          <ListItem disabled={true} children={this.renderUrlField(url)} />
          <ListItem disabled={true} children={this.renderLocation(location)} />
          <ListItem disabled={true} children={this.renderSaveButton(dirty)} />

          {dirty ?
            (<ListItem disabled={true} children={this.renderResetButton()} />)
          :
            (<div />)
          }
        </List>
      </MuiThemeProvider>
    );
  }
}
