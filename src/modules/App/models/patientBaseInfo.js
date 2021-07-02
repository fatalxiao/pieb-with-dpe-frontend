/**
 * @file patientBaseInfo.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';

// Apis
import PatientApi from 'modules/App/apis/PatientApi';

// Vendors
import cloneDeep from 'lodash/cloneDeep';

/**
 * 默认的表单数据
 * @type {{}}
 */
const DEFAULT_FORM = {
    group: null,
    id: '',
    name: ''
};

export default {
    nameSpace: 'patientBaseInfo',
    state: {
        form: {...DEFAULT_FORM},
        actionType: null
    },
    actions: {

        /**
         * 创建 patient
         * @param callback
         * @returns {function(*, *): *}
         */
        createPatient: ({callback}) => (dispatch, getState) => {

            const data = getState().patientBaseInfo.form;

            if (!data.id || !data.name || !data.group) {
                return;
            }

            return dispatch({
                [CALL_API]: {
                    types: [
                        'patientBaseInfo/createPatientRequest',
                        'patientBaseInfo/createPatientSuccess',
                        'patientBaseInfo/createPatientFailure'
                    ],
                    api: PatientApi.createPatient,
                    params: {
                        id: data.id,
                        name: data.name,
                        groupId: data.group.id
                    },
                    successCallback() {
                        // TODO
                        // getPatients()(dispatch);
                        callback?.();
                    }
                }
            });

        }

    },
    reducers: {

        /**
         * 重置 Patient 基础信息
         * @param state
         * @returns {*&{form: {}}}
         */
        resetPatientBaseInfo: state => {
            return {
                ...state,
                form: {...DEFAULT_FORM}
            };
        },

        /**
         * 更新 Patient 基础信息中某个字段的值
         * @param state
         * @param fieldName
         * @param fieldValue
         * @returns {*&{form}}
         */
        updatePatientBaseInfoField: (state, {fieldName, fieldValue}) => {

            const form = cloneDeep(state.form);

            form[fieldName] = fieldValue;

            return {
                ...state,
                form
            };

        },

        /**
         * 创建 patient
         */
        createPatientRequest: state => {
            return {
                ...state,
                actionType: 'patientBaseInfo/createPatientRequest'
            };
        },
        createPatientSuccess: state => {
            return {
                ...state,
                actionType: 'patientBaseInfo/createPatientSuccess'
            };
        },
        createPatientFailure: state => {
            return {
                ...state,
                actionType: 'patientBaseInfo/createPatientFailure'
            };
        }

    }
};
