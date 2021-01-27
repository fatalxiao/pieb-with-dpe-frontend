/**
 * @file ModuleTableActions.js
 */

import React, {Component, Fragment} from 'react';
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

class ModuleTableActions extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            rowSize, extraActions,
            onFullScreenChange, onRowSizeChange
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

                <RowSizeSelector value={rowSize}
                                 onChange={onRowSizeChange}/>

            </div>
        );

    }
}

ModuleTableActions.propTypes = {

    rowSize: PropTypes.oneOf(enumerateValue(TableRowSize)),
    extraActions: PropTypes.any,

    onFullScreenChange: PropTypes.func,
    onRowSizeChange: PropTypes.func

};

export default ModuleTableActions;
