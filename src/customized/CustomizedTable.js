/**
 * @file CustomizedTable.js
 */

import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

// Components
import Table from 'alcedo-ui/Table';
import TableHead from 'components/table/TableHead';

// Statics
import FreezeType from 'statics/TableFreezeType';

// Vendors
import classNames from 'classnames';
import TableUtil from 'vendors/TableUtil';
import ComponentUtil from 'vendors/ComponentUtil';
import {enumerateValue} from 'vendors/Util';

class CustomizedTable extends Component {

    static Theme = Table.Theme;
    static Align = Table.Align;
    static Fixed = Table.Fixed;
    static SelectMode = Table.SelectMode;
    static SelectAllMode = Table.SelectAllMode;
    static SortingType = Table.SortingType;
    static FreezeType = FreezeType;

    static getDerivedStateFromProps(props, state) {

        // 使用了定制的 TableUtil.getDerivedColumns
        // 使得更新 props.columns 时保留之前可能变更过的 column width
        const columns = TableUtil.getDerivedColumns(props, state) || [];

        return {
            prevProps: props,
            columns,

            // 如果某个 frozenColumn 已经不在 columns 中的话，需要过滤
            frozenColumns: (ComponentUtil.getDerivedState(props, state, 'frozenColumns') || [])
                .filter(frozenColumn => columns.findIndex(column => column?.key === frozenColumn) !== -1)

        };

    }

    constructor(props) {

        super(props);

        this.table = createRef();
        this.headRefs = [];

        this.state = {
            columns: props.columns || [],
            frozenColumns: props.frozenColumns || [],
            avtivatedHeadMenuColumnIndex: -1
        };

    }

    /**
     * 滚动开始
     */
    handleScrollStart = e => {
        this.props.onScrollStart?.(e);
        this.headRefs?.forEach(ref => ref?.current?.hidePop?.());
    };

    /**
     * public
     */
    collapseAllRows = () => {
        this.table?.current?.collapseAllRows?.();
    };

    /**
     * 处理冻结 column index 的更新
     * @param column
     */
    handleFrozenChange = column => {

        this.handleHeadMenuDeavtivated();

        const {freezeType} = this.props,
            {columns} = this.state;

        if (!column || !columns) {
            return;
        }

        let frozenColumns = this.state.frozenColumns ? [...this.state.frozenColumns] : [];

        // 类似于 Excel 中冻结效果的模式，选中某列冻结后，当前列及左侧的所有列都会向左冻结
        if (freezeType === FreezeType.FREEZE_LEFT) {
            if (column.key === frozenColumns[0]) {
                frozenColumns = [];
            } else {
                // 冻结的列为当前列及左侧的所有列，但仅记录最右侧列
                frozenColumns = [column.key];
            }
        }
        // 默认为自由冻结模式（FREE_FREEZE），可以选中某列向左或向右固定
        else {

            const index = frozenColumns.findIndex(item => item === column.key);

            // 冻结列
            if (index < 0) {
                frozenColumns.push(column.key);
            }
            // 移除冻结
            else {
                frozenColumns.splice(index, 1);
            }

        }

        this.setState({
            frozenColumns
        }, () => this.props.onFrozenChange?.(frozenColumns));

    };

    /**
     * 记录 Head Menu 被激活的 column 的 index
     * @param avtivatedHeadMenuColumnIndex
     */
    handleHeadMenuAvtivated = avtivatedHeadMenuColumnIndex => {
        // 延时 150 ms，防止被 handleHeadMenuDeavtivated 覆盖 avtivatedHeadMenuColumnIndex
        setTimeout(() => this.setState({
            avtivatedHeadMenuColumnIndex
        }), 150);
    };

    /**
     * 清除 Head Menu 被激活的 column 的 index
     */
    handleHeadMenuDeavtivated = () => {
        this.setState({
            avtivatedHeadMenuColumnIndex: -1
        });
    };

    /**
     * 判断当前 column 是否冻结
     * @param column
     * @returns {boolean|boolean}
     */
    isColumnFrozen = column => {

        const {freezeType} = this.props,
            {columns, frozenColumns} = this.state;

        if (!column || !frozenColumns || frozenColumns.length < 1) {
            return false;
        }

        // FREE FREEZE
        if (freezeType === FreezeType.FREE_FREEZE) {
            return frozenColumns.findIndex(frozenColumn => frozenColumn === column.key) !== -1;
        }

        // FREEZE LEFT
        const columnIndex = columns.findIndex(col => col?.key === column.key),
            frozenColumnIndex = columns.findIndex(col => col?.key === frozenColumns[0]);

        return columnIndex !== -1 && columnIndex <= frozenColumnIndex;

    };

