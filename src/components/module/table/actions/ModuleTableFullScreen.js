/**
 * @file ModuleTableFullScreen.js
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import Action from './ModuleTableAction';

class ModuleTableFullScreen extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 切换全屏
     */
    toggle = () => {
        const {toggleFullScreen} = this.props;
        toggleFullScreen && toggleFullScreen(undefined, null, isFullScreen => {
            const {onChange} = this.props;
            onChange && onChange(isFullScreen);
        });
    };

    render() {

        const {isFullScreen} = this.props;

        return (
            <Action iconCls={`dsicon dsicon-fullscreen${isFullScreen ? '-exit' : ''}`}
                    tip={isFullScreen ? 'Exit fullscreen' : 'Fullscreen'}
                    onClick={this.toggle}/>
        );

    }
}

ModuleTableFullScreen.propTypes = {

    isFullScreen: PropTypes.bool,

    toggleFullScreen: PropTypes.func,
    onChange: PropTypes.func

};

export default connect(state => ({
    isFullScreen: state.fullScreen.isFullScreen
}), dispatch => bindActionCreators({
    toggleFullScreen: actions.toggleFullScreen
}, dispatch))(ModuleTableFullScreen);
