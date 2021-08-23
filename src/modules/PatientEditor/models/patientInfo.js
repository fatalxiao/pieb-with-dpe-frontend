/**
 * @file patientInfo.js
 */

// Apis
import {getPatientById, createOrUpdatePatient} from 'modules/App/apis/PatientApi';

/**
 * 默认的表单信息
 * @type {{}}
 */
const DEFAULT_FORM = {
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
};

/**
 * 获取妊娠天数
 * @param weeks
 * @param days
 * @returns {number}
 */
export function getGestationalDays(weeks, days) {

    let result = 0;

    if (weeks && !isNaN(weeks)) {
        result += +weeks * 7;
    }

    if (days && !isNaN(days)) {
        result += +days;
    }

    return result;

}

export default {
    nameSpace: 'patientInfo',
    state: {

        form: {...DEFAULT_FORM},

        getActionType: null,
        updateActionType: null

    },
    apis: {

        /**
         * 获取 Patient 信息
         * @param id
         * @returns {(function(*): void)|*}
         */
        getPatientInfo: ({id}) => (dispatchApi, dispatch) => {

            if (!id) {
                return;
            }

            dispatch({
                type: 'resetData'
            });

            dispatchApi({
                api: getPatientById,
                params: {id},
                successResMsgDisabled: true
            });

        },

        /**
         * 更新 Patient 信息
         * @param id
         * @param callback
         * @param successResMsgDisabled
         * @returns {(function(*, *): void)|*}
         */
        updatePatientInfo: ({
            id,
            callback,
            successResMsgDisabled
        }) => (dispatchApi, dispatch, getState) => {

            const data = getState().patientInfo.form;

            if (!id) {
                return;
            }

            dispatchApi({
                api: createOrUpdatePatient,
                params: {
                    id,
                    age: data.age,
                    gestationalDays: getGestationalDays(data.gestationalDaysWeeks, data.gestationalDaysDays),
                    height: data.height,
                    weight: data.weight,
                    heartRate: data.heartRate,
                    initialVasScore: data.initialVasScore,
                    systolicBloodPressure: data.systolicBloodPressure,
                    diastolicBloodPressure: data.diastolicBloodPressure,
                    fetalHeartRate: data.fetalHeartRate,
                    pulseOxygenSaturation: data.pulseOxygenSaturation,
                    cervicalDilationAtTimeOfEA: data.cervicalDilationAtTimeOfEA,
                    hasOxytocinAtTimeOfEA: data.hasOxytocinAtTimeOfEA,
                    hasInduction: data.hasInduction,
                    description: data.description
                },
                successResMsgDisabled,
                successCallback() {
                    callback?.();
                }
            });

        }

    },
    globalReducers: {

        /**
         * 重置数据
         * @param state
         * @returns {*&{form: {}}}
         */
        resetData: state => {
            return {
                ...state,
                form: {...DEFAULT_FORM}
            };
        }

    },
    reducers: {

        /**
         * 更新 Patient 信息中某个字段的值
         */
        updatePatientInfoField: (state, {fieldName, fieldValue}) => {
            return {
                ...state,
                form: {
                    ...state.form,
                    [fieldName]: fieldValue
                }
            };
        },

        /**
         * 获取 Patient 信息
         * @param state
         * @returns {*&{getActionType: string}}
         */
        getPatientInfoRequest: state => {
            return {
                ...state,
                getActionType: 'patientInfo/getPatientInfoRequest'
            };
        },
        getPatientInfoSuccess: (state, {responseData}) => {

            const form = responseData || {...DEFAULT_FORM};

            if (form.gestationalDays && !isNaN(form.gestationalDays)) {
                form.gestationalDaysWeeks = ~~(form.gestationalDays / 7);
                form.gestationalDaysDays = form.gestationalDays % 7;
            }

            return {
                ...state,
                getActionType: 'patientInfo/getPatientInfoSuccess',
                form
            };

        },
        getPatientInfoFailure: state => {
            return {
                ...state,
                getActionType: 'patientInfo/getPatientInfoFailure'
            };
        },

        /**
         * 更新 Patient 信息
         * @param state
         * @returns {*&{updateActionType: string}}
         */
        updatePatientInfoRequest: state => {
            return {
                ...state,
                updateActionType: 'patientInfo/updatePatientInfoRequest'
            };
        },
        updatePatientInfoSuccess: state => {
            return {
                ...state,
                updateActionType: 'patientInfo/updatePatientInfoSuccess'
            };
        },
        updatePatientInfoFailure: state => {
            return {
                ...state,
                updateActionType: 'patientInfo/updatePatientInfoFailure'
            };
        }

    }
};
