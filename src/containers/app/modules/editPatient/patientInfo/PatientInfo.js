/**
 * @file PatientInfo.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

// Components
import ModuleLoading from 'components/module/loading/ModuleLoading';
import PatientForm from './PatientForm';
import StepAction from 'components/StepAction';

const PatientInfo = ({
    match, getActionType,
    updatePatientStep, getPatientInfo, updatePatientInfo, routerPush
}) => {

    const

        /**
         * 从路由 params 中取出 patientId
         */
        patientId = useMemo(() => match.params.id, [match.params.id]),

        /**
         * 获取数据
         * @type {function(): *}
         */
        loadData = useCallback(() => patientId ?
            getPatientInfo?.(patientId)
            :
            routerPush?.('/app/patient-list'),
            [patientId, getPatientInfo]
        ),

        save = useCallback(() =>
                updatePatientInfo?.(patientId, () =>
                    routerPush?.(`/app/patient/analgesia/${patientId}`)
                ),
            [patientId, updatePatientInfo, routerPush]
        );

    /**
     * 更新 step
     */
    useEffect(() => updatePatientStep?.(0), [updatePatientStep]);

    /**
     * patientId 改变时，加载新数据
     */
    useEffect(() => loadData(), [patientId]);

    return (
        <div className="patient-info">
            {
                getActionType !== actionTypes.GET_PATIENT_INFO_SUCCESS ?
                    <ModuleLoading/>
                    :
                    <div>
                        <PatientForm patientId={patientId}/>
                        <StepAction isFirst={true}
                                    onNext={save}/>
                    </div>
            }
        </div>
    );

};

PatientInfo.propTypes = {

    getActionType: PropTypes.string,

    routerPush: PropTypes.func,
    updatePatientStep: PropTypes.func,
    getPatientInfo: PropTypes.func,
    updatePatientInfo: PropTypes.func

};

export default connect(state => ({
    getActionType: state.patientInfo.getActionType
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush,
    updatePatientStep: actions.updatePatientStep,
    getPatientInfo: actions.getPatientInfo,
    updatePatientInfo: actions.updatePatientInfo
}, dispatch))(PatientInfo);
