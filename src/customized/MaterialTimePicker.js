/**
 * @file MaterialTimePicker.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import AlcedoMaterialTimePicker from 'alcedo-ui/MaterialTimePicker';

// Statics
import Theme from 'alcedo-ui/Theme';

const MaterialTimePicker = ({
    value,
    onChange,
    ...restProps
}) => {

    const

        /**
         * 格式化 value，去除秒
         * @type {function(*=): (string|string)}
         */
        formatValue = useCallback(v => {

            if (!v) {
                return '';
            }

            const array = v.split(':');
            return `${array[0]}:${array[1]}`;

        }, []),

        /**
         * 处理 value 变更，去除秒
         * @type {function(*): void}
         */
        handleChange = useCallback(v => {
            onChange?.(v ? formatValue(v) : '');
        }, [
            formatValue, onChange
        ]);

    return (
        <AlcedoMaterialTimePicker {...restProps}
                                  value={formatValue(value)}
                                  onChange={handleChange}/>
    );

};

MaterialTimePicker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

MaterialTimePicker.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false

};

export default MaterialTimePicker;
