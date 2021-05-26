/**
 * @file PatientInfo.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';
import * as patientEditorActions from 'modules/PatientEditor/reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

// Components
import ModuleLoading from 'components/module/loading/ModuleLoading';
import PatientForm from './PatientForm';
import StepAction from 'components/StepAction';

// Styles
import './PatientInfo.scss';

const PatientInfo = ({
    match, getActionType,
    updatePatientStep, getPatientInfo, updatePatientInfo, routerPush
}) => {

    const

        /**
         * 从路由 params 中取出 patientId
         */
        patientId = useMemo(() =>
            match.params.id, [
            match.params.id
        ]),

        /**
         * 获取数据
         * @type {function(): *}
         */
        loadData = useCallback(() =>
            patientId ?
                getPatientInfo?.(patientId)
                :
                routerPush?.('/app/patient-list'), [
            patientId, getPatientInfo,
            routerPush
        ]),

        /**
         * 保存到后端
         * @type {function(): *}
         */
        save = useCallback(() =>
            updatePatientInfo?.(patientId, () =>
                routerPush?.(`/app/patient/analgesia/${patientId}`)
            ), [
            patientId, updatePatientInfo,
            routerPush
        ]);

    /**
     * 更新 step
     */
    useEffect(() =>
        updatePatientStep?.(0), [
        updatePatientStep
    ]);

    /**
     * patientId 改变时，加载新数据
     */
    useEffect(() =>
        loadData(), [
        patientId,
        loadData
    ]);

    return (
        <div className="patient-info">
            <ModuleLoading loading={getActionType !== actionTypes.GET_PATIENT_INFO_SUCCESS}>

                <PatientForm patientId={patientId}/>

                <StepAction isFirst={true}
                            onNext={save}/>

            </ModuleLoading>
        </div>
    );

};

PatientInfo.propTypes = {

    match: PropTypes.object,

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
    updatePatientStep: patientEditorActions.updatePatientStep,
    getPatientInfo: patientEditorActions.getPatientInfo,
    updatePatientInfo: patientEditorActions.updatePatientInfo
}, dispatch))(PatientInfo);
