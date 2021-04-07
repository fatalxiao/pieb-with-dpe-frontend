/**
 * @file TableHead.js
 */

import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

// Components
import Dotdotdot from 'react-dotdotdot';
import Table from 'alcedo-ui/Table';
import TableHeadMenu from 'components/table/TableHeadMenu';
import ThSortingIcon from 'alcedo-ui/_ThSortingIcon';

// Vendors
import classNames from 'classnames';
import ComponentUtil from '../../vendors/ComponentUtil';
import {enumerateValue} from '../../vendors/Util';
import {setActivated, removeActivated} from './TableHeadMenuManagement';

// Styles
import './TableHead.scss';

class TableHead extends Component {

    static getDerivedStateFromProps(props, state) {
        return {
            prevProps: props,
            menuActivated: ComponentUtil.getDerivedState(props, state, 'menuActivated') || false
        };
    }

    constructor(props) {

        super(props);

        this.menu = createRef();

        this.state = {
            contentKey: 1,
            menuActivated: props.menuActivated || false
        };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.column.width !== this.props.column.width) {
            this.forceUpdateContent();
        }
    }

    /**
     * public
     */
    togglePop = () => {
        this.menu?.current?.togglePop?.();
    };

    /**
     * public
     */
    hidePop = () => {
        this.menu?.current?.hidePop?.();
    };

    /**
     * 当宽度变更时，重绘 content
     */
    forceUpdateContent = () => {
        this.setState({
            contentKey: this.state.contentKey + 1
        });
    };

    /**
     * 显示 menu
     */
    handleRequestOpen = () => {

        setActivated(this.hidePop);

        this.setState({
            menuActivated: true
        }, () => this.props.onHeadMenuAvtivated?.(this.props.index));

    };

    /**
     * 隐藏 menu
     */
    handleRequestClose = () => {

        removeActivated(this.hidePop);

        this.setState({
            menuActivated: false
        }, () => this.props.onHeadMenuDeavtivated?.(this.props.index));

    };

    /**
     * 判断是否需要渲染 menu
     * @returns {boolean}
     */
    shouldMenuRender = () => {

        const {
            column,
            isHeadMenuSortingAscDisabled, isHeadMenuSortingDescDisabled,
            isHeadMenuFreezeColumnDisabled
        } = this.props;

        if (!column) {
            return false;
        }

        const {
            sortable, isSortingAscDisabled, isSortingDescDisabled,
            isFreezeColumnDisabled
        } = column;

        return (sortable && !isHeadMenuSortingAscDisabled && !isSortingAscDisabled)
            || (sortable && !isHeadMenuSortingDescDisabled && !isSortingDescDisabled)
            || (!isHeadMenuFreezeColumnDisabled && !isFreezeColumnDisabled);

    };

    render() {

        const {
            column, index, isSortingActivated, sorting, isFrozen, shouldFollowScroll, scrollEl,
            isHeadMenuSortingAscDisabled, isHeadMenuSortingDescDisabled, isHeadMenuFreezeColumnDisabled,
            onSortChange, onFrozenChange
        } = this.props;

        if (!column) {
            return null;
        }

        const {contentKey, menuActivated} = this.state,
            {headRenderer, hasFilter} = column,
            menuVisible = this.shouldMenuRender();

        return (
            <div className={classNames('table-head', {
                'menu-hidden': !menuVisible
            })}>

                <Dotdotdot key={contentKey}
                           className="table-head-content"
                           clamp={3}
                           tagName="span">
                    {
                        headRenderer && typeof headRenderer === 'function' ?
                            headRenderer()
                            :
                            headRenderer
                    }
                </Dotdotdot>

                {
                    isSortingActivated ?
                        <ThSortingIcon className="table-head-icon"
                                       sorting={sorting}
                                       sortingProp={column?.sortingProp}
                                       sortingAscIconCls="dsicon dsicon-arrow-up-sd"
                                       sortingDescIconCls="dsicon dsicon-arrow-down-sd"/>
                        :
                        null
                }

                {
                    isFrozen ?
                        <i className="table-head-icon dsicon dsicon-pin-fixed-sd"/>
                        :
                        null
                }

                {
                    hasFilter ?
                        <i className="table-head-icon dsicon dsicon-filter"/>
                        :
                        null
                }

                {
                    menuVisible ?
                        <TableHeadMenu ref={this.menu}
                                       column={column}
                                       index={index}
                                       activated={menuActivated}
                                       isFrozen={isFrozen}
                                       isHeadMenuSortingAscDisabled={isHeadMenuSortingAscDisabled}
                                       isHeadMenuSortingDescDisabled={isHeadMenuSortingDescDisabled}
                                       isHeadMenuFreezeColumnDisabled={isHeadMenuFreezeColumnDisabled}
                                       shouldFollowScroll={shouldFollowScroll}
                                       scrollEl={scrollEl}
                                       onRequestOpen={this.handleRequestOpen}
                                       onRequestClose={this.handleRequestClose}
                                       onSortChange={onSortChange}
                                       onFrozenChange={onFrozenChange}/>
                        :
                        null
                }

            </div>
        );

    }
}

