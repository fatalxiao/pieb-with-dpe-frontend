/**
 * @file EpPlacementPointReducer.js
 */

import * as actionTypes from '../actionTypes';

const initialState = {

    /**
     * Ep Placement Point 列表
     */
    list: [],

    /**
     * 获取所有的 Ep Placement Point 数据的 action type
     */
    actionType: null

};

// eslint-disable-next-line require-jsdoc
function epPlacementPoint(state = initialState, action) {
    switch (action.type) {

        /**
         * 获取所有的 Ep Placement Point 数据
         */
        case actionTypes.GET_EP_PLACEMENT_POINT_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.GET_EP_PLACEMENT_POINT_REQUEST
            };
        }
        case actionTypes.GET_EP_PLACEMENT_POINT_SUCCESS: {
            return {
                ...state,
                actionType: actionTypes.GET_EP_PLACEMENT_POINT_SUCCESS,
                list: action.responseData
            };
        }
        case actionTypes.GET_EP_PLACEMENT_POINT_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.GET_EP_PLACEMENT_POINT_FAILURE,
                list: []
            };
        }

        default:
            return state;

    }
}

export default epPlacementPoint;
