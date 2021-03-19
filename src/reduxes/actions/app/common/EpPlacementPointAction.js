/**
 * @file EpPlacementPointAction.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Apis
import EpPlacementPointApi from 'apis/app/common/EpPlacementPointApi';

/**
 * 获取所有的 Ep Placement Point
 * @returns {function(*): *}
 */
export const getEpPlacementPoints = () => dispatch => dispatch({
    [actionTypes.CALL_API]: {
        types: [
            actionTypes.GET_EP_PLACEMENT_POINT_REQUEST,
            actionTypes.GET_EP_PLACEMENT_POINT_SUCCESS,
            actionTypes.GET_EP_PLACEMENT_POINT_FAILURE
        ],
        api: EpPlacementPointApi.getEpPlacementPoints,
        successResMsgDisabled: true
    }
});
