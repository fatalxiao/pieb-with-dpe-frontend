/**
 * @file ModuleTableCard.js
 */

import React, {Component, Fragment, createRef} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Components
import Card from 'components/module/ModuleCard';
import Actions from 'components/module/table/actions/ModuleTableActions';
import Table from 'components/module/table/ModuleTable';
import FilterDialog from 'components/FilterDialog/FilterDialog';

// Statics
import TableRowSize from 'statics/TableRowSize';
import FilterDialogType from 'statics/FilterDialogType';
import MetricsUnit from 'statics/MetricsUnit';

// Vendors
import classNames from 'classnames';
import {enumerateValue} from 'vendors/Util';
import ModuleFilterUtil from 'vendors/ModuleFilterUtil';
import Subscription from 'vendors/Subscription';
import TableUtil from 'vendors/TableUtil';
import ComponentUtil from 'vendors/ComponentUtil';
import ActivatedColumns from 'vendors/persistence/ActivatedColumns';

// Styles
import './ModuleTableCard.scss';

class ModuleTableCard extends Component {

    static getDerivedStateFromProps(props, state) {
        return {
            prevProps: props,
            activatedColumns: TableUtil.getDefaultActivatedColumns(
                ComponentUtil.getDerivedState(props, state, 'activatedColumns'),
                props.allColumns, props.userProfile?.id, props.name, props.defaultMetricColumnField)
        };
    }

    constructor(props) {

        super(props);

        this.card = createRef();
        this.table = createRef();
        this.tableEl = null;

        this.state = {
            cardEl: null,
            activatedColumns: [],
            rowSize: props.rowSize,
            activatedFilter: null,
            activatedFilterValue: null
        };

    }

    componentDidMount() {

        this.updateCardEl();

        // 初始化时将当前的 Activated Columns config 上报给调用组件
        this.props.onActivatedColumnsChange?.(this.state.activatedColumns);

    }

    /**
     * 重置 Table 的高度
     */
    resetHeight = () => {
        this.table?.current?.resetHeight?.();
    };

    /**
     * 重置 Table 的高度（异步）
     */
    resetHeightAsync = () => {
        this.table?.current?.resetHeightAsync?.();
    };

    /**
     * 更新 card 的 element 到 state，传递到 ModuleTable 中计算滚动高度
     */
    updateCardEl = () => {
        const cardEl = this.card?.current && findDOMNode(this.card?.current);
        if (cardEl) {
            this.setState({
                cardEl
            });
        }
    };

    /**
     * 处理勾选的 columns 改变事件
     * @param activatedColumns
     */
    handleActivatedColumnsChange = activatedColumns => {

        this.hidePopInTable();

        this.setState({
            activatedColumns
        }, () => {
            const {userProfile, name} = this.props;
            ActivatedColumns.setConfig(userProfile?.id, name, activatedColumns);
            this.props.onActivatedColumnsChange?.(activatedColumns);
        });

    };

    /**
     * 处理 row size 变更事件
     * @param rowSize
     */
    handleRowSizeChange = rowSize => {

        this.hidePopInTable();

        this.setState({
            rowSize
        }, () => this.props.onRowSizeChange?.(rowSize));

    };

    /**
     * 隐藏 table 中的 pop
     */
    hidePopInTable = () => {
        Subscription.publish(Subscription.RESET_MODULE_TABLE_POP_POSITION, this.tableEl);
    };

    /**
     * 获取 table element
     */
    handleGetTableEl = tableEl => {
        this.tableEl = tableEl;
    };

    /**
     * 从所有备选数据中取出 activatedFilter 对应的数据
     * @returns {*|*[]}
     */
    getDialogData = () => {

        const {filterData} = this.props,
            {activatedFilter} = this.state;

        if (!filterData || !activatedFilter) {
            return [];
        }

        return filterData[activatedFilter.dataKey] || [];

    };

    /**
     * 从所有已选择的 filter 数据中取出 activatedFilter 对应的数据
     * @returns {*|*[]}
     */
    getActivatedFilterValue = (activatedFilter = this.state.activatedFilter) => {

        const {filterValue: value} = this.props;

        if (!value || !activatedFilter) {
            return null;
        }

        const index = value.findIndex(item => item.name === activatedFilter.value);

        if (index === -1) {
            return null;
        }

        return value[index] || null;

    };

    /**
     * 处理 Column filter 的请求
     * @param column
     */
    handleRequestColumnFilter = column => {

        if (!column) {
            return;
        }

        const {filters} = this.props,
            activatedFilter = filters.find(filter => (column?.filterValue || column?.value) === filter.value);

        // metric
        if (column.dataType === 'metric') {

            const metricActivatedFilter = {
                ...activatedFilter,
                dataType: 'metric',
                type: FilterDialogType.LIMIT,
                label: column.label,
                value: column.value,
                unit: activatedFilter?.unit || MetricsUnit[column.value] || null,
                canSelectUnit: column.canSelectUnit || false
            };

            return this.setState({
                activatedFilter: metricActivatedFilter,
                activatedFilterValue: this.getActivatedFilterValue(metricActivatedFilter)
            });

        }

        // dimension
        if (activatedFilter) {
            this.setState({
                activatedFilter,
                activatedFilterValue: this.getActivatedFilterValue(activatedFilter)
            });
        }

    };

