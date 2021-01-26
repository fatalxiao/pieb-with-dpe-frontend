/**
 * @file CustomizedMaterialDropdownSelect.js
 */

import React from 'react';

// Components
import MaterialDropdownSelect from 'alcedo-ui/MaterialDropdownSelect';

// Statics
import Theme from 'alcedo-ui/Theme';

const CustomizedMaterialDropdownSelect = (props) => (
    <MaterialDropdownSelect {...props}/>
);

CustomizedMaterialDropdownSelect.defaultProps = {

    theme: Theme.HIGHLIGHT,

    isLabelAnimate: false

};

export default CustomizedMaterialDropdownSelect;
