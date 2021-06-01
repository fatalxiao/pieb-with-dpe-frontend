/**
 * @file PatientBaseInfoAction.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';
import * as appActionTypes from 'modules/App/reduxes/actionTypes';

// Apis
import PatientApi from 'modules/App/apis/PatientApi';

// Actions
import {getPatients} from 'modules/App/reduxes/actions/PatientsAction';

/**
 * 重置 Patient 基础信息
 * @returns {{type: string}}
 */
export const resetPatientBaseInfo = () => ({
    type: appActionTypes.RESET_PATIENT_BASE_INFO
});

/**
 * 更新 Patient 基础信息中某个字段的值
 * @param fieldName
 * @param fieldValue
 * @returns {{fieldName: *, type: string, fieldValue: *}}
 */
export const updatePatientBaseInfoField = (fieldName, fieldValue) => ({
    type: appActionTypes.UPDATE_PATIENT_BASE_INFO_FIELD,
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
        [CALL_API]: {
            types: [
                appActionTypes.CREATE_PATIENT_REQUEST,
                appActionTypes.CREATE_PATIENT_SUCCESS,
                appActionTypes.CREATE_PATIENT_FAILURE
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
