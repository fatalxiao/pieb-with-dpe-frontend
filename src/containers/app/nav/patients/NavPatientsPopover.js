/**
 * @file NavPatientsPopover.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import IconButton from 'alcedo-ui/IconButton';
import Popover from 'alcedo-ui/Popover';
import PopoverProvider from 'alcedo-ui/PopoverProvider';
import PatientList from './NavPatientList';

// Styles
import 'scss/containers/app/nav/patients/NavPatientPopover.scss';

const NavPatientsPopover = ({
    routerPush
}) => {

    const

        /**
         * 跳转到列表页
         * @type {function(): *}
         */
        goToList = useCallback(() =>
                routerPush?.('/app/patient-list'),
            [routerPush]
        );

    return (
        <div className="nav-patient-popover-wrapper">
            <PopoverProvider className="nav-patient-popover"
                             popoverContent={
                                 <PatientList/>
                             }
                             position={Popover.Position.RIGHT_TOP}
                             hasTriangle={false}>
                <IconButton className="nav-patient-popover-item"
                            iconCls="icon-list"
                            onClick={goToList}/>
            </PopoverProvider>
        </div>
    );

};

NavPatientsPopover.propTypes = {

    isFold: PropTypes.bool,

    routerPush: PropTypes.func

};

export default connect(null, dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(NavPatientsPopover);
