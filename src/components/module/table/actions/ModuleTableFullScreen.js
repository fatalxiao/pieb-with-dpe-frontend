/**
 * @file ModuleTableFullScreen.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Actions
import * as rootActions from 'modules/Root/reduxes/actions';

// Components
import Action from './ModuleTableAction';

const ModuleTableFullScreen = ({
    isFullScreen,
    toggleFullScreen, onChange
}) => {

    const

        /**
         * 切换是否全屏
         * @type {function(): *}
         */
        toggle = useCallback(() =>
            toggleFullScreen?.(undefined, null, isFullScreen => onChange?.(isFullScreen)), [
            toggleFullScreen, onChange
        ]);

    return (
        <Action iconCls={`far fa-${isFullScreen ? 'compress' : 'expand'}`}
                tip={isFullScreen ? 'Exit fullscreen' : 'Fullscreen'}
                onClick={toggle}/>
    );

};

ModuleTableFullScreen.propTypes = {

    isFullScreen: PropTypes.bool,

    toggleFullScreen: PropTypes.func,
    onChange: PropTypes.func

};

export default connect(state => ({
    isFullScreen: state.fullScreen.isFullScreen
}), dispatch => bindActionCreators({
    toggleFullScreen: rootActions.toggleFullScreen
}, dispatch))(ModuleTableFullScreen);
