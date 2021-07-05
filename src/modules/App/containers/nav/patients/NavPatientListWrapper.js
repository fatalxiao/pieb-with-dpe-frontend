/**
 * @file NavPatientListWrapper.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import FlatButton from 'alcedo-ui/FlatButton';
import PatientList from './NavPatientList';

// Styles
import './NavPatientListWrapper.scss';

const NavPatientListWrapper = ({
    patientList,
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
        <div className="nav-patient-list-wrapper">

            <FlatButton className="all-patients-button"
                        value="All Patients"
                        iconCls="icon-list"
                        onClick={goToList}>
                <span className="patients-count">
                    [{patientList?.length || 0}]
                </span>
            </FlatButton>

            <PatientList/>

        </div>
    );

};

NavPatientListWrapper.propTypes = {
    patientList: PropTypes.array,
    dispatch: PropTypes.func
};

export default connect(state => ({
    patientList: state.patients.list
}))(NavPatientListWrapper);
