/**
 * @file PatientInfo.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import ModuleLoading from 'components/module/loading/ModuleLoading';
import PatientForm from './PatientForm';
import StepAction from 'components/StepAction';

// Styles
import './PatientInfo.scss';

const PatientInfo = ({
    match, getActionType,
    dispatch
}) => {

    /**
     * 从路由 params 中取出 patientId
     */
    const patientId = useMemo(() => {
        return match.params.id;
    }, [
        match.params.id
    ]);

    /**
     * 是否正在加载数据
     * @type {boolean}
     */
    const loading = useMemo(() => {
        return getActionType !== 'patientInfo/getPatientInfoSuccess';
    }, [
        getActionType
    ]);

    /**
     * 获取数据
     * @type {function(): *}
     */
    const loadData = useCallback(() => {
        patientId ?
            dispatch?.({
                type: 'patientInfo/getPatientInfo',
                id: patientId
            })
            :
            dispatch?.({
                type: 'route/push',
                route: '/app/patient-list'
            });
    }, [
        patientId,
        dispatch
    ]);

    /**
     * 保存到后端
     * @type {function(): *}
     */
    const save = useCallback(() => {
        dispatch?.({
            type: 'patientInfo/updatePatientInfo',
            id: patientId,
            callback: () => dispatch?.({
                type: 'route/push',
                route: `/app/patient/analgesia/${patientId}`
            })
        });
    }, [
        patientId,
        dispatch
    ]);

    /**
     * 更新 step
     */
    useEffect(() => {
        dispatch?.({
            type: 'editPatient/updatePatientStep',
            activatedStep: 0
        });
    }, [
        dispatch
    ]);

    /**
     * 加载新数据
     */
    useEffect(() => {
        loadData();
    }, [
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

    dispatch: PropTypes.func

};

export default connect(state => ({
    getActionType: state.patientInfo.getActionType
}))(PatientInfo);
