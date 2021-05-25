/**
 * @file PatientsAction.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';
import * as actionTypes from '../actionTypes/PatientsActionType';

// Apis
import PatientApi from 'apis/app/common/PatientApi';

/**
 * 获取用于列表的 patients 数据
 * @returns {function(*): *}
 */
export const getPatients = () => dispatch => dispatch({
    [CALL_API]: {
        types: [
            actionTypes.GET_PATIENTS_REQUEST,
            actionTypes.GET_PATIENTS_SUCCESS,
            actionTypes.GET_PATIENTS_FAILURE
        ],
        api: PatientApi.getPatients,
        successResMsgDisabled: true
    }
});

/**
 * 获取完整的 patients 数据
 * @returns {function(*): *}
 */
export const getFullPatients = () => dispatch => dispatch({
    [CALL_API]: {
        types: [
            actionTypes.GET_FULL_PATIENTS_REQUEST,
            actionTypes.GET_FULL_PATIENTS_SUCCESS,
            actionTypes.GET_FULL_PATIENTS_FAILURE
        ],
        api: PatientApi.getFullPatients,
        successResMsgDisabled: true
    }
});

/**
 * 更新某个 id 的 patient name
 * @param id
 * @param name
 * @returns {function(*): *}
 */
export const updatePatientName = (id, name) => dispatch => {

    if (!id || !name) {
        return;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                actionTypes.UPDATE_PATIENT_NAME_REQUEST,
                actionTypes.UPDATE_PATIENT_NAME_SUCCESS,
                actionTypes.UPDATE_PATIENT_NAME_FAILURE
            ],
            api: PatientApi.updatePatientName,
            params: {
                id,
                name
            },
            successResMsgDisabled: true
        },
        id,
        name
    });

};

/**
 * 更新某个 id 的 patient group
 * @param id
 * @param group
 * @returns {function(*): *}
 */
export const updatePatientGroup = (id, group) => dispatch => {

    if (!id || !group) {
        return;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                actionTypes.UPDATE_PATIENT_GROUP_REQUEST,
                actionTypes.UPDATE_PATIENT_GROUP_SUCCESS,
                actionTypes.UPDATE_PATIENT_GROUP_FAILURE
            ],
            api: PatientApi.updatePatientGroup,
            params: {
                id,
                groupId: group.id
            },
            successResMsgDisabled: true
        },
        id,
        group
    });

};

/**
 * 启用 patient
 * @param id
 * @returns {function(*): *}
 */
export const enablePatient = id => dispatch => {

    if (!id) {
        return;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                actionTypes.ENABLE_PATIENT_REQUEST,
                actionTypes.ENABLE_PATIENT_SUCCESS,
                actionTypes.ENABLE_PATIENT_FAILURE
            ],
            api: PatientApi.enablePatient,
            params: {
                id
            },
            successResMsgDisabled: true
        },
        id
    });

};

/**
 * 禁用 patient
 * @param id
 * @returns {function(*): *}
 */
export const disablePatient = id => dispatch => {

    if (!id) {
        return;
    }

    return dispatch({
        [CALL_API]: {
            types: [
                actionTypes.DISABLE_PATIENT_REQUEST,
                actionTypes.DISABLE_PATIENT_SUCCESS,
                actionTypes.DISABLE_PATIENT_FAILURE
            ],
            api: PatientApi.disablePatient,
            params: {
                id
            },
            successResMsgDisabled: true
        },
        id
    });

};
