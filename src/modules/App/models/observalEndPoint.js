/**
 * @file observalEndPoint.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';

// Apis
import ObservalEndPointApi from '../apis/ObservalEndPointApi';

export default {
    nameSpace: 'observalEndPoint',
    state: {

        /**
         * Observal End Point 列表
         */
        list: [],

        /**
         * 获取 Observal End Point 数据的 action type
         */
        actionType: null

    },
    actions: {

        /**
         * 获取所有的 Ep Placement Point
         * @returns {function(*): *}
         */
        getObservalEndPoints: () => dispatch => dispatch({
            [CALL_API]: {
                types: [
                    'observalEndPoint/getObservalEndPointsRequest',
                    'observalEndPoint/getObservalEndPointsSuccess',
                    'observalEndPoint/getObservalEndPointsFailure'
                ],
                api: ObservalEndPointApi.getObservalEndPoints,
                successResMsgDisabled: true
            }
        })

    },
    reducers: {

        /**
         * 获取 Observal End Point 数据
         */
        getObservalEndPointsRequest: state => {
            return {
                ...state,
                actionType: 'observalEndPoint/getObservalEndPointsRequest'
            };
        },
        getObservalEndPointsSuccess: (state, {responseData}) => {
            return {
                ...state,
                actionType: 'observalEndPoint/getObservalEndPointsSuccess',
                list: responseData
            };
        },
        getObservalEndPointsFailure: state => {
            return {
                ...state,
                actionType: 'observalEndPoint/getObservalEndPointsFailure',
                list: []
            };
        }

    }
};
