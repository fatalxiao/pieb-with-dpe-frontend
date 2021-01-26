/**
 * @file CustomizedMaterialTextField.js
 */

import React from 'react';

// Components
import MaterialTextField from 'alcedo-ui/MaterialTextField';

// Statics
import Theme from 'alcedo-ui/Theme';

const CustomizedMaterialTextField = props => (
    <MaterialTextField {...props}/>
);

CustomizedMaterialTextField.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false

};

export default CustomizedMaterialTextField;
