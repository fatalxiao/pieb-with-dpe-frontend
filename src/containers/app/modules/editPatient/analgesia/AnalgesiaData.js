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
import AnchorButton from 'alcedo-ui/AnchorButton';
import ModuleLoading from 'components/module/loading/ModuleLoading';
import StepAction from 'components/StepAction';
import AnalgesiaTable from './AnalgesiaTable';

// Styles
import 'scss/containers/app/modules/editPatient/analgesiaData/AnalgesiaData.scss';

const AnalgesiaData = ({
    match, getActionType,
    routerPush, getPatientInfo, getAnalgesiaData,
    appendTimePoint, updatePatientStep, createOrUpdateAnalgesiaData
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
            {
                getActionType !== actionTypes.GET_ANALGESIA_SUCCESS ?
                    <ModuleLoading/>
                    :
                    <div>
                        <AnalgesiaTable patientId={patientId}/>
                        <AnchorButton className="append-time-point-button"
                                      value="Append Time Point"
                                      onClick={appendTimePoint}>
                            <i className="icon-chevron-thin-down down-icon"></i>
                        </AnchorButton>
                        <StepAction onPrev={prevStep}
                                    onNext={save}/>
                    </div>
            }
        </div>
    );

};

AnalgesiaData.propTypes = {

    match: PropTypes.object,
    getActionType: PropTypes.string,

    routerPush: PropTypes.func,
    appendTimePoint: PropTypes.func,
    updatePatientStep: PropTypes.func,
    getPatientInfo: PropTypes.func,
    getAnalgesiaData: PropTypes.func,
    createOrUpdateAnalgesiaData: PropTypes.func

};

export default connect(state => ({
    getActionType: state.analgesia.getActionType
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush,
    appendTimePoint: actions.appendTimePoint,
    updatePatientStep: actions.updatePatientStep,
    getPatientInfo: actions.getPatientInfo,
    getAnalgesiaData: actions.getAnalgesiaData,
    createOrUpdateAnalgesiaData: actions.createOrUpdateAnalgesiaData
}, dispatch))(AnalgesiaData);
