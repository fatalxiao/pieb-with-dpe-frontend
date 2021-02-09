/**
 * @file PatientsReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Vendors
import cloneDeep from 'lodash/cloneDeep';

const initialState = {

    list: [],

    getActionType: '',
    getFullActionType: '',
    enableActionType: '',
    disableActionType: ''

};

function patients(state = initialState, action) {
    switch (action.type) {

        /**
         * 获取用于表格的 patients 数据
         */
        case actionTypes.GET_PATIENTS_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.GET_PATIENTS_REQUEST
            };
        }
        case actionTypes.GET_PATIENTS_SUCCESS: {
            return {
                ...state,
                list: action.responseData,
                getActionType: actionTypes.GET_PATIENTS_SUCCESS
            };
        }
        case actionTypes.GET_PATIENTS_FAILURE: {
            return {
                ...state,
                list: [],
                getActionType: actionTypes.GET_PATIENTS_FAILURE
            };
        }

        /**
         * 获取完整的 patients 数据
         */
        case actionTypes.GET_FULL_PATIENTS_REQUEST: {
            return {
                ...state,
                getFullActionType: actionTypes.GET_FULL_PATIENTS_REQUEST
            };
        }
        case actionTypes.GET_FULL_PATIENTS_SUCCESS: {
            return {
                ...state,
                getFullActionType: actionTypes.GET_FULL_PATIENTS_SUCCESS
            };
        }
        case actionTypes.GET_FULL_PATIENTS_FAILURE: {
            return {
                ...state,
                getFullActionType: actionTypes.GET_FULL_PATIENTS_FAILURE
            };
        }

        /**
         * 更新 patient name
         */
        case actionTypes.UPDATE_PATIENT_NAME_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.UPDATE_PATIENT_NAME_REQUEST
            };
        }
        case actionTypes.UPDATE_PATIENT_NAME_SUCCESS: {

            const nextState = {
                    ...state,
                    getActionType: actionTypes.UPDATE_PATIENT_NAME_SUCCESS
                },

                list = [...state.list],
                index = list.findIndex(item => item.id === action.id);

            if (index === -1) {
                return nextState;
            }

            list[index] = {
                ...list[index],
                name: action.name
            };

            return {
                ...nextState,
                list
            };

        }
        case actionTypes.UPDATE_PATIENT_NAME_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.UPDATE_PATIENT_NAME_FAILURE
            };
        }

        /**
         * 更新 patient group
         */
        case actionTypes.UPDATE_PATIENT_GROUP_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.UPDATE_PATIENT_GROUP_REQUEST
            };
        }
        case actionTypes.UPDATE_PATIENT_GROUP_SUCCESS: {

            const nextState = {
                    ...state,
                    getActionType: actionTypes.UPDATE_PATIENT_GROUP_SUCCESS
                },

                list = [...state.list],
                index = list.findIndex(item => item?.id === action.id);

            if (index === -1) {
                return nextState;
            }

            list[index] = {
                ...list[index],
                group: action.group,
                groupId: action.group.id
            };

            return {
                ...nextState,
                list
            };

        }
        case actionTypes.UPDATE_PATIENT_GROUP_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.UPDATE_PATIENT_GROUP_FAILURE
            };
        }

        /**
         * 启用 patient
         */
        case actionTypes.ENABLE_PATIENT_REQUEST: {
            return {
                ...state,
                enableActionType: actionTypes.ENABLE_PATIENT_REQUEST
            };
        }
        case actionTypes.ENABLE_PATIENT_SUCCESS: {

            const list = cloneDeep(state.list);
            list.find(item => item.id === action.id).status = 1;

            return {
                ...state,
                list,
                enableActionType: actionTypes.ENABLE_PATIENT_SUCCESS
            };

        }
        case actionTypes.ENABLE_PATIENT_FAILURE: {
            return {
                ...state,
                enableActionType: actionTypes.ENABLE_PATIENT_FAILURE
            };
        }

        /**
         * 禁用 patient
         */
        case actionTypes.DISABLE_PATIENT_REQUEST: {
            return {
                ...state,
                disableActionType: actionTypes.DISABLE_PATIENT_REQUEST
            };
        }
        case actionTypes.DISABLE_PATIENT_SUCCESS: {

            const list = cloneDeep(state.list);
            list.find(item => item.id === action.id).status = 0;

            return {
                ...state,
                list,
                disableActionType: actionTypes.DISABLE_PATIENT_SUCCESS
            };

        }
        case actionTypes.DISABLE_PATIENT_FAILURE: {
            return {
                ...state,
                disableActionType: actionTypes.DISABLE_PATIENT_FAILURE
            };
        }

        default:
            return state;

    }
}

export default patients;
