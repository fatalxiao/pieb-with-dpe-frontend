/**
 * @file LoadComponentReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    loading: false
};

function loadComponent(state = initialState, action) {
    switch (action.type) {

        /**
         * 开始加载 component
         */
        case actionTypes.LOAD_COMPONENT_START: {
            return {
                ...state,
                loading: true
            };
        }

        /**
         * 加载 component 完毕
         */
        case actionTypes.LOAD_COMPONENT_COMPLETE: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;

    }
}

export default loadComponent;
