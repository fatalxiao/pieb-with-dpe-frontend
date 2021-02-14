/**
 * @file SensoryBlockReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    list: [],
    thoracicList: [],
    sacralList: []
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
                list: [],
                thoracicList: [],
                sacralList: [],
                actionType: actionTypes.GET_SENSORY_BLOCKS_REQUEST
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
                list,
                thoracicList,
                sacralList,
                actionType: actionTypes.GET_SENSORY_BLOCKS_SUCCESS
            };

        }
        case actionTypes.GET_SENSORY_BLOCKS_FAILURE: {
            return {
                ...state,
                list: [],
                thoracicList: [],
                sacralList: [],
                actionType: actionTypes.GET_SENSORY_BLOCKS_FAILURE
            };
        }

        default:
            return state;

    }
}

export default sensoryBlock;
