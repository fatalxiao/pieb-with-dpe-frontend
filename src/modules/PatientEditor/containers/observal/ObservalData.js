/**
 * @file ObservalData.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import ModuleLoading from 'components/module/loading/ModuleLoading';
import StepAction from 'components/StepAction';
import ObservalForm from './ObservalForm';

// Statics
import {ApiStatus} from 'vivy-api';

const ObservalData = ({
    match, getObservalDataStatus,
    pushRoute, getPatientInfo, getObservalData, createOrUpdateObservalData, updatePatientStep
}) => {

    /**
     * 从路由 params 获取 patient ID
     */
    const patientId = match?.params?.patientId;

    /**
     * 是否正在加载数据
     * @type {boolean}
     */
    const loading = useMemo(() => {
        return getObservalDataStatus !== ApiStatus.SUCCESS;
    }, [
        getObservalDataStatus
    ]);

    /**
     * 加载数据
     * @type {Function}
     */
    const loadData = useCallback(() => {

        if (!patientId) {
            pushRoute?.({
                route: '/app/patient-list'
            });
        }

        getPatientInfo?.({
            id: patientId
        });
        getObservalData?.({
            patientId
        });

    }, [
        patientId,
        pushRoute, getPatientInfo, getObservalData
    ]);

    /**
     * 返回上一步
     * @type {function(): *}
     */
    const prevStep = useCallback(() => {
        pushRoute?.({
            route: `/app/patient/analgesia/${patientId}`
        });
    }, [
        patientId,
        pushRoute
    ]);

    /**
     * 提交到后端
     * @type {function(): *}
     */
    const save = useCallback(() => {
        createOrUpdateObservalData?.({
            patientId,
            callback: () => pushRoute?.({
                route: '/app/patient-list'
            })
        });
    }, [
        patientId,
        createOrUpdateObservalData, pushRoute
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
        updatePatientStep?.({
            activatedStep: 2
        });
    }, [
        updatePatientStep
    ]);

    return (
        <div className="observal-data">
            <ModuleLoading loading={loading}>

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
    getObservalDataStatus: PropTypes.string,

    pushRoute: PropTypes.func,
    getPatientInfo: PropTypes.func,
    getObservalData: PropTypes.func,
    createOrUpdateObservalData: PropTypes.func,
    updatePatientStep: PropTypes.func

};

export default connect(state => ({
    getObservalDataStatus: state.apiStatus.observal?.getObservalData
}), dispatch => bindModelActionCreators({
    pushRoute: 'route/push',
    getPatientInfo: 'patientInfo/getPatientInfo',
    getObservalData: 'observal/getObservalData',
    createOrUpdateObservalData: 'observal/createOrUpdateObservalData',
    updatePatientStep: 'editPatient/updatePatientStep'
}, dispatch))(ObservalData);
