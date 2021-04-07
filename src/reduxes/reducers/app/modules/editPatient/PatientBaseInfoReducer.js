/**
 * @file PatientBaseInfoReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Vendors
import cloneDeep from 'lodash/cloneDeep';

const

    /**
     * 默认的表单数据
     * @type {{}}
     */
    DEFAULT_FORM = {
        group: null,
        id: '',
        name: ''
    },

    initialState = {
        form: cloneDeep(DEFAULT_FORM),
        actionType: ''
    };

// eslint-disable-next-line complexity,require-jsdoc
function patientBaseInfo(state = initialState, action) {
    switch (action.type) {

        /**
         * 重置 Patient 基础信息
         */
        case actionTypes.RESET_PATIENT_BASE_INFO: {
            return {
                ...state,
                form: cloneDeep(DEFAULT_FORM)
            };
        }

        /**
         * 更新 Patient 基础信息中某个字段的值
         */
        case actionTypes.UPDATE_PATIENT_BASE_INFO_FIELD: {

            const form = cloneDeep(state.form);

            form[action.fieldName] = action.fieldValue;

            return {
                ...state,
                form
            };

        }

        /**
         * 创建 patient
         */
        case actionTypes.CREATE_PATIENT_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.CREATE_PATIENT_REQUEST
            };
        }
        case actionTypes.CREATE_PATIENT_SUCCESS: {
            return {
                ...state,
                actionType: actionTypes.CREATE_PATIENT_SUCCESS
            };
        }
        case actionTypes.CREATE_PATIENT_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.CREATE_PATIENT_FAILURE
            };
        }

        default:
            return state;

    }
}

export default patientBaseInfo;
