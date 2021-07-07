/**
 * @file epPlacementPoint.js
 */

// Apis
import EpPlacementPointApi from 'modules/App/apis/EpPlacementPointApi';

export default {
    nameSpace: 'epPlacementPoint',
    state: {

        /**
         * Ep Placement Point 列表
         */
        list: [],

        /**
         * 获取所有的 Ep Placement Point 数据的 action type
         */
        actionType: null

    },
    apis: {

        /**
         * 获取所有的 Ep Placement Point
         * @returns {function(*): *}
         */
        getEpPlacementPoints: () => dispatchApi => dispatchApi({
            api: EpPlacementPointApi.getEpPlacementPoints,
            successResMsgDisabled: true
        })

    },
    reducers: {

        /**
         * 获取所有的 Ep Placement Point 数据
         */
        getEpPlacementPointRequest: state => {
            return {
                ...state,
                actionType: 'epPlacementPoint/getEpPlacementPointRequest'
            };
        },
        getEpPlacementPointSuccess: (state, {responseData}) => {
            return {
                ...state,
                actionType: 'epPlacementPoint/getEpPlacementPointSuccess',
                list: responseData
            };
        },
        getEpPlacementPointFailure: state => {
            return {
                ...state,
                actionType: 'epPlacementPoint/getEpPlacementPointFailure',
                list: []
            };
        }

    }
};
