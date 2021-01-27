/**
 * @file ModuleTableRowSizeSelector.js
 */

import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

// Components
import Action from './ModuleTableAction';
import PopupProvider from 'customized/CustomizedPopupProvider';
import List from 'customized/CustomizedList';

// Statics
import TableRowSize from 'statics/TableRowSize';

// Vendors
import ComponentUtil from 'vendors/ComponentUtil';
import {enumerateValue} from 'vendors/Util';
import Event from 'vendors/Event';

// Styles
import './ModuleTableRowSizeSelector.scss';

class ModuleTableRowSizeSelector extends Component {

    static DATA = [{
        value: TableRowSize.DEFAULT,
        text: 'Default',
        iconCls: 'dsicon dsicon-row-medium'
    }, {
        value: TableRowSize.COMFORTABLE,
        text: 'Comfortable',
        iconCls: 'dsicon dsicon-row-comfortable'
    }, {
        value: TableRowSize.COMPACT,
        text: 'Compact',
        iconCls: 'dsicon dsicon-row-compact'
    }];

    static getDerivedStateFromProps(props, state) {
        return {
            prevProps: props,
            value: ComponentUtil.getDerivedState(props, state, 'value')
        };
    }

    constructor(props) {

        super(props);

        this.pop = createRef();

        this.state = {
            value: props.value
        };

    }

    componentWillUnmount() {
        // 移除滚动事件
        Event.removeEvent(document, 'scroll', this.hidePop);
    }

    /**
     * pop 打开后绑定滚动事件
     */
    handleRequestOpen = () => {
        Event.addEvent(document, 'scroll', this.hidePop);
    };

    /**
     * pop 关闭后移除滚动事件
     */
    handleRequestClose = () => {
        Event.removeEvent(document, 'scroll', this.hidePop);
    };

    /**
     * 隐藏 pop
     */
    hidePop = () => {
        this.pop?.current?.hide();
    };

    /**
     * 根据 row size value 映射到 ModuleTableRowSizeSelector.DATA 中的完整配置
     * @param value
     * @returns {*}
     */
    getValueByRowSize = (value = this.state.value) => {
        return ModuleTableRowSizeSelector.DATA.find(item => item.value === value)
            || ModuleTableRowSizeSelector.DATA[0];
    };

    /**
     * 处理 row size 变更事件
     * @param rowSize
     */
    handleChange = rowSize => {

        this.hidePop();

        if (!rowSize || rowSize.value === this.state.value) {
            return;
        }

        this.setState({
            value: rowSize.value
        }, () => {
            const {onChange} = this.props;
            onChange && onChange(rowSize.value);
        });

    };

    render() {

        const rowSize = this.getValueByRowSize();

        return (
            <PopupProvider ref={this.pop}
                           className="module-table-row-size-selector-pop"
                           hasTriangle={false}
                           popupContent={
                               <List data={ModuleTableRowSizeSelector.DATA}
                                     value={rowSize}
                                     valueField="label"
                                     onItemClick={this.handleChange}/>
                           }
                           onRequestOpen={this.handleRequestOpen}
                           onRequestClose={this.handleRequestClose}>
                <Action iconCls={rowSize.iconCls}
                        tip="Adjust size"/>
            </PopupProvider>
        );

    }
}

ModuleTableRowSizeSelector.propTypes = {
    value: PropTypes.oneOf(enumerateValue(TableRowSize)),
    onChange: PropTypes.func
};

ModuleTableRowSizeSelector.defaultProps = {
    value: TableRowSize.DEFAULT
};

export default ModuleTableRowSizeSelector;
