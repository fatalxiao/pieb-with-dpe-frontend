/**
 * @file PatientBaseInfoReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Vendors
import cloneDeep from 'lodash/cloneDeep';

const

    /**
     * 默认的表单信息
     * @type {{}}
     */
    DEFAULT_FORM = {
        group: null,
        id: '',
        name: '',
        age: '',
        gestationalDaysWeeks: '',
        gestationalDaysDays: '',
        height: '',
        weight: '',
        heartRate: '',
        initialVasScore: '',
        systolicBloodPressure: '',
        diastolicBloodPressure: '',
        fetalHeartRate: '',
        pulseOxygenSaturation: '',
        cervicalDilationAtTimeOfEA: '',
        hasOxytocinAtTimeOfEA: false,
        hasInduction: false,
        status: 1,
        description: ''
    },

    initialState = {
        form: cloneDeep(DEFAULT_FORM),
        getActionType: '',
        updateActionType: ''
    };

// eslint-disable-next-line complexity, require-jsdoc
function patientInfo(state = initialState, action) {
    switch (action.type) {

        /**
         * 重置数据
         */
        case actionTypes.RESET_DATA: {
            return {
                ...state,
                form: cloneDeep(DEFAULT_FORM)
            };
        }

        /**
         * 更新 Patient 信息中某个字段的值
         */
        case actionTypes.UPDATE_PATIENT_INFO_FIELD: {

            const form = cloneDeep(state.form);

            form[action.fieldName] = action.fieldValue;

            return {
                ...state,
                form
            };

        }

        /**
         * 获取 Patient 信息
         */
        case actionTypes.GET_PATIENT_INFO_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.GET_PATIENT_INFO_REQUEST
            };
        }
        case actionTypes.GET_PATIENT_INFO_SUCCESS: {

            const form = action.responseData || cloneDeep(DEFAULT_FORM);

            if (form.gestationalDays && !isNaN(form.gestationalDays)) {
                form.gestationalDaysWeeks = ~~(form.gestationalDays / 7);
                form.gestationalDaysDays = form.gestationalDays % 7;
            }

            return {
                ...state,
                form,
                getActionType: actionTypes.GET_PATIENT_INFO_SUCCESS
            };

        }
        case actionTypes.GET_PATIENT_INFO_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.GET_PATIENT_INFO_FAILURE
            };
        }

        /**
         * 更新 Patient 信息
         */
        case actionTypes.UPDATE_PATIENT_INFO_REQUEST: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_PATIENT_INFO_REQUEST
            };
        }
        case actionTypes.UPDATE_PATIENT_INFO_SUCCESS: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_PATIENT_INFO_SUCCESS
            };
        }
        case actionTypes.UPDATE_PATIENT_INFO_FAILURE: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_PATIENT_INFO_FAILURE
            };
        }

        default:
            return state;

    }
}

export default patientInfo;
