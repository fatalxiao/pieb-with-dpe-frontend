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
        list: []
    },
    apis: {

        /**
         * 获取用于表格的 patients 数据
         * @returns {function(*): *}
         */
        getPatients: () => dispatchApi => dispatchApi({
            api: PatientApi.getPatients,
            successResMsgDisabled: true
        }),

        /**
         * 获取完整的 patients 数据
         * @returns {function(*): *}
         */
        getFullPatients: () => dispatchApi => dispatchApi({
            api: PatientApi.getFullPatients,
            successResMsgDisabled: true
        }),

        /**
         * 更新某个 id 的 patient name
         * @param id
         * @param name
         * @returns {function(*): *}
         */
        updatePatientName: ({id, name}) => dispatchApi => {

            if (!id || !name) {
                return;
            }

            dispatchApi({
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
        updatePatientGroup: ({id, group}) => dispatchApi => {

            if (!id || !group) {
                return;
            }

            dispatchApi({
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
        enablePatient: ({patientId}) => dispatchApi => {

            if (!patientId) {
                return;
            }

            dispatchApi({
                api: PatientApi.enablePatient,
                params: {
                    patientId
                },
                successResMsgDisabled: true,
                patientId
            });

        },

        /**
         * 禁用 patient
         * @param id
         * @returns {function(*): *}
         */
        disablePatient: ({patientId}) => dispatchApi => {

            if (!patientId) {
                return;
            }

            dispatchApi({
                api: PatientApi.disablePatient,
                params: {
                    patientId
                },
                successResMsgDisabled: true,
                patientId
            });

        }

    },
    reducers: {

        /**
         * 获取用于表格的 patients 数据
         */
        getPatientsSuccess: (state, {responseData}) => {
            return {
                ...state,
                list: responseData
            };
        },
        getPatientsFailure: state => {
            return {
                ...state,
                list: []
            };
        },

        /**
         * 获取完整的 patients 数据
         */
        getFullPatientsSuccess: (state, {responseData}) => {
            return {
                ...state,
                list: responseData
            };
        },
        getFullPatientsFailure: state => {
            return {
                ...state,
                list: []
            };
        },

        /**
         * 更新某个 id 的 patient name
         */
        updatePatientNameSuccess: (state, {id, name}) => {

            const nextState = {
                    ...state
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

        /**
         * 更新某个 id 的 patient group
         */
        updatePatientGroupSuccess: (state, {id, group}) => {

            const nextState = {
                    ...state
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

        /**
         * 启用 patient
         */
        enablePatientSuccess: (state, {patientId}) => {

            const list = cloneDeep(state.list);
            list.find(item => item.id === patientId).status = 1;

            return {
                ...state,
                list
            };

        },

        /**
         * 禁用 patient
         */
        disablePatientSuccess: (state, {patientId}) => {

            const list = cloneDeep(state.list);
            list.find(item => item.id === patientId).status = 0;

            return {
                ...state,
                list
            };

        }

    }
};
