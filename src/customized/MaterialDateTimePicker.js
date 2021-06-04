/**
 * @file MaterialDateTimePicker.js
 */

import React from 'react';

// Components
import AlcedoMaterialDateTimePicker from 'alcedo-ui/MaterialDateTimePicker';

// Statics
import Theme from 'alcedo-ui/Theme';

const MaterialDateTimePicker = props => (
    <AlcedoMaterialDateTimePicker {...props}/>
);

MaterialDateTimePicker.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false,
    clearButtonVisible: false

};

export default MaterialDateTimePicker;
