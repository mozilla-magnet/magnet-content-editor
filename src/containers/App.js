import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoadingIndicator from '../components/LoadingIndicator';

const style = {
  loading: {
    position: 'absolute',
  }
}

class App extends Component {
  render() {
    const { children, isLoading } = this.props;
    console.log('is loading? ', isLoading);
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <LoadingIndicator
            visible={isLoading}
          />
          {children}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    children: ownProps.children,
    isLoading: state.loadingState !== 0,
  }
};

export default connect(mapStateToProps)(App);
