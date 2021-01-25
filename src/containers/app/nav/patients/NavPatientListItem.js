/**
 * @file NavPatientListItem.js
 */

import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import FlatButton from 'alcedo-ui/FlatButton';

// Styles
import 'scss/containers/app/nav/patients/NavPatientListItem.scss';

const NavPatientListItem = ({
    groupList, patient,
    routerPush
}) => {

    if (!patient) {
        return null;
    }

    const

        /**
         * 当前 patient 的 ID
         */
        patientId = useMemo(() =>
                patient.id,
            [patient]
        ),

        /**
         * 当前 patient 所属 group 的 name
         */
        groupName = useMemo(() =>
                groupList.find(item => item?.id === patient.groupId)?.name,
            [groupList, patientId]
        ),

        /**
         * 处理点击，跳转到 patient info 页面
         * @type {function(): *}
         */
        handleClick = useCallback(() =>
                routerPush(`/app/patient/info/${patientId}`),
            [patientId, routerPush]
        );

    return (
        <FlatButton className="patient"
                    onClick={handleClick}>

            <div className="patient-info">
                <span className="patient-name">
                    {patient.name}
                </span>
            </div>

            <div className="patient-desc">
                {`${patientId} · ${groupName}`}
            </div>

        </FlatButton>
    );

};

NavPatientListItem.propTypes = {

    groupList: PropTypes.array,
    patient: PropTypes.object,

    routerPush: PropTypes.func

};

export default connect(state => ({
    groupList: state.group.list
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(NavPatientListItem);
