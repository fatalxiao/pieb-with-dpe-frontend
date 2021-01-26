/**
 * @file CustomizedMaterialCheckbox.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import MaterialProvider from 'alcedo-ui/MaterialProvider';
import Checkbox from 'alcedo-ui/Checkbox';

// Statics
import Theme from 'alcedo-ui/Theme';

const CustomizedMaterialCheckbox = ({
    className, label, isLabelAnimate, useSeparator,
    ...restProps
}) => (
    <MaterialProvider className={className}
                      label={label}
                      isLabelAnimate={isLabelAnimate}
                      useSeparator={useSeparator}>
        <Checkbox {...restProps}/>
    </MaterialProvider>
);

CustomizedMaterialCheckbox.propTypes = {

    className: PropTypes.string,

    label: PropTypes.string,

    isLabelAnimate: PropTypes.bool,
    useSeparator: PropTypes.bool

};

CustomizedMaterialCheckbox.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false,
    useSeparator: false

};

export default CustomizedMaterialCheckbox;
