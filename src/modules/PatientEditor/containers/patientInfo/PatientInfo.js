/**
 * @file PatientInfo.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Actions
import * as actions from 'reduxes/actions';
import * as patientEditorActions from 'modules/PatientEditor/reduxes/actions';

// Action Types
import * as patientEditorActionTypes from 'modules/PatientEditor/reduxes/actionTypes';

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
        patientId = useMemo(() => {
            return match.params.id;
        }, [
            match.params.id
        ]),

        /**
         * 是否正在加载数据
         * @type {boolean}
         */
        loading = useMemo(() => {
            return getActionType !== patientEditorActionTypes.GET_PATIENT_INFO_SUCCESS;
        }, [
            getActionType
        ]),

        /**
         * 获取数据
         * @type {function(): *}
         */
        loadData = useCallback(() => {
            patientId ?
                getPatientInfo?.(patientId)
                :
                routerPush?.('/app/patient-list');
        }, [
            patientId, getPatientInfo,
            routerPush
        ]),

        /**
         * 保存到后端
         * @type {function(): *}
         */
        save = useCallback(() => {
            updatePatientInfo?.(patientId, () =>
                routerPush?.(`/app/patient/analgesia/${patientId}`)
            );
        }, [
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
            <ModuleLoading loading={loading}>

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
