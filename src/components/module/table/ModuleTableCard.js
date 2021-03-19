/**
 * @file ModuleTableCard.js
 */

import React, {Fragment, Children, useRef, useState, useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

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

const ModuleTableCard = ({

    name, children, className,

    rowSize: propsRowSize, isFullScreen, hasFinishedLoading, extraActions,

    onFullScreenChange, onRowSizeChange,

    // not passing down these props
    // eslint-disable-next-line react/prop-types
    dispatch,

    ...restProps

}) => {

    const

        /**
         * card 的 reference
         */
        cardRef = useRef(),

        /**
         * table 的 reference
         */
        tableRef = useRef(),

        /**
         * rest children 的 reference
         */
        restChildrenRef = useRef(),

        /**
         * 当前 card 的 element
         */
        [cardEl, setCardEl] = useState(null),

        /**
         * 当前的 row size 的值
         */
        [rowSize, setRowSize] = useState(propsRowSize),

        /**
         * 默认第一个为 table 组件，会传入 ModuleTable 作为 children
         * 剩余其他的 children 放在 card 的最后渲染
         * @type {Array<Exclude<React.ReactNode, boolean | null | undefined>>}
         */
        [tableChild, ...restChildren] = useMemo(() =>
            Children.toArray(children), [
            children
        ]),

        /**
         * 全屏时的固定高度，计算滚动高度时需要排除的高度
         * @type {*}
         */
        fullScreenTableFixedHeight = useMemo(() =>
            restChildrenRef?.current?.clientHeight || 0,
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [
                restChildrenRef?.current
            ]),

        /**
         * 更新 card 的 element
         */
        updateCardEl = useCallback(() => {
            const nextCardEl = findDOMNode(cardRef?.current);
            if (nextCardEl) {
                setCardEl(nextCardEl);
            }
        }, [
            cardRef
        ]),

        /**
         * 处理 row size 的变更
         */
        handleRowSizeChange = useCallback(nextRowSize => {
            setRowSize(nextRowSize);
            onRowSizeChange?.(nextRowSize);
        }, [
            onRowSizeChange
        ]);

    /**
     * 初始化
     */
    useEffect(() =>
        updateCardEl(), [
        updateCardEl
    ]);

    return (
        <Fragment>

            {/** 全屏时的模态框 */}
            {
                isFullScreen ?
                    <div className="module-table-card-modal"/>
                    :
                    null
            }

            {/** 主体 Card */}
            <Card {...restProps}
                  ref={cardRef}
                  className={classNames('module-table-card', {
                      [className]: className,
                      'not-full-screen': !isFullScreen,
                      'full-screen': isFullScreen
                  })}>

                {/** Table 上方的工具条 */}
                <Actions rowSize={rowSize}
                         extraActions={extraActions}
                         onFullScreenChange={onFullScreenChange}
                         onRowSizeChange={handleRowSizeChange}/>

                <Table ref={tableRef}
                       name={name}
                       wrapperEl={cardEl}
                       rowSize={rowSize}
                       hasFinishedLoading={hasFinishedLoading}
                       fullScreenFixedHeight={fullScreenTableFixedHeight}>
                    {tableChild}
                </Table>

                <div ref={restChildrenRef}
                     className="module-table-card-rest-children">
                    {restChildren}
                </div>

            </Card>

        </Fragment>
    );

};

ModuleTableCard.propTypes = {

    name: PropTypes.string,
    children: PropTypes.any,

    className: PropTypes.string,
    style: PropTypes.object,

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
     * 额外的 actions
     */
    extraActions: PropTypes.any,

    /**
     * callbacks
     */
    onFullScreenChange: PropTypes.func,
    onRowSizeChange: PropTypes.func

};

ModuleTableCard.defaultProps = {
    isFullScreen: false,
    hasFinishedLoading: false
};

export default connect(state => ({
    isFullScreen: state.fullScreen.isFullScreen
}))(ModuleTableCard);