    /**
     * 判断 TableHead 中的 Frozen 的 icon 是否显示
     *  1. freezeType === FreezeType.FREE_FREEZE 时，显示所有 isFrozen = true 列的 icon
     *  2. freezeType === FreezeType.FREEZE_LEFT 时，只显示排在最右边的 isFrozen = true 列的 icon
     * @param column
     * @param isFrozen
     */
    isFrozenIconVisible = (column, isFrozen) => {

        const {freezeType} = this.props,
            {frozenColumns} = this.state;

        if (freezeType === FreezeType.FREE_FREEZE) {
            return isFrozen;
        }

        if (!frozenColumns || frozenColumns.length < 1) {
            return false;
        }

        const index = frozenColumns.findIndex(frozenColumn => frozenColumn === column.key);

        if (index === -1) {
            return false;
        }

        return index === frozenColumns.length - 1;

    };

    /**
     * 格式化 column，使用表头菜单
     * @param columns
     * @returns {any}
     */
    formatColumnsUsingHeadMenu = (columns = this.state.columns) => {

        const {
                sorting,
                isHeadMenuSortingAscDisabled, isHeadMenuSortingDescDisabled,
                isHeadMenuFreezeColumnDisabled,
                onSortChange
            } = this.props,
            {avtivatedHeadMenuColumnIndex} = this.state;

        return columns ?
            columns.map((column, index) => {

                if (!column) {
                    return column;
                }

                this.headRefs[index] = createRef();

                const // isSortingActivated = column.sortable && sorting && sorting.prop
                    // && sorting.prop === column.sortingProp,
                    isFrozen = this.isColumnFrozen(column);

                return {
                    ...column,
                    headClassName: classNames({
                        // 'head-menu-has-no-icon': !isSortingActivated && !column.hasFilter && !isFrozen,
                        'head-menu-activated': index === avtivatedHeadMenuColumnIndex,
                        'frozen': isFrozen,
                        [column.headClassName]: column.headClassName
                    }),
                    headRenderer: (data, colIndex, scrollEl) =>
                        <TableHead ref={this.headRefs[index]}
                                   column={column}
                                   index={index}
                                   sortable={column.sortable}
                                   isSortingActivated={column.sortable && sorting?.prop === column.sortingProp}
                                   sorting={sorting}
                                   isFrozen={this.isFrozenIconVisible(column, isFrozen)}
                                   isHeadMenuSortingAscDisabled={isHeadMenuSortingAscDisabled}
                                   isHeadMenuSortingDescDisabled={isHeadMenuSortingDescDisabled}
                                   isHeadMenuFreezeColumnDisabled={isHeadMenuFreezeColumnDisabled}
                                   shouldFollowScroll={true}
                                   scrollEl={scrollEl}
                                   onSortChange={onSortChange}
                                   onFrozenChange={this.handleFrozenChange}
                                   onHeadMenuAvtivated={this.handleHeadMenuAvtivated}
                                   onHeadMenuDeavtivated={this.handleHeadMenuDeavtivated}/>,
                    bodyClassName: classNames({
                        'frozen': isFrozen,
                        [column.bodyClassName]: column.bodyClassName
                    }),
                    footClassName: classNames({
                        'frozen': isFrozen,
                        [column.footClassName]: column.footClassName
                    }),
                    fixed: isFrozen ? Table.Fixed.LEFT : null
                };

            })
            :
            columns;

    };

    /**
     * 获取 columns
     * @param columns
     * @returns {Array|*}
     */
    getColumns = (columns = this.state.columns) => {
        return this.props.isUsingHeadMenu ? this.formatColumnsUsingHeadMenu() : columns;
    };

    /**
     * 处理列宽改变，将宽度更新到 columns 配置中
     * @param resizingColumn
     * @param width
     */
    handleColumnsWidthChange = (resizingColumn, width) => {

        if (!resizingColumn) {
            return;
        }

        const {columns} = this.state,
            index = columns.findIndex(column => column?.key === resizingColumn?.key);

        if (index < 0) {
            return;
        }

        const result = [...columns];
        result[index] = {
            ...result[index],
            width
        };

        this.setState({
            columns: result
        }, () => this.props.onColumnsWidthChange?.(resizingColumn, width));

    };

