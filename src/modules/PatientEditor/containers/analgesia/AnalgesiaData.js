/**
 * @file AnalgesiaData.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import ModuleLoading from 'components/module/loading/ModuleLoading';
import StepAction from 'components/StepAction';
import AnalgesiaTable from './AnalgesiaTable';

// Statics
import {ApiStatus} from 'vivy-api';

// Styles
import './AnalgesiaData.scss';

const AnalgesiaData = ({
    match, getAnalgesiaStatus,
    pushRoute, getPatientInfo, getAnalgesia, createOrUpdateAnalgesiaData, updatePatientStep
}) => {

    /**
     * 从路由 params 中取出的 patient ID
     */
    const patientId = match.params?.patientId;

    /**
     * 是否正在加载数据
     * @type {boolean}
     */
    const loading = useMemo(() => {
        return getAnalgesiaStatus !== ApiStatus.SUCCESS;
    }, [
        getAnalgesiaStatus
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
        getAnalgesia?.({
            patientId
        });

    }, [
        patientId,
        pushRoute, getPatientInfo, getAnalgesia
    ]);

    /**
     * 返回上一步
     * @type {function(): *}
     */
    const prevStep = useCallback(() => {
        pushRoute?.({
            route: `/app/patient/info/${patientId}`
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
        createOrUpdateAnalgesiaData?.({
            patientId,
            callback: () => pushRoute?.({
                route: `/app/patient/observal/${patientId}`
            })
        });
    }, [
        patientId,
        createOrUpdateAnalgesiaData, pushRoute
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
            activatedStep: 1
        });
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
    getAnalgesiaStatus: PropTypes.string,

    pushRoute: PropTypes.func,
    getPatientInfo: PropTypes.func,
    getAnalgesia: PropTypes.func,
    createOrUpdateAnalgesiaData: PropTypes.func,
    updatePatientStep: PropTypes.func

};

export default connect(state => ({
    getAnalgesiaStatus: state.apiStatus.analgesia?.getAnalgesia
}), dispatch => bindModelActionCreators({
    pushRoute: 'route/push',
    getPatientInfo: 'patientInfo/getPatientInfo',
    getAnalgesia: 'analgesia/getAnalgesia',
    createOrUpdateAnalgesiaData: 'analgesia/createOrUpdateAnalgesiaData',
    updatePatientStep: 'editPatient/updatePatientStep'
}, dispatch))(AnalgesiaData);
