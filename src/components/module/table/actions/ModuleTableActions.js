/**
 * @file ModuleTableActions.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import FullScreen from './ModuleTableFullScreen';
import RowSizeSelector from './ModuleTableRowSizeSelector';

// Statics
import TableRowSize from '../TableRowSize';

// Vendors
import {enumerateValue} from 'vendors/Util';

// Styles
import './ModuleTableActions.scss';

const ModuleTableActions = ({
    rowSize, extraActions,
    onFullScreenChange, onRowSizeChange
}) => (
    <div className="module-table-actions">

        {
            extraActions ?
                <>
                    {extraActions}
                    <div className="module-table-actions-extra-separator"/>
                </>
                :
                null
        }

        <FullScreen onChange={onFullScreenChange}/>

        <RowSizeSelector value={rowSize}
                         onChange={onRowSizeChange}/>

    </div>
);

ModuleTableActions.propTypes = {

    rowSize: PropTypes.oneOf(enumerateValue(TableRowSize)),
    extraActions: PropTypes.any,

    onFullScreenChange: PropTypes.func,
    onRowSizeChange: PropTypes.func

};

export default ModuleTableActions;
