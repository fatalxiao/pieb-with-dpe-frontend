/**
 * @file NavPatientsPopover.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import IconButton from 'alcedo-ui/IconButton';
import Popover from 'alcedo-ui/Popover';
import PopoverProvider from 'alcedo-ui/PopoverProvider';
import PatientList from './NavPatientList';

// Styles
import './NavPatientsPopover.scss';

const NavPatientsPopover = ({
    pushRoute
}) => {

    /**
     * 跳转到列表页
     * @type {function(): *}
     */
    const goToList = useCallback(() => {
        pushRoute?.({
            route: '/app/patient-list'
        });
    }, [
        pushRoute
    ]);

    return (
        <div className="nav-patients-popover-wrapper">
            <PopoverProvider className="nav-patients-popover"
                             popoverContent={
                                 <PatientList/>
                             }
                             position={Popover.Position.RIGHT_TOP}
                             hasTriangle={false}>
                <IconButton className="nav-patients-popover-item"
                            iconCls="icon-list"
                            onClick={goToList}/>
            </PopoverProvider>
        </div>
    );

};

NavPatientsPopover.propTypes = {
    pushRoute: PropTypes.func
};

export default connect(null, dispatch => bindModelActionCreators({
    pushRoute: 'route/push'
}, dispatch))(NavPatientsPopover);
