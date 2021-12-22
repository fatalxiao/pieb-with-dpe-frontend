/**
 * @file NavPatientListItem.js
 */

import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import FlatButton from 'alcedo-ui/FlatButton';

// Styles
import './NavPatientListItem.scss';

const NavPatientListItem = ({
    groupList, patient,
    pushRoute
}) => {

    /**
     * 当前 patient 的 ID
     */
    const patientId = patient?.id;

    /**
     * 当前 patient 所属 group 的 name
     */
    const groupName = useMemo(() => {
        return groupList.find(item => item?.id === patient.groupId)?.name;
    }, [
        groupList, patient
    ]);

    /**
     * 处理点击，跳转到 patient info 页面
     * @type {function(): *}
     */
    const handleClick = useCallback(() => {
        pushRoute?.({
            route: `/app/patient/info/${patientId}`
        });
    }, [
        patientId,
        pushRoute
    ]);

    return patient ?
        <FlatButton className="nav-patient-list-item"
                    onClick={handleClick}>

            <div className="nav-patient-list-patient-info">
                <span className="patient-name">
                    {patient.name}
                </span>
            </div>

            <div className="patient-desc">
                {`${patientId} · ${groupName}`}
            </div>

        </FlatButton>
        :
        null;

};

NavPatientListItem.propTypes = {

    groupList: PropTypes.array,
    patient: PropTypes.object,

    pushRoute: PropTypes.func

};

export default connect(state => ({
    groupList: state.patientGroup.list
}), dispatch => bindModelActionCreators({
    pushRoute: 'route/push'
}, dispatch))(NavPatientListItem);
