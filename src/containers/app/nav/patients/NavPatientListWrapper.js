/**
 * @file NavPatientListWrapper.js
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import FlatButton from 'alcedo-ui/FlatButton';
import PatientList from './NavPatientList';

// Styles
import 'scss/containers/app/nav/patients/NavPatientListWrapper.scss';

const NavPatientListWrapper = ({
    patientList,
    routerPush
}) => {

    const

        /**
         * 跳转到列表页
         * @type {function(): *}
         */
        goToList = useCallback(() => routerPush?.('/app/patient-list'), [routerPush]);

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
    routerPush: PropTypes.func
};

export default connect(state => ({
    patientList: state.patients.list
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(NavPatientListWrapper);
