import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';

const renderTextField = ({input, label, meta: { touched, error }, ...custom }) => {
  return (
    <TextField
      hintText={label}
      floatingLabelText={label}
      {...input}
      {...custom}
    />
  );
};

class BeaconForm extends Component {

  renderSaveButton(beaconIsDirty, handleSubmit) {
    return (
      <RaisedButton
        type="submit"
        label="Save"
        fullWidth={true}
        disabled={!beaconIsDirty}
        onClick={handleSubmit}
      />
    );
  }

  renderResetButton(handleReset) {
    return (
      <RaisedButton
        label="Reset"
        fullWidth={true}
        secondary={true}
        onClick={handleReset}
      />
    );
  }

  formatLocation(value, name) {
    return `${value.latitude}, ${value.longitude}`;
  }

  render() {
    const { handleReset, handleSubmit, pristine, reset, submitting } = this.props;

    return (
        <form style={{margin: 10}} onSubmit={handleSubmit}>
          <Field
            name="id"
            component={renderTextField}
            label="Beacon ID"
            disabled={true}
          />
          <Field
            name="url"
            component={renderTextField}
            label="URL"
          />
          <Field
            name="location"
            component={renderTextField}
            label="Location"
            format={this.formatLocation}
            disabled={true}
          />
          <div>
            {this.renderSaveButton(!(pristine || submitting))}
          </div>
          <div>
            {!pristine ?
              (this.renderResetButton(reset)) : (<div />)}
          </div>
        </form>
    );
  }
}

export default reduxForm({
  form: 'beaconeditform',
})(BeaconForm);
