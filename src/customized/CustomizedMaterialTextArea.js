/**
 * @file CustomizedMaterialTextArea.js
 */

import React from 'react';

// Components
import MaterialTextArea from 'alcedo-ui/MaterialTextArea';

// Statics
import Theme from 'alcedo-ui/Theme';

const CustomizedMaterialTextArea = props => (
    <MaterialTextArea {...props}/>
);

CustomizedMaterialTextArea.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false,
    autoHeight: true

};

export default CustomizedMaterialTextArea;
