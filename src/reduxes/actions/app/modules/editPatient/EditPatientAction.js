/**
 * @file EditPatientAction.js
 */

import * as actionTypes from 'reduxes/actionTypes';

/**
 * 上一步
 * @returns {function(*): *}
 */
export const patientStepPrev = () => dispatch => dispatch({
    type: actionTypes.PATIENT_STEP_PREV
});

/**
 * 下一步
 * @returns {function(*): *}
 */
export const patientStepNext = () => dispatch => dispatch({
    type: actionTypes.PATIENT_STEP_NEXT
});

/**
 * 跳转到第几步
 * @param activatedStep
 * @returns {function(*): *}
 */
export const updatePatientStep = activatedStep => dispatch => dispatch({
    type: actionTypes.PATIENT_STEP_UPDATE,
    activatedStep
});

/**
 * 重置数据
 * @returns {function(*): *}
 */
export const resetPatientData = () => dispatch => dispatch({
    type: actionTypes.RESET_DATA
});
