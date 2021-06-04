/**
 * @file MaterialTextArea.js
 */

import React from 'react';

// Components
import AlcedoMaterialTextArea from 'alcedo-ui/MaterialTextArea';

// Statics
import Theme from 'alcedo-ui/Theme';

const MaterialTextArea = props => (
    <AlcedoMaterialTextArea {...props}/>
);

MaterialTextArea.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false,
    autoHeight: true

};

export default MaterialTextArea;
