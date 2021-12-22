/**
 * @file PatientInfo.js
 */

import React, {useMemo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindModelActionCreators} from 'vivy';

// Components
import ModuleLoading from 'components/module/loading/ModuleLoading';
import PatientForm from './PatientForm';
import StepAction from 'components/StepAction';

// Statics
import {ApiStatus} from 'vivy-api';

// Styles
import './PatientInfo.scss';

const PatientInfo = ({
    match, getPatientInfoStatus,
    pushRoute, getPatientInfo, updatePatientInfo, updatePatientStep
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
        return getPatientInfoStatus !== ApiStatus.SUCCESS;
    }, [
        getPatientInfoStatus
    ]);

    /**
     * 获取数据
     * @type {function(): *}
     */
    const loadData = useCallback(() => {
        patientId ?
            getPatientInfo?.({
                id: patientId
            })
            :
            pushRoute?.({
                route: '/app/patient-list'
            });
    }, [
        patientId,
        getPatientInfo, pushRoute
    ]);

    /**
     * 保存到后端
     * @type {function(): *}
     */
    const save = useCallback(() => {
        updatePatientInfo?.({
            id: patientId,
            callback: () => pushRoute?.({
                route: `/app/patient/analgesia/${patientId}`
            })
        });
    }, [
        patientId,
        updatePatientInfo, pushRoute
    ]);

    /**
     * 更新 step
     */
    useEffect(() => {
        updatePatientStep?.({
            activatedStep: 0
        });
    }, [
        updatePatientStep
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
    getPatientInfoStatus: PropTypes.string,

    pushRoute: PropTypes.func,
    getPatientInfo: PropTypes.func,
    updatePatientInfo: PropTypes.func,
    updatePatientStep: PropTypes.func

};

export default connect(state => ({
    getPatientInfoStatus: state.apiStatus.patientInfo?.getPatientInfo
}), dispatch => bindModelActionCreators({
    pushRoute: 'route/push',
    getPatientInfo: 'patientInfo/getPatientInfo',
    updatePatientInfo: 'patientInfo/updatePatientInfo',
    updatePatientStep: 'editPatient/updatePatientStep'
}, dispatch))(PatientInfo);
