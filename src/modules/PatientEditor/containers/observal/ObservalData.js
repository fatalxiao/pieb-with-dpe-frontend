/**
 * @file ObservalData.js
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
import StepAction from 'components/StepAction';
import ObservalForm from './ObservalForm';

const ObservalData = ({
    match, getActionType,
    routerPush, updatePatientStep,
    getPatientInfo, getObservalData, createOrUpdateObservalData
}) => {

    const

        /**
         * 从路由 params 获取 patient ID
         */
        patientId = useMemo(() =>
            match?.params?.patientId, [
            match?.params?.patientId
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
            getObservalData?.(patientId);

        }, [
            patientId,
            routerPush, getPatientInfo, getObservalData
        ]),

        /**
         * 返回上一步
         * @type {function(): *}
         */
        prevStep = useCallback(() =>
            routerPush?.(`/app/patient/analgesia/${patientId}`), [
            patientId,
            routerPush
        ]),

        /**
         * 提交到后端
         * @type {function(): *}
         */
        save = useCallback(() => createOrUpdateObservalData(patientId, () =>
            routerPush?.(`/app/patient-list`)
        ), [
            patientId,
            routerPush, createOrUpdateObservalData
        ]);

    /**
     * 初始化
     */
    useEffect(() => {
        updatePatientStep?.(2);
        loadData();
    }, []);

    return (
        <div className="observal-data">
            <ModuleLoading loading={getActionType !== actionTypes.GET_OBSERVAL_SUCCESS}>

                <ObservalForm patientId={patientId}/>

                <StepAction isLast={true}
                            onPrev={prevStep}
                            onNext={save}/>

            </ModuleLoading>
        </div>
    );

};

ObservalData.propTypes = {

    match: PropTypes.object,
    getActionType: PropTypes.string,

    routerPush: PropTypes.func,
    updatePatientStep: PropTypes.func,
    getPatientInfo: PropTypes.func,
    getObservalData: PropTypes.func,
    createOrUpdateObservalData: PropTypes.func

};

export default connect(state => ({
    getActionType: state.observal.getActionType
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush,
    updatePatientStep: patientEditorActions.updatePatientStep,
    getPatientInfo: patientEditorActions.getPatientInfo,
    getObservalData: patientEditorActions.getObservalData,
    createOrUpdateObservalData: patientEditorActions.createOrUpdateObservalData
}, dispatch))(ObservalData);