/**
 * @file ObservalData.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import ModuleLoading from 'components/module/loading/ModuleLoading';
import StepAction from 'components/StepAction';
import ObservalForm from './ObservalForm';

// Statics
import {ApiStatus} from 'vivy-api';

const ObservalData = ({
    match, getObservalDataStatus,
    dispatch
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
            dispatch?.({
                type: 'route/push',
                route: '/app/patient-list'
            });
        }

        dispatch?.({
            type: 'patientInfo/getPatientInfo',
            id: patientId
        });
        dispatch?.({
            type: 'observal/getObservalData',
            patientId
        });

    }, [
        patientId,
        dispatch
    ]);

    /**
     * 返回上一步
     * @type {function(): *}
     */
    const prevStep = useCallback(() => {
        dispatch?.({
            type: 'route/push',
            route: `/app/patient/analgesia/${patientId}`
        });
    }, [
        patientId,
        dispatch
    ]);

    /**
     * 提交到后端
     * @type {function(): *}
     */
    const save = useCallback(() => {
        dispatch?.({
            type: 'observal/createOrUpdateObservalData',
            patientId,
            callback: () => dispatch?.({
                type: 'route/push',
                route: '/app/patient-list'
            })
        });
    }, [
        patientId,
        dispatch
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
        dispatch?.({
            type: 'editPatient/updatePatientStep',
            activatedStep: 2
        });
    }, [
        dispatch
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

    dispatch: PropTypes.func

};

export default connect(state => ({
    getObservalDataStatus: state.apiStatus.observal?.getObservalData
}))(ObservalData);
