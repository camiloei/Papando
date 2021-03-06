import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

import ApplyBaseComponent from '../../lib/baseComponent';

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

import TitleScreenContainer from '../TitleScreen/TitleScreen.container';
import SelectionScreenContainer from '../SelectionScreen/SelectionScreen.container';

class MainFrameContainer extends Component {
  static propTypes = {
    MainFrameState: PropTypes.object,
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.views = {};
    this.views.TitleScreen = TitleScreenContainer;
    this.views.SelectionScreen = SelectionScreenContainer;
  }

  render() {
    const { MainFrameState } = this.props;
    const currenViewId = get(MainFrameState, 'currentView', 'default');
    const loading = get(MainFrameState, 'loading', false);
    const CurrentView = this.views[currenViewId];

    const toRender = loading ? <LoadingScreen /> : <CurrentView />;

    return <div className="main-frame">{toRender}</div>;
  }
}

const MainFrameConnect = connect(mapStateToProps)(MainFrameContainer);
const MainFrameStore = ApplyBaseComponent(MainFrameConnect);

function mapStateToProps(state) {
  return {
    MainFrameState: state.MainFrameState,
  };
}

export default MainFrameStore;
