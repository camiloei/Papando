import React, { Component } from 'react';
import PropTypes from 'prop-types';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class TitleScreen extends Component {
  static propTypes = {
    onStartPressed: PropTypes.func.isRequired,
  };

  render() {
    const { onStartPressed } = this.props;

    return (
      <div className="title-screen">
        <div className="title-screen__name">X99</div>
        <div className="title-screen__tap" onClick={onStartPressed}>
          CLICK TO START
        </div>
      </div>
    );
  }
}

export default TitleScreen;
