/**
 * @file PatientGroupReducer.js
 */

import * as actionTypes from '../actionTypes';

const initialState = {

    /**
     * patient groups 数据
     */
    list: [],

    /**
     * 获取 patient groups 数据的 action type
     */
    actionType: null

};

// eslint-disable-next-line require-jsdoc
function patientGroup(state = initialState, action) {
    switch (action.type) {

        /**
         * 获取 patient groups 数据
         */
        case actionTypes.GET_PATIENT_GROUPS_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.GET_PATIENT_GROUPS_REQUEST
            };
        }
        case actionTypes.GET_PATIENT_GROUPS_SUCCESS: {
            return {
                ...state,
                actionType: actionTypes.GET_PATIENT_GROUPS_SUCCESS,
                list: action.responseData
            };
        }
        case actionTypes.GET_PATIENT_GROUPS_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.GET_PATIENT_GROUPS_FAILURE,
                list: []
            };
        }

        default:
            return state;

    }
}

export default patientGroup;