    /**
     * 处理 dialog 点击 apply
     * @param filterValue
     * @param includeType
     * @returns {any}
     */
    handleApply = (filterValue, includeType, bulkType) => {

        this.hideDialog();

        const {filterValue: value, onFilterChange} = this.props,
            {activatedFilter} = this.state;

        ModuleFilterUtil.handleFilterChange(activatedFilter, value, filterValue, includeType, bulkType, onFilterChange);

    };

    /**
     * 隐藏 Filter Dialog
     */
    hideDialog = () => {
        this.setState({
            activatedFilter: null
        });
    };

    render() {

        const {

                name, children, className,

                allColumns, isFullScreen, hasFinishedLoading, useAdvancedMetricFilter, extraActions,

                onFullScreenChange, onFilterValidate,

                // not passing down these props
                userProfile, activatedColumns: ac, rowSize: rs, filters, filterData, filterValue,
                defaultMetricColumnField, onActivatedColumnsChange, onRowSizeChange, onFilterChange,

                ...restProps

            } = this.props,
            {cardEl, activatedColumns, rowSize, activatedFilter, activatedFilterValue} = this.state;

        return (
            <Fragment>

                {/** 全屏时的模态框 */}
                {
                    isFullScreen ?
                        <div className="module-table-card-modal"></div>
                        :
                        null
                }

                {/** 主体 Card */}
                <Card {...restProps}
                      ref={this.card}
                      className={classNames('module-table-card', {
                          [className]: className,
                          'full-screen': isFullScreen
                      })}>

                    {/** Table 上方的工具条 */}
                    <Actions allColumns={allColumns}
                             activatedColumns={activatedColumns}
                             rowSize={rowSize}
                             extraActions={extraActions}
                             onFullScreenChange={onFullScreenChange}
                             onActivatedColumnsChange={this.handleActivatedColumnsChange}
                             onRowSizeChange={this.handleRowSizeChange}/>

                    <Table ref={this.table}
                           name={name}
                           wrapperEl={cardEl}
                           activatedColumns={activatedColumns}
                           rowSize={rowSize}
                           hasFinishedLoading={hasFinishedLoading}
                           filterValue={filterValue}
                           onGetTableEl={this.handleGetTableEl}
                           onRequestColumnFilter={this.handleRequestColumnFilter}>
                        {children}
                    </Table>

                </Card>

                {/** 集成的 filter 弹出框 */}
                <FilterDialog data={this.getDialogData()}
                              value={activatedFilterValue?.value || []}
                              includeType={activatedFilterValue?.includeType || 'include'}
                              visible={!!activatedFilter}
                              filter={activatedFilter}
                              useAdvancedMetricFilter={useAdvancedMetricFilter}
                              onValidate={onFilterValidate}
                              onOKButtonClick={this.handleApply}
                              onRequestClose={this.hideDialog}/>

            </Fragment>
        );

    }
}

ModuleTableCard.propTypes = {

    name: PropTypes.string,
    children: PropTypes.any,

    className: PropTypes.string,
    style: PropTypes.object,

    /**
     * 用户配置
     */
    userProfile: PropTypes.shape({
        id: PropTypes.number
    }),

    /**
     * columns
     */
    allColumns: PropTypes.array,
    activatedColumns: PropTypes.array,

    /**
     * row size
     */
    rowSize: PropTypes.oneOf(enumerateValue(TableRowSize)),

    /**
     * full screen
     */
    isFullScreen: PropTypes.bool,

    /**
     * loading
     */
    hasFinishedLoading: PropTypes.bool,

    /**
     * filters 配置信息
     */
    filters: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(enumerateValue(FilterDialogType)),
        label: PropTypes.string,
        value: PropTypes.string,
        dataKey: PropTypes.string,
        dataValueField: PropTypes.string,
        dataListRenderer: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        dataValueRenderer: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        tagRenderer: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    })),

    /**
     * filters 的备选数据
     */
    filterData: PropTypes.object,

    /**
     * 已选 filters 的值
     */
    filterValue: PropTypes.arrayOf(PropTypes.shape({
        includeType: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.array
    })),

    /**
     * filter 配置参数
     */
    useAdvancedMetricFilter: PropTypes.bool,

    /**
     * 默认的 metric 列的 field
     */
    defaultMetricColumnField: PropTypes.string,

    /**
     * 额外的 actions
     */
    extraActions: PropTypes.any,

    /**
     * callbacks
     */
    onFullScreenChange: PropTypes.func,
    onActivatedColumnsChange: PropTypes.func,
    onRowSizeChange: PropTypes.func,
    onFilterValidate: PropTypes.func,
    onFilterChange: PropTypes.func

};

ModuleTableCard.defaultProps = {

    isFullScreen: false,
    hasFinishedLoading: false,

    /**
     * filter 配置参数
     */
    useAdvancedMetricFilter: false,
    defaultMetricColumnField: 'defaultMetrics'

};

export default connect(state => ({
    isFullScreen: state.fullScreen.isFullScreen,
    userProfile: state.user.profile
}), dispatch => bindActionCreators({}, dispatch), null, {forwardRef: true})(ModuleTableCard);
