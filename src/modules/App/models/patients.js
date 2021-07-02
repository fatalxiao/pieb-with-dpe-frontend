/**
 * @file patients.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';

// Apis
import PatientApi from '../apis/PatientsApi';

// Vendors
import cloneDeep from 'lodash/cloneDeep';

export default {
    nameSpace: 'patients',
    state: {

        list: [],

        getActionType: '',
        getFullActionType: '',
        updatePatientNameActionType: '',
        updatePatientGroupActionType: '',
        enableActionType: '',
        disableActionType: ''

    },
    actions: {

        /**
         * 获取用于表格的 patients 数据
         * @returns {function(*): *}
         */
        getPatients: () => dispatch => dispatch({
            [CALL_API]: {
                types: [
                    'patients/getPatientsRequest',
                    'patients/getPatientsSuccess',
                    'patients/getPatientsFailure'
                ],
                api: PatientApi.getPatients,
                successResMsgDisabled: true
            }
        }),

        /**
         * 获取完整的 patients 数据
         * @returns {function(*): *}
         */
        getFullPatients: () => dispatch => dispatch({
            [CALL_API]: {
                types: [
                    'patients/getFullPatientsRequest',
                    'patients/getFullPatientsSuccess',
                    'patients/getFullPatientsFailure'
                ],
                api: PatientApi.getFullPatients,
                successResMsgDisabled: true
            }
        }),

        /**
         * 更新某个 id 的 patient name
         * @param id
         * @param name
         * @returns {function(*): *}
         */
        updatePatientName: ({id, name}) => dispatch => {

            if (!id || !name) {
                return;
            }

            dispatch({
                [CALL_API]: {
                    types: [
                        'patients/updatePatientNameRequest',
                        'patients/updatePatientNameSuccess',
                        'patients/updatePatientNameFailure'
                    ],
                    api: PatientApi.updatePatientName,
                    params: {
                        id,
                        name
                    },
                    successResMsgDisabled: true
                },
                id,
                name
            });

        },

        /**
         * 更新某个 id 的 patient group
         * @param id
         * @param group
         * @returns {function(*): *}
         */
        updatePatientGroup: ({id, group}) => dispatch => {

            if (!id || !group) {
                return;
            }

            dispatch({
                [CALL_API]: {
                    types: [
                        'patients/updatePatientGroupRequest',
                        'patients/updatePatientGroupSuccess',
                        'patients/updatePatientGroupFailure'
                    ],
                    api: PatientApi.updatePatientGroup,
                    params: {
                        id,
                        groupId: group.id
                    },
                    successResMsgDisabled: true
                },
                id,
                group
            });

        },

        /**
         * 启用 patient
         * @param id
         * @returns {function(*): *}
         */
        enablePatient: ({id}) => dispatch => {

            if (!id) {
                return;
            }

            dispatch({
                [CALL_API]: {
                    types: [
                        'patients/enablePatientRequest',
                        'patients/enablePatientSuccess',
                        'patients/enablePatientFailure'
                    ],
                    api: PatientApi.enablePatient,
                    params: {
                        id
                    },
                    successResMsgDisabled: true
                },
                id
            });

        },

        /**
         * 禁用 patient
         * @param id
         * @returns {function(*): *}
         */
        disablePatient: ({id}) => dispatch => {

            if (!id) {
                return;
            }

            dispatch({
                [CALL_API]: {
                    types: [
                        'patients/disablePatientRequest',
                        'patients/disablePatientSuccess',
                        'patients/disablePatientFailure'
                    ],
                    api: PatientApi.disablePatient,
                    params: {
                        id
                    },
                    successResMsgDisabled: true
                },
                id
            });

        }

    },
    reducers: {

        /**
         * 获取用于表格的 patients 数据
         */
        getPatientsRequest: state => {
            return {
                ...state,
                actionType: 'patients/getPatientsRequest'
            };
        },
        getPatientsSuccess: (state, {responseData}) => {
            return {
                ...state,
                actionType: 'patients/getPatientsSuccess',
                list: responseData
            };
        },
        getPatientsFailure: state => {
            return {
                ...state,
                actionType: 'patients/getPatientsFailure',
                list: []
            };
        },

        /**
         * 获取完整的 patients 数据
         */
        getFullPatientsRequest: state => {
            return {
                ...state,
                actionType: 'patients/getFullPatientsRequest'
            };
        },
        getFullPatientsSuccess: (state, {responseData}) => {
            return {
                ...state,
                actionType: 'patients/getFullPatientsSuccess',
                list: responseData
            };
        },
        getFullPatientsFailure: state => {
            return {
                ...state,
                actionType: 'patients/getFullPatientsFailure',
                list: []
            };
        },

        /**
         * 更新某个 id 的 patient name
         */
        updatePatientNameRequest: state => {
            return {
                ...state,
                updatePatientNameActionType: 'patients/updatePatientNameRequest'
            };
        },
        updatePatientNameSuccess: (state, {id, name}) => {

            const nextState = {
                    ...state,
                    updatePatientNameActionType: 'patients/updatePatientNameSuccess'
                },

                list = [...state.list],
                index = list.findIndex(item => item.id === id);

            if (index === -1) {
                return nextState;
            }

            list[index] = {
                ...list[index],
                name
            };

            return {
                ...nextState,
                list
            };

        },
        updatePatientNameFailure: state => {
            return {
                ...state,
                updatePatientNameActionType: 'patients/updatePatientNameFailure'
            };
        },

        /**
         * 更新某个 id 的 patient group
         */
        updatePatientGroupRequest: state => {
            return {
                ...state,
                updatePatientGroupActionType: 'patients/updatePatientGroupRequest'
            };
        },
        updatePatientGroupSuccess: (state, {id, group}) => {

            const nextState = {
                    ...state,
                    getActionType: 'patients/updatePatientGroupSuccess'
                },

                list = [...state.list],
                index = list.findIndex(item => item?.id === id);

            if (index === -1) {
                return nextState;
            }

            list[index] = {
                ...list[index],
                group,
                groupId: group.id
            };

            return {
                ...nextState,
                list
            };

        },
        updatePatientGroupFailure: state => {
            return {
                ...state,
                updatePatientGroupActionType: 'patients/updatePatientGroupFailure'
            };
        },

        /**
         * 启用 patient
         */
        enablePatientRequest: state => {
            return {
                ...state,
                enableActionType: 'patients/enablePatientRequest'
            };
        },
        enablePatientSuccess: (state, {id}) => {

            const list = cloneDeep(state.list);
            list.find(item => item.id === id).status = 1;

            return {
                ...state,
                list,
                enableActionType: 'patients/enablePatientSuccess'
            };

        },
        enablePatientFailure: state => {
            return {
                ...state,
                enableActionType: 'patients/enablePatientFailure'
            };
        },

        /**
         * 禁用 patient
         */
        disablePatientRequest: state => {
            return {
                ...state,
                disableActionType: 'patients/disablePatientRequest'
            };
        },
        disablePatientSuccess: (state, {id}) => {

            const list = cloneDeep(state.list);
            list.find(item => item.id === id).status = 0;

            return {
                ...state,
                list,
                disableActionType: 'patients/disablePatientSuccess'
            };

        },
        disablePatientFailure: state => {
            return {
                ...state,
                disableActionType: 'patients/disablePatientFailure'
            };
        }

    }
};
