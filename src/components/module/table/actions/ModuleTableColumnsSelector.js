/**
 * @file ModuleTableColumnsSelector.js
 */

import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

// Components
import Action from './ModuleTableAction';
import PopupProvider from 'customized/CustomizedPopupProvider';
import Tree from 'customized/CustomizedTree';

// Vendors
import ComponentUtil from 'vendors/ComponentUtil';
import Event from 'vendors/Event';

// Styles
import './ModuleTableColumnsSelector.scss';

class ModuleTableColumnsSelector extends Component {

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
     * 处理 columns 选择改变
     * @param value
     */
    handleChange = value => {

        const result = value.filter(v => !v.children);

        this.setState({
            value: result
        }, () => {
            const {onChange} = this.props;
            onChange && onChange(result);
        });

    };

    /**
     * 隐藏 pop
     */
    hidePop = () => {
        this.pop?.current?.hide();
    };

    render() {

        const {data} = this.props,
            {value} = this.state;

        return (
            <PopupProvider ref={this.pop}
                           className="module-table-columns-selector-pop"
                           hasTriangle={false}
                           popupContent={
                               <Tree selectMode={Tree.SelectMode.MULTI_SELECT}
                                     data={data}
                                     value={value}
                                     valueField="label"
                                     isSelectRecursive={true}
                                     collapsed={true}
                                     indentWidth={0}
                                     nodeDisabled={node => node?.keepVisible}
                                     onChange={this.handleChange}/>
                           }
                           onRequestOpen={this.handleRequestOpen}
                           onRequestClose={this.handleRequestClose}>
                <Action iconCls="dsicon dsicon-column"
                        tip="Select columns"/>
            </PopupProvider>
        );

    }
}

ModuleTableColumnsSelector.propTypes = {

    data: PropTypes.array,
    value: PropTypes.array,

    onChange: PropTypes.func

};

export default ModuleTableColumnsSelector;
