/**
 * @file PatientGroupAction.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Apis
import GroupApi from 'apis/app/common/PatientGroupApi';

/**
 * 获取 Patient Groups
 * @returns {function(*): *}
 */
export const getPatientGroups = () => dispatch => dispatch({
    [actionTypes.CALL_API]: {
        types: [
            actionTypes.GET_GROUPS_REQUEST,
            actionTypes.GET_GROUPS_SUCCESS,
            actionTypes.GET_GROUPS_FAILURE
        ],
        api: GroupApi.getPatientGroups,
        successResMsgDisabled: true
    }
});
