/**
 * @file PatientInfoAction.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Apis
import PatientApi from 'apis/app/modules/patient/PatientApi';

// Actions
import {resetPatientData} from 'reduxes/actions/app/modules/editPatient/EditPatientAction';

/**
 * 获取妊娠天数
 * @param weeks
 * @param days
 * @returns {number}
 */
export function getGestationalDays(weeks, days) {

    let result = 0;

    if (weeks && !isNaN(weeks)) {
        result += +weeks * 7;
    }

    if (days && !isNaN(days)) {
        result += +days;
    }

    return result;

}

/**
 * 更新 Patient 信息中某个字段的值
 * @param fieldName
 * @param fieldValue
 * @returns {{fieldName: *, type: string, fieldValue: *}}
 */
export const updatePatientInfoField = (fieldName, fieldValue) => ({
    type: actionTypes.UPDATE_PATIENT_INFO_FIELD,
    fieldName,
    fieldValue
});

/**
 * 获取 Patient 信息
 * @param id
 * @returns {function(*=): *}
 */
export const getPatientInfo = id => dispatch => {

    if (!id) {
        return;
    }

    resetPatientData()(dispatch);

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_PATIENT_INFO_REQUEST,
                actionTypes.GET_PATIENT_INFO_SUCCESS,
                actionTypes.GET_PATIENT_INFO_FAILURE
            ],
            api: PatientApi.getPatientById,
            params: {id},
            successResMsgDisabled: true
        }
    });

};

/**
 * 更新 Patient 信息
 * @param id
 * @param callback
 * @param successResMsgDisabled
 * @returns {function(*, *): *}
 */
export const updatePatientInfo = (id, callback, successResMsgDisabled) => (dispatch, getState) => {

    const data = getState().patientInfo.form;

    if (!id) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPDATE_PATIENT_INFO_REQUEST,
                actionTypes.UPDATE_PATIENT_INFO_SUCCESS,
                actionTypes.UPDATE_PATIENT_INFO_FAILURE
            ],
            api: PatientApi.createOrUpdatePatient,
            params: {
                id,
                age: data.age,
                gestationalDays: getGestationalDays(data.gestationalDaysWeeks, data.gestationalDaysDays),
                height: data.height,
                weight: data.weight,
                heartRate: data.heartRate,
                initialVasScore: data.initialVasScore,
                systolicBloodPressure: data.systolicBloodPressure,
                diastolicBloodPressure: data.diastolicBloodPressure,
                fetalHeartRate: data.fetalHeartRate,
                pulseOxygenSaturation: data.pulseOxygenSaturation,
                cervicalDilationAtTimeOfEA: data.cervicalDilationAtTimeOfEA,
                hasOxytocinAtTimeOfEA: data.hasOxytocinAtTimeOfEA,
                hasInduction: data.hasInduction,
                description: data.description
            },
            successResMsgDisabled,
            successCallback() {
                callback?.();
            }
        }
    });

};
