/**
 * @file patients.js
 */

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
    apis: {

        /**
         * 获取用于表格的 patients 数据
         * @returns {function(*): *}
         */
        getPatients: () => apiDispatch => apiDispatch({
            api: PatientApi.getPatients,
            successResMsgDisabled: true
        }),

        /**
         * 获取完整的 patients 数据
         * @returns {function(*): *}
         */
        getFullPatients: () => apiDispatch => apiDispatch({
            api: PatientApi.getFullPatients,
            successResMsgDisabled: true
        }),

        /**
         * 更新某个 id 的 patient name
         * @param id
         * @param name
         * @returns {function(*): *}
         */
        updatePatientName: ({id, name}) => apiDispatch => {

            if (!id || !name) {
                return;
            }

            apiDispatch({
                api: PatientApi.updatePatientName,
                params: {
                    id,
                    name
                },
                successResMsgDisabled: true,
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
        updatePatientGroup: ({id, group}) => apiDispatch => {

            if (!id || !group) {
                return;
            }

            apiDispatch({
                api: PatientApi.updatePatientGroup,
                params: {
                    id,
                    groupId: group.id
                },
                successResMsgDisabled: true,
                id,
                group
            });

        },

        /**
         * 启用 patient
         * @param id
         * @returns {function(*): *}
         */
        enablePatient: ({id}) => apiDispatch => {

            if (!id) {
                return;
            }

            apiDispatch({
                api: PatientApi.enablePatient,
                params: {
                    id
                },
                successResMsgDisabled: true,
                id
            });

        },

        /**
         * 禁用 patient
         * @param id
         * @returns {function(*): *}
         */
        disablePatient: ({id}) => apiDispatch => {

            if (!id) {
                return;
            }

            apiDispatch({
                api: PatientApi.disablePatient,
                params: {
                    id
                },
                successResMsgDisabled: true,
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

            console.log('id::', id);
            console.log('name::', name);

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
