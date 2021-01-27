/**
 * @file ModuleTableActions.js
 */

import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// Components
import FullScreen from './ModuleTableFullScreen';
import ColumnsSelector from './ModuleTableColumnsSelector';
import RowSizeSelector from './ModuleTableRowSizeSelector';

// Statics
import TableRowSize from 'statics/TableRowSize';

// Vendors
import {enumerateValue} from 'vendors/Util';

// Styles
import './ModuleTableActions.scss';

class ModuleTableActions extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            allColumns, activatedColumns, rowSize, extraActions,
            onFullScreenChange, onActivatedColumnsChange, onRowSizeChange
        } = this.props;

        return (
            <div className="module-table-actions">

                {
                    extraActions ?
                        <Fragment>
                            {extraActions}
                            <div className="module-table-actions-extra-separator"></div>
                        </Fragment>
                        :
                        null
                }

                <FullScreen onChange={onFullScreenChange}/>

                {
                    allColumns && allColumns.length > 0 ?
                        <ColumnsSelector data={allColumns}
                                         value={activatedColumns}
                                         onChange={onActivatedColumnsChange}/>
                        :
                        null
                }

                <RowSizeSelector value={rowSize}
                                 onChange={onRowSizeChange}/>

            </div>
        );

    }
}

ModuleTableActions.propTypes = {

    allColumns: PropTypes.array,
    activatedColumns: PropTypes.array,
    rowSize: PropTypes.oneOf(enumerateValue(TableRowSize)),
    extraActions: PropTypes.any,

    onFullScreenChange: PropTypes.func,
    onActivatedColumnsChange: PropTypes.func,
    onRowSizeChange: PropTypes.func

};

export default ModuleTableActions;
