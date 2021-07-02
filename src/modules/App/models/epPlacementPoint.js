/**
 * @file epPlacementPoint.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';

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
    actions: {

        /**
         * 获取所有的 Ep Placement Point
         * @returns {function(*): *}
         */
        getEpPlacementPoints: () => dispatch => dispatch({
            [CALL_API]: {
                types: [
                    'epPlacementPoint/getEpPlacementPointRequest',
                    'epPlacementPoint/getEpPlacementPointSuccess',
                    'epPlacementPoint/getEpPlacementPointFailure'
                ],
                api: EpPlacementPointApi.getEpPlacementPoints,
                successResMsgDisabled: true
            }
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