TableHead.propTypes = {

    column: PropTypes.shape({

        key: PropTypes.any,

        width: PropTypes.number,

        headClassName: PropTypes.string,
        headRenderer: PropTypes.any,
        headTitle: PropTypes.string,

        sortable: PropTypes.bool,
        sortingProp: PropTypes.string,

        /**
         * 是否有 filter
         */
        hasFilter: PropTypes.bool,

        /**
         * isUsingHeadMenu = true 时，是否隐藏 "Sort by Ascending" 下拉菜单
         */
        isSortingAscDisabled: PropTypes.bool,

        /**
         * isUsingHeadMenu = true 时，是否隐藏 "Sort by Descending" 下拉菜单
         */
        isSortingDescDisabled: PropTypes.bool,

        /**
         * isUsingHeadMenu = true 时，是否隐藏 "Freeze" / "Unfreeze" 下拉菜单
         */
        isFreezeColumnDisabled: PropTypes.bool

    }),
    index: PropTypes.number,
    menuActivated: PropTypes.bool,

    /**
     * sorting
     */
    sortable: PropTypes.bool,
    isSortingActivated: PropTypes.bool,
    sorting: PropTypes.shape({
        prop: PropTypes.string,
        type: PropTypes.oneOf(enumerateValue(Table.SortingType))
    }),

    /**
     * fronzen
     */
    isFrozen: PropTypes.bool,

    /**
     * isUsingHeadMenu = true 时，是否隐藏所有列的 "Sort by Ascending" 下拉菜单
     */
    isHeadMenuSortingAscDisabled: PropTypes.bool,

    /**
     * isUsingHeadMenu = true 时，是否隐藏所有列的 "Sort by Descending" 下拉菜单
     */
    isHeadMenuSortingDescDisabled: PropTypes.bool,

    /**
     * isUsingHeadMenu = true 时，是否隐藏所有列的 "Freeze" / "Unfreeze" 下拉菜单
     */
    isHeadMenuFreezeColumnDisabled: PropTypes.bool,

    shouldFollowScroll: PropTypes.bool,
    scrollEl: PropTypes.object,

    onSortChange: PropTypes.func,
    onFrozenChange: PropTypes.func,
    onHeadMenuAvtivated: PropTypes.func,
    onHeadMenuDeavtivated: PropTypes.func

};

TableHead.defaultProps = {

    index: -1,
    menuActivated: false,
    isFrozen: false,

    isHeadMenuSortingAscDisabled: false,
    isHeadMenuSortingDescDisabled: false,
    isHeadMenuFreezeColumnDisabled: false

};

export default TableHead;
