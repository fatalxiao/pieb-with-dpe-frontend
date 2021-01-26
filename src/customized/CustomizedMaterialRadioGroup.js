/**
 * @file CustomizedMaterialRadioGroup.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import MaterialProvider from 'alcedo-ui/MaterialProvider';
import RadioGroup from 'alcedo-ui/RadioGroup';

// Statics
import Theme from 'alcedo-ui/Theme';

const CustomizedMaterialRadioGroup = ({
    className, label, isLabelAnimate, useSeparator,
    ...restProps
}) => (
    <MaterialProvider className={className}
                      label={label}
                      isLabelAnimate={isLabelAnimate}
                      useSeparator={useSeparator}>
        <RadioGroup {...restProps}/>
    </MaterialProvider>
);

CustomizedMaterialRadioGroup.propTypes = {

    className: PropTypes.string,

    label: PropTypes.string,

    isLabelAnimate: PropTypes.bool,
    useSeparator: PropTypes.bool

};

CustomizedMaterialRadioGroup.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false,
    useSeparator: false

};

export default CustomizedMaterialRadioGroup;
