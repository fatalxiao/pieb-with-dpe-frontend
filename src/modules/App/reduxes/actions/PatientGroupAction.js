/**
 * @file PatientGroupAction.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';
import * as actionTypes from '../actionTypes/PatientGroupActionType';

// Apis
import GroupApi from 'modules/App/apis/PatientGroupApi';

/**
 * 获取 Patient Groups
 * @returns {function(*): *}
 */
export const getPatientGroups = () => dispatch => dispatch({
    [CALL_API]: {
        types: [
            actionTypes.GET_PATIENT_GROUPS_REQUEST,
            actionTypes.GET_PATIENT_GROUPS_SUCCESS,
            actionTypes.GET_PATIENT_GROUPS_FAILURE
        ],
        api: GroupApi.getPatientGroups,
        successResMsgDisabled: true
    }
});
