/**
 * @file ExtraListMenu.js
 */

import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

// Components
import ExtraMenu from './ExtraMenu';
import List from 'alcedo-ui/List';

// Vendors
import classNames from 'classnames';
import Event from '../vendors/Event';
import ComponentUtil from '../vendors/ComponentUtil';

// Styles
import './ExtraListMenu.scss';

class ExtraListMenu extends Component {

    static getDerivedStateFromProps(props, state) {
        return {
            prevProps: props,
            activated: ComponentUtil.getDerivedState(props, state, 'activated') || false
        };
    }

    constructor(props) {

        super(props);

        this.menu = createRef();

        this.state = {
            activated: props.activated || false
        };

    }

    /**
     * public
     */
    togglePop = () => {
        this.menu && this.menu.current && this.menu.current.togglePop && this.menu.current.togglePop();
    };

    /**
     * public
     */
    hidePop = () => {
        this.menu && this.menu.current && this.menu.current.hidePop && this.menu.current.hidePop();
    };

    /**
     * 显示 menu
     */
    handleRequestOpen = () => {
        this.setState({
            activated: true
        }, () => {
            const {onRequestOpen} = this.props;
            onRequestOpen && onRequestOpen();
        });
    };

    /**
     * 隐藏 menu
     */
    handleRequestClose = () => {
        this.setState({
            activated: false
        }, () => {
            const {onRequestClose} = this.props;
            onRequestClose && onRequestClose();
        });
    };

    /**
     * 处理列表点击事件
     * @param args
     */
    handleListItemClick = (item, index, e) => {

        Event.stopPropagation(e);

        const {onItemClick} = this.props;
        onItemClick && onItemClick(item, index, e);

        this.hidePop();

    };

    render() {

        const {

                className, popClassName, listClassName, hasTriangle, shouldFollowScroll, scrollEl,

                // not passing down these props
                activated: propsActivated, onRequestOpen, onRequestClose,

                ...restProps

            } = this.props,
            {activated} = this.state;

        return (
            <ExtraMenu ref={this.menu}
                       className={classNames('extra-list-menu-icon', {
                           [className]: className
                       })}
                       popClassName={classNames('extra-list-menu-pop', {
                           [popClassName]: popClassName
                       })}
                       activated={activated}
                       hasTriangle={hasTriangle}
                       shouldFollowScroll={shouldFollowScroll}
                       scrollEl={scrollEl}
                       onRequestOpen={this.handleRequestOpen}
                       onRequestClose={this.handleRequestClose}>
                <List {...restProps}
                      className={classNames('extra-list-menu-list', {
                          [listClassName]: listClassName
                      })}
                      onItemClick={this.handleListItemClick}/>
            </ExtraMenu>
        );

    }
}

ExtraListMenu.propTypes = {

    className: PropTypes.string,
    popClassName: PropTypes.string,
    listClassName: PropTypes.string,

    activated: PropTypes.bool,
    hasTriangle: PropTypes.bool,

    shouldFollowScroll: PropTypes.bool,
    scrollEl: PropTypes.object,

    onRequestOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    onItemClick: PropTypes.func

};

ExtraListMenu.defaultProps = {
    activated: false,
    hasTriangle: true
};

export default ExtraListMenu;
