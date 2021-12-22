/**
 * @file NavPatientListWrapper.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import FlatButton from 'alcedo-ui/FlatButton';
import PatientList from './NavPatientList';

// Styles
import './NavPatientListWrapper.scss';

const NavPatientListWrapper = ({
    patientList,
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
    pushRoute: PropTypes.func
};

export default connect(state => ({
    patientList: state.patients.list
}), dispatch => bindModelActionCreators({
    pushRoute: 'route/push'
}, dispatch))(NavPatientListWrapper);
