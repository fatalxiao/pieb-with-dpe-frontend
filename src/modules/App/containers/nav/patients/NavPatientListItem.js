/**
 * @file NavPatientListItem.js
 */

import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import FlatButton from 'alcedo-ui/FlatButton';

// Styles
import './NavPatientListItem.scss';

const NavPatientListItem = ({
    groupList, patient,
    dispatch
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
        dispatch?.({
            type: 'route/push',
            route: `/app/patient/info/${patientId}`
        });
    }, [
        patientId, dispatch
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

    dispatch: PropTypes.func

};

export default connect(state => ({
    groupList: state.patientGroup.list
}))(NavPatientListItem);
