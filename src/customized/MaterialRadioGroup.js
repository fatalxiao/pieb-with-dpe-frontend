/**
 * @file MaterialRadioGroup.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import AlcedoMaterialProvider from 'alcedo-ui/MaterialProvider';
import RadioGroup from 'alcedo-ui/RadioGroup';

// Statics
import Theme from 'alcedo-ui/Theme';

const MaterialRadioGroup = ({
    className, label, isLabelAnimate, useSeparator,
    ...restProps
}) => (
    <AlcedoMaterialProvider className={className}
                            label={label}
                            isLabelAnimate={isLabelAnimate}
                            useSeparator={useSeparator}>
        <RadioGroup {...restProps}/>
    </AlcedoMaterialProvider>
);

MaterialRadioGroup.propTypes = {

    className: PropTypes.string,

    label: PropTypes.string,

    isLabelAnimate: PropTypes.bool,
    useSeparator: PropTypes.bool

};

MaterialRadioGroup.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false,
    useSeparator: false

};

export default MaterialRadioGroup;
