/**
 * @file observalEndPoint.js
 */

// Apis
import {getObservalEndPoints} from '../apis/ObservalEndPointApi';

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
    apis: {

        /**
         * 获取所有的 Observal End Point
         * @returns {function(*): *}
         */
        getObservalEndPoints: () => dispatchApi => dispatchApi({
            api: getObservalEndPoints,
            successResMsgDisabled: true
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
