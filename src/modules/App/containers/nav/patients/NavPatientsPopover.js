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
    dispatch
}) => {

    /**
     * 跳转到列表页
     * @type {function(): *}
     */
    const goToList = useCallback(() => {
        dispatch?.({
            type: 'route/push',
            route: '/app/patient-list'
        });
    }, [
        dispatch
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

    isFold: PropTypes.bool,

    dispatch: PropTypes.func

};

export default connect()(NavPatientsPopover);
