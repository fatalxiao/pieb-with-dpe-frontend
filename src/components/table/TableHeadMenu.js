/**
 * @file TableHeadMenu.js
 */

import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

// Components
import ExtraListMenu from 'components/ExtraListMenu';

// Vendors
import classNames from 'classnames';
import ComponentUtil from 'vendors/ComponentUtil';

// Styles
import './TableHeadMenu.scss';

class TableHeadMenu extends Component {

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
        this.menu?.current?.togglePop?.();
    };

    /**
     * public
     */
    hidePop = () => {
        this.menu?.current?.hidePop?.();
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
        }, () => this.props.onRequestOpen?.());
    };

    /**
     * 处理排序变更
     * @param type
     */
    handleSortChange = (type = -1) => {

        const {column, onSortChange} = this.props;

        if (!column || !column.sortable || column.isSortingAscDisabled || !column.sortingProp) {
            return;
        }

        onSortChange && onSortChange({
            prop: column.sortingProp,
            type: type
        });

    };

    /**
     * 处理点击正序
     */
    handleSortAsc = () => {
        this.handleSortChange(1);
    };

    /**
     * 处理点击倒序
     */
    handleSortDesc = () => {
        this.handleSortChange(-1);
    };

    /**
     * 处理冻结列
     * @returns {any}
     */
    handleFreezeColumn = () => {
        const {column} = this.props;
        column && this.props.onFrozenChange?.(column);
    };

    /**
     * 获取表头菜单列表数据
     * @param column
     * @returns {null|[]}
     */
    getHeadMenuData = (column = this.props.column) => {

        if (!column) {
            return null;
        }

        const {
                isFrozen,
                isHeadMenuSortingAscDisabled, isHeadMenuSortingDescDisabled,
                isHeadMenuFreezeColumnDisabled
            } = this.props,
            {
                sortable,
                isSortingAscDisabled, isSortingDescDisabled, isFreezeColumnDisabled
            } = column,
            result = [];

        if (sortable && !isHeadMenuSortingAscDisabled && !isSortingAscDisabled) {
            result.push({
                text: 'Sort by Ascending',
                iconCls: 'dsicon dsicon-sort-ascending',
                onClick: this.handleSortAsc
            });
        }

        if (sortable && !isHeadMenuSortingDescDisabled && !isSortingDescDisabled) {
            result.push({
                text: 'Sort by Descending',
                iconCls: 'dsicon dsicon-sort-descending',
                onClick: this.handleSortDesc
            });
        }

        if (!isHeadMenuFreezeColumnDisabled && !isFreezeColumnDisabled) {
            result.push({
                text: `${isFrozen ? 'Unfreeze' : 'Freeze'} column`,
                iconCls: `dsicon ${isFrozen ? 'dsicon-pin' : 'dsicon-pin-fixed-sd'}`,
                onClick: this.handleFreezeColumn
            });
        }

        return result;

    };

    render() {

        const {className, style, shouldFollowScroll, scrollEl} = this.props,
            {activated} = this.state;

        return (
            <ExtraListMenu ref={this.menu}
                           className={classNames('table-head-menu', {
                               [className]: className
                           })}
                           popClassName="table-head-menu-pop"
                           style={style}
                           data={this.getHeadMenuData()}
                           activated={activated}
                           hasTriangle={false}
                           shouldFollowScroll={shouldFollowScroll}
                           scrollEl={scrollEl}
                           onRequestOpen={this.handleRequestOpen}
                           onRequestClose={this.handleRequestClose}/>
        );

    }
}

TableHeadMenu.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    column: PropTypes.shape({

        key: PropTypes.any,
        headClassName: PropTypes.string,
        headRenderer: PropTypes.any,
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
    activated: PropTypes.bool,
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

    onRequestOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    onSortChange: PropTypes.func,
    onFrozenChange: PropTypes.func

};

TableHeadMenu.defaultProps = {

    index: -1,
    activated: false,
    isFrozen: false,

    isHeadMenuSortingAscDisabled: false,
    isHeadMenuSortingDescDisabled: false,
    isHeadMenuFreezeColumnDisabled: false

};

export default TableHeadMenu;
