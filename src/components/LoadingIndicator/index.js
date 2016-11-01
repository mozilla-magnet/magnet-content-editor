import React, { Component, PropTypes } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './index.css';

export default class LoadingIndicator extends Component {
  static propTypes = {
    visible: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.timeout = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false) {
      clearTimeout(this.timeout);
      this.setState(nextProps);
      return;
    }

    if (this.props.visible === false && nextProps.visible === true) {
      // Debounce the visible state (100ms)
      this.timeout = setTimeout(() => {
        this.setState({ visible: true });
      }, 100);
    }

    console.log('nothing happening');
  }

  render() {
    return (
      <div className="refreshcontainer">
        <RefreshIndicator
          top={0}
          left={0}
          status={this.state.visible ? "loading" : "hide"}
        />
      </div>
    );
  }
}
