/**
 * @file EpPlacementPointAction.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';
import * as actionTypes from '../actionTypes/EpPlacementPointActionType';

// Apis
import EpPlacementPointApi from 'modules/App/apis/EpPlacementPointApi';

/**
 * 获取所有的 Ep Placement Point
 * @returns {function(*): *}
 */
export const getEpPlacementPoints = () => dispatch => dispatch({
    [CALL_API]: {
        types: [
            actionTypes.GET_EP_PLACEMENT_POINT_REQUEST,
            actionTypes.GET_EP_PLACEMENT_POINT_SUCCESS,
            actionTypes.GET_EP_PLACEMENT_POINT_FAILURE
        ],
        api: EpPlacementPointApi.getEpPlacementPoints,
        successResMsgDisabled: true
    }
});
