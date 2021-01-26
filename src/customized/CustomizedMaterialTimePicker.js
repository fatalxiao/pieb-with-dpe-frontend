/**
 * @file CustomizedMaterialTimePicker.js
 */

import React from 'react';

// Components
import MaterialTimePicker from 'alcedo-ui/MaterialTimePicker';

// Statics
import Theme from 'alcedo-ui/Theme';

const CustomizedMaterialTimePicker = props => (
    <MaterialTimePicker {...props}/>
);

CustomizedMaterialTimePicker.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false

};

export default CustomizedMaterialTimePicker;
