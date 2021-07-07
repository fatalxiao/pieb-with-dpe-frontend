/**
 * @file AnalgesiaData.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import ModuleLoading from 'components/module/loading/ModuleLoading';
import StepAction from 'components/StepAction';
import AnalgesiaTable from './AnalgesiaTable';

// Styles
import './AnalgesiaData.scss';

const AnalgesiaData = ({
    match, getActionType,
    dispatch
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
        return getActionType !== 'analgesia/getAnalgesiaSuccess';
    }, [
        getActionType
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
            type: 'analgesia/getAnalgesia',
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
            route: `/app/patient/info/${patientId}`
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
            type: 'analgesia/createOrUpdateAnalgesiaData',
            patientId,
            callback: () => dispatch?.({
                type: 'route/push',
                route: `/app/patient/observal/${patientId}`
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
            activatedStep: 1
        });
    }, [
        dispatch
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

    dispatch: PropTypes.func

};

export default connect(state => ({
    getActionType: state.analgesia.getActionType
}))(AnalgesiaData);