    render() {

        const {

                className, data, isPaginated, noDataText, pageSize, pageSizes, isUsingHeadMenu, isClickSorting,
                paginationPageVisible, paginationPageSizeVisible, isHorizontalScroll,

                // not passing down these props
                /* eslint-disable no-unused-vars */
                freezeType, frozenColumns,
                isHeadMenuSortingAscDisabled, isHeadMenuSortingDescDisabled,
                isHeadMenuFreezeColumnDisabled,
                onFrozenChange, onActivatedColumnsChange,
                /* eslint-enable no-unused-vars */

                ...restProps

            } = this.props,
            {frozenIndex} = this.state,
            visible = isPaginated == null ? (data && data.length > pageSize) : isPaginated,
            isHorizontalScrollFinal = frozenIndex > -1 ? false : isHorizontalScroll;

        return (
            <Table {...restProps}
                   ref={this.table}
                   className={classNames('customized-table', {
                       'horizontal-scroll': isHorizontalScrollFinal,
                       'use-head-menu': isUsingHeadMenu,
                       [className]: className
                   })}
                   columns={this.getColumns()}
                   data={data && data.length > 0 ? data : []}
                   pageSize={pageSize}
                   pageSizes={pageSizes}
                   isPaginated={isPaginated}
                   paginationPageVisible={paginationPageVisible !== null ? paginationPageVisible : visible}
                   paginationPageSizeVisible={paginationPageSizeVisible !== null ? paginationPageSizeVisible : visible}
                   noDataText={noDataText}
                   isClickSorting={isUsingHeadMenu ? false : isClickSorting}
                   onScrollStart={this.handleScrollStart}
                   onColumnsWidthChange={this.handleColumnsWidthChange}/>
        );

    }
}

CustomizedTable.propTypes = {

    className: PropTypes.string,

    columns: PropTypes.arrayOf(PropTypes.shape({

        key: PropTypes.any,
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

    })),
    data: PropTypes.array,
    isPaginated: PropTypes.bool,
    noDataText: PropTypes.string,
    isClickSorting: PropTypes.bool,

    /**
     * sorting
     */
    sorting: PropTypes.shape({
        prop: PropTypes.string,
        type: PropTypes.oneOf(enumerateValue(Table.SortingType))
    }),

    paginationParentEl: PropTypes.object,
    pageSize: PropTypes.number,
    pageSizes: PropTypes.array,
    paginationPageVisible: PropTypes.bool,
    paginationPageSizeVisible: PropTypes.bool,

    isHorizontalScroll: PropTypes.bool,

    /**
     * 是否使用 head menu 的形式显示 column 的 actions
     */
    isUsingHeadMenu: PropTypes.bool,

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

    /**
     * isUsingHeadMenu = true 时，freeze 的交互类型
     */
    freezeType: PropTypes.oneOf(enumerateValue(FreezeType)),

    /**
     * isUsingHeadMenu = true 时，所有冻结列
     */
    frozenColumns: PropTypes.array,

    onScrollStart: PropTypes.func,
    onScrollEnd: PropTypes.func,
    onSortChange: PropTypes.func,
    onFrozenChange: PropTypes.func,
    onColumnsWidthChange: PropTypes.func,
    onActivatedColumnsChange: PropTypes.func

};

CustomizedTable.defaultProps = {

    sortingAscIconCls: 'fas fa-caret-up',
    sortingDescIconCls: 'fas fa-caret-down',
    expandIconCls: 'fal fa-chevron-down',

    selectColumn: {
        width: 48
    },
    selectUncheckedIconCls: 'dsicon dsicon-checkbox-off',
    selectCheckedIconCls: 'dsicon dsicon-checkbox-on',
    selectIndeterminateIconCls: 'dsicon dsicon-checkbox-half',

    // pagination
    pageSize: 10,
    pageSizes: [{
        value: 10,
        text: '10 / page'
    }, {
        value: 20,
        text: '20 / page'
    }, {
        value: 50,
        text: '50 / page'
    }],
    defaultSortingType: Table.SortingType.DESC,
    paginationTotalRenderer: (total, page, totalPage, pageSize) =>
        total <= (page + 1) * pageSize ?
            `Total ${total} items, current ${total > 0 ? page * pageSize + 1 : 0} - ${total}`
            :
            `Total ${total} items, current ${total > 0 ? page * pageSize + 1 : 0} - ${(page + 1) * pageSize}`,
    useFullPagination: true,
    paginationPageSizeRightIconCls: 'fal fa-chevron-down',
    paginationPrevIconCls: 'fal fa-chevron-left',
    paginationNextIconCls: 'fal fa-chevron-right',

    noDataText: 'No data found.',

    isLayoutFixed: true,
    isHorizontalScroll: true,

    isUsingHeadMenu: true,
    isHeadMenuSortingAscDisabled: false,
    isHeadMenuSortingDescDisabled: false,
    isHeadMenuFreezeColumnDisabled: false,
    freezeType: FreezeType.FREE_FREEZE,
    frozenColumns: [],

    disableScrollingRender: false,

    defaultColumnWidth: 120,
    minColumnWidth: 72

};

export default CustomizedTable;
