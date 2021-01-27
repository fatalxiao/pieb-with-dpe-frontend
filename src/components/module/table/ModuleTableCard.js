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

// Statics
import TableRowSize from './TableRowSize';

// Vendors
import classNames from 'classnames';
import {enumerateValue} from 'vendors/Util';

// Styles
import './ModuleTableCard.scss';

class ModuleTableCard extends Component {

    constructor(props) {

        super(props);

        this.card = createRef();
        this.table = createRef();

        this.state = {
            cardEl: null,
            rowSize: props.rowSize
        };

    }

    componentDidMount() {
        this.updateCardEl();
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
     * 处理 row size 变更事件
     * @param rowSize
     */
    handleRowSizeChange = rowSize => {

        this.hidePopInTable();

        this.setState({
            rowSize
        }, () => this.props.onRowSizeChange?.(rowSize));

    };

    render() {

        const {

                name, children, className,

                allColumns, isFullScreen, hasFinishedLoading, useAdvancedMetricFilter, extraActions,

                onFullScreenChange, onFilterValidate,

                // not passing down these props
                userProfile, rowSize: rs, filters, filterData, filterValue,
                defaultMetricColumnField, onActivatedColumnsChange, onRowSizeChange, onFilterChange,

                ...restProps

            } = this.props,
            {cardEl, rowSize} = this.state;

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
                             rowSize={rowSize}
                             extraActions={extraActions}
                             onFullScreenChange={onFullScreenChange}
                             onActivatedColumnsChange={this.handleActivatedColumnsChange}
                             onRowSizeChange={this.handleRowSizeChange}/>

                    <Table ref={this.table}
                           name={name}
                           wrapperEl={cardEl}
                           rowSize={rowSize}
                           hasFinishedLoading={hasFinishedLoading}
                           filterValue={filterValue}
                           onGetTableEl={this.handleGetTableEl}
                           onRequestColumnFilter={this.handleRequestColumnFilter}>
                        {children}
                    </Table>

                </Card>

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
    isFullScreen: state.fullScreen.isFullScreen
}), dispatch => bindActionCreators({}, dispatch), null, {forwardRef: true})(ModuleTableCard);
