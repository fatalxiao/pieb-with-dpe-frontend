/**
 * @file patientGroup.js
 */

// Apis
import GroupApi from 'modules/App/apis/PatientGroupApi';

export default {
    nameSpace: 'patientGroup',
    state: {

        /**
         * patient groups 数据
         */
        list: []

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
        getPatientGroupsSuccess: (state, {responseData}) => {
            return {
                ...state,
                list: responseData
            };
        },
        getPatientGroupsFailure: state => {
            return {
                ...state,
                list: []
            };
        }

    }
};
