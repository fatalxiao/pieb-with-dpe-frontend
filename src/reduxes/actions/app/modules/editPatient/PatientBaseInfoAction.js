/**
 * @file PatientBaseInfoAction.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Apis
import PatientApi from 'apis/app/modules/patient/PatientApi';

// Actions
import {getPatients} from 'modules/App/reduxes/actions/PatientsAction';

/**
 * 重置 Patient 基础信息
 * @returns {{type: string}}
 */
export const resetPatientBaseInfo = () => ({
    type: actionTypes.RESET_PATIENT_BASE_INFO
});

/**
 * 更新 Patient 基础信息中某个字段的值
 * @param fieldName
 * @param fieldValue
 * @returns {{fieldName: *, type: string, fieldValue: *}}
 */
export const updatePatientBaseInfoField = (fieldName, fieldValue) => ({
    type: actionTypes.UPDATE_PATIENT_BASE_INFO_FIELD,
    fieldName,
    fieldValue
});

/**
 * 创建 patient
 * @param callback
 * @returns {function(*=, *): *}
 */
export const createPatient = callback => (dispatch, getState) => {

    const data = getState().patientBaseInfo.form;

    if (!data.id || !data.name || !data.group) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.CREATE_PATIENT_REQUEST,
                actionTypes.CREATE_PATIENT_SUCCESS,
                actionTypes.CREATE_PATIENT_FAILURE
            ],
            api: PatientApi.createPatient,
            params: {
                id: data.id,
                name: data.name,
                groupId: data.group.id
            },
            successCallback() {
                getPatients()(dispatch);
                callback?.();
            }
        }
    });

};
