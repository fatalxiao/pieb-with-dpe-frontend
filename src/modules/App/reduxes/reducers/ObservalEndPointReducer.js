/**
 * @file ObservalEndPointReducer.js
 */

import * as actionTypes from '../actionTypes/ObservalEndPointActionType';

const initialState = {

    /**
     * Observal End Point 列表
     */
    list: [],

    /**
     * 获取 Observal End Point 数据的 action type
     */
    actionType: null

};

// eslint-disable-next-line require-jsdoc
function observalEndPoint(state = initialState, action) {
    switch (action.type) {

        /**
         * 获取 Observal End Point 数据
         */
        case actionTypes.GET_OBSERVAL_END_POINT_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.GET_OBSERVAL_END_POINT_REQUEST
            };
        }
        case actionTypes.GET_OBSERVAL_END_POINT_SUCCESS: {
            return {
                ...state,
                actionType: actionTypes.GET_OBSERVAL_END_POINT_SUCCESS,
                list: action.responseData
            };
        }
        case actionTypes.GET_OBSERVAL_END_POINT_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.GET_OBSERVAL_END_POINT_FAILURE,
                list: []
            };
        }

        default:
            return state;

    }
}

export default observalEndPoint;
