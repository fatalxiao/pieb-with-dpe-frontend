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

// Statics
import {ApiStatus} from 'vivy-api';

// Vendors
import classNames from 'classnames';

// Styles
import './NavPatients.scss';

const NavPatient = ({
    isCollapsed, isFold, getGroupListStatus, patientList, getPatientListStatus
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
                getGroupListStatus === ApiStatus.REQUEST
                || getPatientListStatus === ApiStatus.REQUEST ?
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
    getGroupListStatus: PropTypes.string,
    patientList: PropTypes.array,
    getPatientListStatus: PropTypes.string
};

export default connect(state => ({
    getGroupListStatus: state.apiStatus.patientGroup?.getPatientGroups,
    patientList: state.patients.list,
    getPatientListStatus: state.apiStatus.patients?.getPatients
}))(NavPatient);
