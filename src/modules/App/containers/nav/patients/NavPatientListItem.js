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
import './NavPatientListItem.scss';

const NavPatientListItem = ({
    groupList, patient,
    routerPush
}) => {

    const

        /**
         * 当前 patient 的 ID
         */
        patientId = patient?.id,

        /**
         * 当前 patient 所属 group 的 name
         */
        groupName = useMemo(() => {
            return groupList.find(item => item?.id === patient.groupId)?.name;
        }, [
            groupList, patientId
        ]),

        /**
         * 处理点击，跳转到 patient info 页面
         * @type {function(): *}
         */
        handleClick = useCallback(() => {
            routerPush(`/app/patient/info/${patientId}`);
        }, [
            patientId, routerPush
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

    routerPush: PropTypes.func

};

export default connect(state => ({
    groupList: state.patientGroup.list
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(NavPatientListItem);
