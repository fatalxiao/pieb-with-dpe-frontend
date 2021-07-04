/**
 * @file sensoryBlock.js
 */

// Action Types
import {CALL_API} from 'reduxes/actionTypes';

// Apis
import SensoryBlockApi from '../apis/SensoryBlockApi';

export default {
    nameSpace: 'sensoryBlock',
    state: {

        /**
         * 所有 sensory blocks 数据
         */
        list: [],

        /**
         * 胸部阻滞数据
         */
        thoracicList: [],

        /**
         * 骶部阻滞数据
         */
        sacralList: [],

        /**
         * 获取所有 sensory blocks 数据的 action type
         */
        actionType: null

    },
    actions: {

        /**
         * 获取所有的 Sensory Blocks
         * @returns {function(*): *}
         */
        getSensoryBlocks: () => dispatch => dispatch({
            [CALL_API]: {
                types: [
                    'sensoryBlock/getSensoryBlocksRequest',
                    'sensoryBlock/getSensoryBlocksSuccess',
                    'sensoryBlock/getSensoryBlocksFailure'
                ],
                api: SensoryBlockApi.getSensoryBlocks,
                successResMsgDisabled: true
            }
        })

    },
    reducers: {

        /**
         * 获取所有的 Sensory Blocks
         */
        getSensoryBlocksRequest: state => {
            return {
                ...state,
                actionType: 'sensoryBlock/getSensoryBlocksRequest'
            };
        },
        getSensoryBlocksSuccess: (state, {responseData}) => {

            const list = responseData,
                thoracicList = list.filter(item => item.type === 1),
                sacralList = list.filter(item => item.type === 2);

            thoracicList.unshift({name: 'Please Select', value: null});
            sacralList.unshift({name: 'Please Select', value: null});

            return {
                ...state,
                actionType: 'sensoryBlock/getSensoryBlocksSuccess',
                list,
                thoracicList,
                sacralList
            };

        },
        getSensoryBlocksFailure: state => {
            return {
                ...state,
                actionType: 'sensoryBlock/getSensoryBlocksFailure',
                list: [],
                thoracicList: [],
                sacralList: []
            };
        }

    }
};
