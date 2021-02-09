/**
 * @file ObservalAction.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Apis
import ObservalApi from 'apis/app/modules/patient/ObservalApi';

/**
 * 更新 Observal 数据的某个字段
 * @param fieldName
 * @param fieldValue
 * @returns {{fieldName: *, type: string, fieldValue: *}}
 */
export const updateObservalDataField = (fieldName, fieldValue) => ({
    type: actionTypes.UPDATE_OBSERVAL_FIELD,
    fieldName,
    fieldValue
});

/**
 * 获取某个 patientId 的 Observal 数据
 * @param patientId
 * @returns {function(*): *}
 */
export const getObservalData = patientId => dispatch => {

    if (!patientId) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_OBSERVAL_REQUEST,
                actionTypes.GET_OBSERVAL_SUCCESS,
                actionTypes.GET_OBSERVAL_FAILURE
            ],
            api: ObservalApi.getObservalDataByPatientId,
            params: {patientId},
            successResMsgDisabled: true
        }
    });

};

/**
 * 创建或更新 Observal 数据
 * @param patientId
 * @param callback
 * @param successResMsgDisabled
 * @param failureResMsgDisabled
 * @returns {function(*, *): *}
 */
export const createOrUpdateObservalData = (
    patientId, callback, successResMsgDisabled, failureResMsgDisabled = false
) => (dispatch, getState) => {

    const observalData = getState().observal.form;

    if (!patientId || !observalData) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPDATE_OBSERVAL_REQUEST,
                actionTypes.UPDATE_OBSERVAL_SUCCESS,
                actionTypes.UPDATE_OBSERVAL_FAILURE
            ],
            api: ObservalApi.createOrUpdateObservalData,
            params: {
                patientId,
                observalData
            },
            successResMsgDisabled,
            failureResMsgDisabled,
            successCallback() {
                callback?.();
            }
        }
    });

};
