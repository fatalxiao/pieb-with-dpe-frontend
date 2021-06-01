/**
 * @file ObservalEndPointAction.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';
import * as actionTypes from '../actionTypes/ObservalEndPointActionType';

// Apis
import ObservalEndPointApi from 'modules/App/apis/ObservalEndPointApi';

/**
 * 获取所有的 Observal End Point
 * @returns {function(*): *}
 */
export const getObservalEndPoints = () => dispatch => dispatch({
    [CALL_API]: {
        types: [
            actionTypes.GET_OBSERVAL_END_POINT_REQUEST,
            actionTypes.GET_OBSERVAL_END_POINT_SUCCESS,
            actionTypes.GET_OBSERVAL_END_POINT_FAILURE
        ],
        api: ObservalEndPointApi.getObservalEndPoints,
        successResMsgDisabled: true
    }
});
