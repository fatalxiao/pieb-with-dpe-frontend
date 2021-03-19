/**
 * @file SensoryBlockReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {

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

};

// eslint-disable-next-line require-jsdoc
function sensoryBlock(state = initialState, action) {
    switch (action.type) {

        /**
         * 获取所有 sensory blocks 数据
         */
        case actionTypes.GET_SENSORY_BLOCKS_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.GET_SENSORY_BLOCKS_REQUEST,
                list: [],
                thoracicList: [],
                sacralList: []
            };
        }
        case actionTypes.GET_SENSORY_BLOCKS_SUCCESS: {

            const list = action.responseData,
                thoracicList = list.filter(item => item.type === 1),
                sacralList = list.filter(item => item.type === 2);

            thoracicList.unshift({name: 'Please Select', value: null});
            sacralList.unshift({name: 'Please Select', value: null});

            return {
                ...state,
                actionType: actionTypes.GET_SENSORY_BLOCKS_SUCCESS,
                list,
                thoracicList,
                sacralList
            };

        }
        case actionTypes.GET_SENSORY_BLOCKS_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.GET_SENSORY_BLOCKS_FAILURE,
                list: [],
                thoracicList: [],
                sacralList: []
            };
        }

        default:
            return state;

    }
}

export default sensoryBlock;
