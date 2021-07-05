/**
 * @file NavPatients.js
 */

import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import CircularLoading from 'alcedo-ui/CircularLoading';
import NavPatientCollapsed from './NavPatientsPopover';
import NoPatient from './NavNoPatient';
import PatientListWrapper from './NavPatientListWrapper';

// Vendors
import classNames from 'classnames';

// Styles
import './NavPatients.scss';

const NavPatient = ({
    isCollapsed, isFold, groupListActionType, patientList, patientListActionType
}) => {

    /**
     * 是否没有 patient
     * @type {boolean}
     */
    const noPatient = useMemo(() => {
        return !patientList || patientList.length < 1;
    }, [
        patientList
    ]);

    return (
        <div className={classNames('nav-patients', {
            'no-patient': noPatient,
            collapsed: isCollapsed,
            fold: isFold
        })}>
            {
                groupListActionType === 'patientGroup/getPatientGroupsRequest'
                || patientListActionType === 'patients/getPatientsRequest' ?
                    <CircularLoading/>
                    :
                    isCollapsed ?
                        <NavPatientCollapsed isFold={isFold}/>
                        :
                        noPatient ?
                            <NoPatient/>
                            :
                            <PatientListWrapper/>
            }
        </div>
    );

};

NavPatient.propTypes = {
    isCollapsed: PropTypes.bool,
    isFold: PropTypes.bool,
    groupListActionType: PropTypes.string,
    patientList: PropTypes.array,
    patientListActionType: PropTypes.string
};

export default connect(state => ({
    groupListActionType: state.patientGroup.actionType,
    patientList: state.patients.list,
    patientListActionType: state.patients.getActionType
}))(NavPatient);
