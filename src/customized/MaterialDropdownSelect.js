/**
 * @file MaterialDropdownSelect.js
 */

import React from 'react';

// Components
import AlcedoMaterialDropdownSelect from 'alcedo-ui/MaterialDropdownSelect';

// Statics
import Theme from 'alcedo-ui/Theme';

const MaterialDropdownSelect = (props) => (
    <AlcedoMaterialDropdownSelect {...props}/>
);

MaterialDropdownSelect.defaultProps = {

    theme: Theme.HIGHLIGHT,
    rightIconCls: 'fal fa-chevron-down',

    isLabelAnimate: false

};

export default MaterialDropdownSelect;
