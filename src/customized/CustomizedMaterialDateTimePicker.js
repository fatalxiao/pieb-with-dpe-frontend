/**
 * @file CustomizedMaterialDateTimePicker.js
 */

import React from 'react';

// Components
import MaterialDateTimePicker from 'alcedo-ui/MaterialDateTimePicker';

// Statics
import Theme from 'alcedo-ui/Theme';

const CustomizedMaterialDateTimePicker = props => (
    <MaterialDateTimePicker {...props}/>
);

CustomizedMaterialDateTimePicker.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false

};

export default CustomizedMaterialDateTimePicker;
