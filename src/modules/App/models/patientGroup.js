/**
 * @file patientGroup.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';

// Apis
import GroupApi from 'modules/App/apis/PatientGroupApi';

export default {
    nameSpace: 'patientGroup',
    state: {

        /**
         * patient groups 数据
         */
        list: [],

        /**
         * 获取 patient groups 数据的 action type
         */
        actionType: null

    },
    apis: {

        /**
         * 获取 Patient Groups
         * @returns {function(*): *}
         */
        getPatientGroups: () => dispatchApi => dispatchApi({
            api: GroupApi.getPatientGroups,
            successResMsgDisabled: true
        })

    },
    reducers: {

        /**
         * 获取 Patient Groups
         */
        getPatientGroupsRequest: state => {
            return {
                ...state,
                actionType: 'patientGroup/getPatientGroupsRequest'
            };
        },
        getPatientGroupsSuccess: (state, {responseData}) => {
            return {
                ...state,
                actionType: 'patientGroup/getPatientGroupsSuccess',
                list: responseData
            };
        },
        getPatientGroupsFailure: state => {
            return {
                ...state,
                actionType: 'patientGroup/getPatientGroupsFailure',
                list: []
            };
        }

    }
};
