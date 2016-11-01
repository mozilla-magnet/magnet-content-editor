import React from 'react';

export default class SnackBarNotification extends React.Component {

  render() {
    return (
        <Snackbar
          open={this.state.open}
          message="Event added to your calendar"
        />
    );
  }
}
