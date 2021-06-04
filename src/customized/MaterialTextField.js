/**
 * @file MaterialTextField.js
 */

import React from 'react';

// Components
import AlcedoMaterialTextField from 'alcedo-ui/MaterialTextField';

// Statics
import Theme from 'alcedo-ui/Theme';

const MaterialTextField = props => (
    <AlcedoMaterialTextField {...props}/>
);

MaterialTextField.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false

};

export default MaterialTextField;
