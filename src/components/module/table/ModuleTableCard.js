/**
 * @file ModuleTableCard.js
 */

import React, {Fragment, useRef, useState, useCallback, useEffect, forwardRef} from 'react';
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

const ModuleTableCard = forwardRef(({

    name, children, className,

    rowSize: propsRowSize, isFullScreen, hasFinishedLoading, extraActions,

    onFullScreenChange, onRowSizeChange,

    ...restProps

}, cardRef) => {

    const

        /**
         * table 的 reference
         */
        tableRef = useRef(),

        /**
         * 当前 card 的 element
         */
        [cardEl, setCardEl] = useState(null),

        /**
         * 当前的 row size 的值
         */
        [rowSize, setRowSize] = useState(propsRowSize),

        /**
         * 更新 card 的 element
         */
        updateCardEl = useCallback(() => {
            const nextCardEl = findDOMNode(cardRef?.current);
            if (nextCardEl) {
                setCardEl(nextCardEl);
            }
        }, [cardRef]),

        /**
         * 处理 row size 的变更
         */
        handleRowSizeChange = useCallback(nextRowSize => {
            setRowSize(nextRowSize);
            onRowSizeChange?.(nextRowSize);
        }, [onRowSizeChange]);

    /**
     * 初始化
     */
    useEffect(() => updateCardEl(), [updateCardEl]);

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
                       hasFinishedLoading={hasFinishedLoading}>
                    {children}
                </Table>

            </Card>

        </Fragment>
    );

});

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
}), null, null, {forwardRef: true})(ModuleTableCard);
