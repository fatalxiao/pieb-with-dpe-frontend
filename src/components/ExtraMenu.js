/**
 * @file ExtraMenu.js
 */

import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

// Components
import PopupProvider from 'alcedo-ui/PopupProvider';
import IconButton from 'alcedo-ui/IconButton';

// Vendors
import classNames from 'classnames';
import {enumerateValue} from 'vendors/Util';
import Event from 'vendors/Event';
import ComponentUtil from '../vendors/ComponentUtil';

// Styles
import './ExtraMenu.scss';

class ExtraMenu extends Component {

    static Position = PopupProvider.Position;
    static Theme = PopupProvider.Theme;

    static getDerivedStateFromProps(props, state) {
        return {
            prevProps: props,
            activated: ComponentUtil.getDerivedState(props, state, 'activated') || false
        };
    }

    constructor(props) {

        super(props);

        this.provider = createRef();

        this.state = {
            activated: props.activated || false
        };

    }

    /**
     * public
     */
    togglePop = () => {
        this.provider?.current?.toggle?.();
    };

    /**
     * public
     */
    hidePop = () => {
        this.provider?.current?.hide?.();
    };

    /**
     * 显示 menu
     */
    handleRequestOpen = () => {
        this.setState({
            activated: true
        }, () => this.props.onRequestOpen?.());
    };

    /**
     * 隐藏 menu
     */
    handleRequestClose = () => {
        this.setState({
            activated: false
        }, () => this.props.onRequestClose?.());
    };

    render() {

        const {children, className, popClassName, position, hasTriangle, shouldFollowScroll, scrollEl} = this.props,
            {activated} = this.state;

        return (
            <PopupProvider ref={this.provider}
                           className={classNames('extra-menu-pop', {
                               [popClassName]: popClassName
                           })}
                           position={position}
                           popupContent={children}
                           hasTriangle={hasTriangle}
                           shouldFollowScroll={shouldFollowScroll}
                           scrollEl={scrollEl}
                           onRequestOpen={this.handleRequestOpen}
                           onRequestClose={this.handleRequestClose}>
                <IconButton className={classNames('extra-menu-icon', {
                    activated,
                    [className]: className
                })}
                            iconCls="dsicon dsicon-more-vertical-dot"
                            onClick={Event.stopPropagation}
                            onMouseDown={Event.stopPropagation}/>
            </PopupProvider>
        );

    }
}

ExtraMenu.propTypes = {

    children: PropTypes.any,

    className: PropTypes.string,
    popClassName: PropTypes.string,

    position: PropTypes.oneOf(enumerateValue(PopupProvider.Position)),

    activated: PropTypes.bool,
    hasTriangle: PropTypes.bool,

    shouldFollowScroll: PropTypes.bool,
    scrollEl: PropTypes.object,

    onRequestOpen: PropTypes.func,
    onRequestClose: PropTypes.func

};

ExtraMenu.defaultProps = {
    position: PopupProvider.Position.BOTTOM_RIGHT,
    activated: false,
    hasTriangle: true
};

export default ExtraMenu;
