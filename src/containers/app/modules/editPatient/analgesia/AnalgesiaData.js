/**
 * @file AnalgesiaData.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

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
        patientId = useMemo(() => match.params.patientId, [match.params.patientId]),

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
                routerPush?.(`/app/patient/info/${patientId}`),
            [patientId, routerPush]
        ),

        /**
         * 提交到后端
         * @type {function(): *}
         */
        save = useCallback(() => createOrUpdateAnalgesiaData?.(patientId, () =>
            routerPush(`/app/patient/observal/${patientId}`)
        ), [patientId, routerPush, createOrUpdateAnalgesiaData]);

    /**
     * 初始化
     */
    useEffect(() => {
        updatePatientStep(1);
        loadData();
    }, []);

    return (
        <div className="analgesia-data">
            <ModuleLoading loading={getActionType !== actionTypes.GET_ANALGESIA_SUCCESS}>

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
    updatePatientStep: actions.updatePatientStep,
    getPatientInfo: actions.getPatientInfo,
    getAnalgesiaData: actions.getAnalgesiaData,
    createOrUpdateAnalgesiaData: actions.createOrUpdateAnalgesiaData
}, dispatch))(AnalgesiaData);
