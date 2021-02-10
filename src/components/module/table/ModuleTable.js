/**
 * @file ModuleTable.js
 */

import React, {Component, isValidElement, cloneElement, createRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import Table from 'alcedo-ui/Table';
import CircularLoading from 'alcedo-ui/CircularLoading';

// Statics
import TableRowSize from './TableRowSize';

// Vendors
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import Event from 'vendors/Event';
import {enumerateValue} from 'vendors/Util';
import FrozenColumns from 'vendors/persistence/FrozenColumns';
import ResizableColumnsWidth from 'vendors/persistence/ResizableColumnsWidth';

// Styles
import './ModuleTable.scss';

class ModuleTable extends Component {

    static SELECT_COLUMN_WIDTH = 48;
    static MIN_COLUMN_WIDTH = 88;
    static COLUMN_PADDING_WIDTH = 16; // 8px padding-left + 8px padding-right
    static COLUMN_SORTING_WIDTH = 20;
    static COLUMN_HEAD_MENU_WIDTH = 16;

    constructor(props) {

        super(props);

        this.table = createRef();
        this.tableEl = null;

        this.frozenColumns = FrozenColumns.getConfig(props.name) || [];

        this.state = {
            scrollHeight: props.isFullScreen ? this.getFullScreenScrollHeight() : null
        };

    }

    componentDidMount() {

        // resize 时更新 scrollHeight
        Event.addEvent(window, 'resize', this.debounceUpdateFullScreenScrollHeight);

    }

    componentWillUnmount() {
        Event.removeEvent(window, 'resize', this.debounceUpdateFullScreenScrollHeight);
    }

    /**
     * 使用 function children 的调用形式，
     * @param children
     * @returns {*}
     */
    renderFunctionChildren = (children = this.props.children) => {
        const {isFullScreen, activatedColumns, rowSize} = this.props;
        return children({
            isFullScreen,
            activatedColumns,
            rowSize,
            tableEl: this.tableEl
        });
    };

    /**
     * 获取 column 的具体宽度
     * @param column
     * @returns {number}
     */
    getColumnWidth = (column, columnsWidth, tableProps) => {

        if (!column) {
            return ModuleTable.MIN_COLUMN_WIDTH + ModuleTable.COLUMN_PADDING_WIDTH;
        }

        if (column.value && columnsWidth && columnsWidth?.hasOwnProperty(column.value)) {
            return columnsWidth[column.value];
        }

        const align = column.headAlign || column.align || Table.Align.LEFT;
        let result = (column.width || ModuleTable.MIN_COLUMN_WIDTH) + ModuleTable.COLUMN_PADDING_WIDTH;

        // 如果没有使用 Head Menu，到此为止
        if (!tableProps?.isUsingHeadMenu) {
            return result + (column.sortable && column.sortingProp ? ModuleTable.COLUMN_SORTING_WIDTH : 0);
        }

        // 增加排序的宽度
        if (column.sortable && column.sortingProp && tableProps?.sorting?.prop === column.sortingProp) {
            result += ModuleTable.COLUMN_SORTING_WIDTH;
        }

        // 使用 Head Menu 的表头，会预留 padding 来正常显示菜单按钮
        // 居中时增加两侧 padding，其他情况增加一侧 padding
        if (align === Table.Align.CENTER) {
            result += ModuleTable.COLUMN_HEAD_MENU_WIDTH * 2;
        } else {
            result += ModuleTable.COLUMN_HEAD_MENU_WIDTH;
        }

        return result;

    };

    /**
     * 过滤后获取 Table 的 columns
     * @param columns 传入 Table 组件中的所有列的 renderer 配置
     * @returns {*}
     */
    getColumns = (columns, tableProps) => {

        // 在 ModuleTableColumnsSelector 中勾选的列配置
        const {name, activatedColumns} = this.props,
            {footData} = tableProps,

            // 根据当前需要显示的 activatedColumns 配置，mapping 出最终真实显示的 columns
            tableColumns = columns?.filter(column => {

                if (!column) {
                    return false;
                }

                if (!activatedColumns || activatedColumns.length < 1 || column.value === 'Action') {
                    return true;
                }

                // 保留 activatedColumns 中的 column
                return activatedColumns.find(activatedColumn => column.value === activatedColumn?.value);

            }) || [],

            // columns 宽度
            columnsWidth = ResizableColumnsWidth.getConfig(name) || {},

            // dimension columns 的个数
            dimensionColumnCount = tableColumns?.filter?.(column => column?.dataType !== 'metric')?.length,

            result = tableColumns?.map((column, index) => ({

                ...column,

                width: this.getColumnWidth(column, columnsWidth, tableProps),
                bodyNoWrap: column.bodyNoWrap || true,
                footNoWrap: column.footNoWrap || true,

                // Total 列（ 即第一列 ）span 为 dimension 个数
                footSpan: index === 0 ? dimensionColumnCount : null,

                // Module Table 表尾 Total 行的渲染
                //  1、优先使用传入的 footRenderer
                //  2、metric 列使用当列的 bodyRenderer 作为 footRenderer
                //  3、第一列（ index === 0 ）需要显示 "Total" 文本
                //  4、第一行默认为 Filtered Total，第二行默认为 Total
                //  5、如果只有一行 foot 数据，则显示为 Total
                footRenderer: column.footRenderer || (
                    column.dataType === 'metric' ? (
                        (rowData, rowIndex, colIndex, tableData, footData, bodyRenderer) =>
                            bodyRenderer(rowData, rowIndex, colIndex)
                    ) : (
                        index === 0 ?
                            (rowData, rowIndex) => footData?.length === 1 ?
                                'Total'
                                :
                                rowIndex === 0 ?
                                    'Total: Filtered campaigns'
                                    :
                                    'Total'
                            :
                            null
                    )
                ),

                resizable: column.resizable || true

            })) || [];

        return result;

    };

    /**
     * 根据 row size 返回对应的 table head height
     * @returns {number}
     */
    getHeadHeight = () => {

        const {rowSize} = this.props;

        switch (rowSize) {
            case TableRowSize.COMFORTABLE:
                return 64;
            case TableRowSize.COMPACT:
                return 36;
            default:
                return 48;
        }

    };

    /**
     * 获取 Table 的 scroll height
     * @returns {*}
     */
    getFullScreenScrollHeight = () => {
        const {wrapperEl} = this.props;
        return wrapperEl ?
            // clientHeight - vertical padding - actions height - table head height
            wrapperEl.clientHeight - 24 - 40 - this.getHeadHeight()
            :
            null;
    };

    /**
     * 更新全屏时 Table 的 scroll height
     */
    updateFullScreenScrollHeight = () => {

        const {wrapperEl, isFullScreen} = this.props;

        if (!wrapperEl || !isFullScreen) {
            return;
        }

        this.setState({
            scrollHeight: this.getFullScreenScrollHeight()
        });

    };

    /**
     * updateFullScreenScrollHeight 的 resize 事件的 debounce
     * @type {debounced}
     */
    debounceUpdateFullScreenScrollHeight = debounce(this.updateFullScreenScrollHeight, 600);

    /**
     * 根据每个列的宽度，计算出整个 table 的宽度
     * @param columns
     * @returns {null|*}
     */
    getScrollWidth = (columns, selectMode) => {

        let result = 0;

        if (columns && columns.length < 1) {
            result += columns.reduce((sum, column) => sum + (column?.width || ModuleTable.MIN_COLUMN_WIDTH), 0);
        }

        if (selectMode === Table.SelectMode.MULTI_SELECT) {
            result += ModuleTable.SELECT_COLUMN_WIDTH;
        }

        return result > 0 ? result : null;

    };

    /**
     * 对表格冻结列持久化
     * @param frozenColumns
     */
    handleFrozenChange = frozenColumns => {

        const {name} = this.props;

        if (!name) {
            return;
        }

        FrozenColumns.setConfig(name, frozenColumns);

    };

    /**
     * 对表格列宽持久化
     * @param resizingColumn
     * @param width
     */
    handleColumnsWidthChange = debounce((resizingColumn, width) => {

        const {name} = this.props;

        if (!resizingColumn?.value || !name) {
            return;
        }

        const columnsWidth = ResizableColumnsWidth.getConfig(name) || {};
        columnsWidth[resizingColumn.value] = width;

        ResizableColumnsWidth.setConfig(name, columnsWidth);

    }, 150);

    /**
     * 使用 Table 组件作为 children 的调用形式
     * @param children
     * @returns {*}
     */
    renderComponentChildren = (children = this.props.children) => {

        if (!children || !isValidElement(children)) {
            return null;
        }

        const {rowSize, isFullScreen, hasFinishedLoading} = this.props,
            {scrollHeight} = this.state,
            {props: tableProps} = children,
            columns = this.getColumns(tableProps?.columns, tableProps);

        return cloneElement(children, {
            ref: this.table,
            className: classNames('module-table', {
                'full-screen': isFullScreen,
                'loading': !hasFinishedLoading,
                [`row-size-${rowSize}`]: rowSize,
                [tableProps?.className]: tableProps?.className
            }),
            style: tableProps?.style,
            pageSizePopupClassName: classNames('module-table-page-size-pop', {
                'full-screen': isFullScreen,
                [tableProps?.pageSizePopupClassName]: tableProps?.pageSizePopupClassName
            }),
            columns,
            isHeadFixed: tableProps?.isHeadFixed || isFullScreen || false,
            isFootFixed: tableProps?.isFootFixed || isFullScreen || false,
            scroll: {
                ...tableProps?.scroll,
                width: this.getScrollWidth(columns, tableProps?.selectMode) || tableProps?.scroll?.width || null,
                maxHeight: (isFullScreen ? scrollHeight : tableProps?.scroll?.maxHeight) || null
            },
            isLayoutFixed: true,
            isClickSorting: tableProps?.isClickSorting || false,
            frozenColumns: this.frozenColumns,
            noDataText: hasFinishedLoading ? 'No data found.' : null,
            onFrozenChange: this.handleFrozenChange,
            onColumnsWidthChange: this.handleColumnsWidthChange
        });

    };

    render() {

        const {children, hasFinishedLoading} = this.props;

        return (
            <div className="module-table-wrapper">

                {
                    children ?
                        typeof children === 'function' ?
                            this.renderComponentChildren(this.renderFunctionChildren())
                            :
                            this.renderComponentChildren()
                        :
                        null
                }

                <div className={classNames('module-table-loading-wrapper', {
                    'fade-out': hasFinishedLoading
                })}>
                    {
                        !hasFinishedLoading ?
                            <CircularLoading className="module-table-loading"
                                             size={CircularLoading.Size.LARGE}/>
                            :
                            null
                    }
                </div>

            </div>
        );

    }
}

ModuleTable.propTypes = {

    name: PropTypes.string,
    children: PropTypes.any,

    userProfile: PropTypes.shape({
        id: PropTypes.number
    }),

    wrapperEl: PropTypes.object,

    /**
     * columns
     */
    activatedColumns: PropTypes.array,

    /**
     * full screen
     */
    isFullScreen: PropTypes.bool,

    /**
     * init / loading
     */
    hasFinishedLoading: PropTypes.bool,

    /**
     * row size
     */
    rowSize: PropTypes.oneOf(enumerateValue(TableRowSize)),

    isUsingHeadMenu: PropTypes.bool

};

ModuleTable.defaultProps = {

    rowSize: TableRowSize.DEFAULT,

    hasFinishedLoading: false,
    isUsingHeadMenu: true

};

export default connect(state => ({
    isFullScreen: state.fullScreen.isFullScreen
}), null, null, {forwardRef: true})(ModuleTable);
