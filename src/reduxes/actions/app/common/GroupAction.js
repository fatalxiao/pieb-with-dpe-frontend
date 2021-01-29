import * as actionTypes from 'reduxes/actionTypes';
import GroupApi from 'apis/app/common/PatientGroupApi';

export const getPatientGroups = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_GROUPS_REQUEST,
                actionTypes.GET_GROUPS_SUCCESS,
                actionTypes.GET_GROUPS_FAILURE
            ],
            api: GroupApi.getPatientGroups,
            successResMsgDisabled: true
        }
    });
};
