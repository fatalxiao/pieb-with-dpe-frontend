/**
 * @file AnalgesiaData.js
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
import StepAction from 'components/StepAction';
import AnalgesiaTable from './AnalgesiaTable';

// Styles
import './AnalgesiaData.scss';

const AnalgesiaData = ({
    match, getActionType,
    routerPush, getPatientInfo, getAnalgesiaData,
    updatePatientStep, createOrUpdateAnalgesiaData
}) => {

    const

        /**
         * 从路由 params 中取出的 patient ID
         */
        patientId = useMemo(() =>
            match.params.patientId, [
            match.params.patientId
        ]),

        /**
         * 是否正在加载数据
         * @type {boolean}
         */
        loading = useMemo(() =>
            getActionType !== patientEditorActionTypes.GET_ANALGESIA_SUCCESS, [
            getActionType
        ]),

        /**
         * 加载数据
         * @type {Function}
         */
        loadData = useCallback(() => {

            if (!patientId) {
                routerPush?.('/app/patient-list');
            }

            getPatientInfo?.(patientId);
            getAnalgesiaData?.(patientId);

        }, [
            patientId,
            routerPush, getPatientInfo, getAnalgesiaData
        ]),

        /**
         * 返回上一步
         * @type {function(): *}
         */
        prevStep = useCallback(() =>
            routerPush?.(`/app/patient/info/${patientId}`), [
            patientId,
            routerPush
        ]),

        /**
         * 提交到后端
         * @type {function(): *}
         */
        save = useCallback(() => createOrUpdateAnalgesiaData?.(patientId, () =>
            routerPush(`/app/patient/observal/${patientId}`)
        ), [
            patientId,
            routerPush, createOrUpdateAnalgesiaData
        ]);

    /**
     * 初始加载数据
     */
    useEffect(() => {
        loadData();
    }, [
        loadData
    ]);

    /**
     * 初始更新 step
     */
    useEffect(() => {
        updatePatientStep(1);
    }, [
        updatePatientStep
    ]);

    return (
        <div className="analgesia-data">
            <ModuleLoading loading={loading}>

                <AnalgesiaTable patientId={patientId}/>

                <StepAction onPrev={prevStep}
                            onNext={save}/>

            </ModuleLoading>
        </div>
    );

};

AnalgesiaData.propTypes = {

    match: PropTypes.object,
    getActionType: PropTypes.string,

    routerPush: PropTypes.func,
    updatePatientStep: PropTypes.func,
    getPatientInfo: PropTypes.func,
    getAnalgesiaData: PropTypes.func,
    createOrUpdateAnalgesiaData: PropTypes.func

};

export default connect(state => ({
    getActionType: state.analgesia.getActionType
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush,
    updatePatientStep: patientEditorActions.updatePatientStep,
    getPatientInfo: patientEditorActions.getPatientInfo,
    getAnalgesiaData: patientEditorActions.getAnalgesiaData,
    createOrUpdateAnalgesiaData: patientEditorActions.createOrUpdateAnalgesiaData
}, dispatch))(AnalgesiaData);
