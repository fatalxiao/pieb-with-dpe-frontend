/**
 * @file PatientGroupReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    list: []
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
                list: action.responseData,
                actionType: actionTypes.GET_PATIENT_GROUPS_SUCCESS
            };
        }
        case actionTypes.GET_PATIENT_GROUPS_FAILURE: {
            return {
                ...state,
                list: [],
                actionType: actionTypes.GET_PATIENT_GROUPS_FAILURE
            };
        }

        default:
            return state;

    }
}

export default patientGroup;