/**
 * @file ModuleTableRowSizeSelector.js
 */

import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import ActionButtonRadioGroup from 'components/module/table/actions/ModuleTableActionButtonRadioGroup';

// Statics
import TableRowSize from '../TableRowSize';

// Vendors
import {enumerateValue} from 'vendors/Util';

// Styles
import './ModuleTableRowSizeSelector.scss';

const ModuleTableRowSizeSelector = ({
    value,
    onChange
}) => {

    const

        /**
         * ButtonRadioGroup 选中的值
         */
        fieldValue = useMemo(() =>
            ModuleTableRowSizeSelector.Sizes.find(item => item?.value === value)
            || ModuleTableRowSizeSelector.Sizes[1], [
            value
        ]),

        /**
         * 处理 button 点击事件
         * @type {Function}
         */
        handleChange = useCallback(v =>
            onChange?.(v?.value), [
            onChange
        ]);

    return (
        <ActionButtonRadioGroup className="module-table-row-size-selector"
                                tipContent="Adjust row size"
                                data={ModuleTableRowSizeSelector.Sizes}
                                value={fieldValue}
                                renderer={() => null}
                                onChange={handleChange}/>
    );

};

ModuleTableRowSizeSelector.Sizes = [{
    value: TableRowSize.COMFORTABLE,
    text: 'Comfortable',
    iconCls: 'fas fa-align-justify'
}, {
    value: TableRowSize.DEFAULT,
    text: 'Default',
    iconCls: 'far fa-align-justify'
}, {
    value: TableRowSize.COMPACT,
    text: 'Compact',
    iconCls: 'fal fa-align-justify'
}];

ModuleTableRowSizeSelector.propTypes = {
    value: PropTypes.oneOf(enumerateValue(TableRowSize)),
    onChange: PropTypes.func
};

export default ModuleTableRowSizeSelector;
