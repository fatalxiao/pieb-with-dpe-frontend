/**
 * @file ModuleTableFullScreen.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import Action from './ModuleTableAction';

const ModuleTableFullScreen = ({
    isFullScreen,
    dispatch, onChange
}) => {

    /**
     * 切换是否全屏
     * @type {function(): *}
     */
    const toggle = useCallback(() => {
        dispatch({
            type: 'fullScreen/toggleFullScreen',
            callback: isFullScreen => onChange?.(isFullScreen)
        });
    }, [
        dispatch, onChange
    ]);

    return (
        <Action iconCls={`far fa-${isFullScreen ? 'compress' : 'expand'}`}
                tip={isFullScreen ? 'Exit fullscreen' : 'Fullscreen'}
                onClick={toggle}/>
    );

};

ModuleTableFullScreen.propTypes = {

    isFullScreen: PropTypes.bool,

    dispatch: PropTypes.func,
    onChange: PropTypes.func

};

export default connect(state => ({
    isFullScreen: state.fullScreen.isFullScreen
}))(ModuleTableFullScreen);
