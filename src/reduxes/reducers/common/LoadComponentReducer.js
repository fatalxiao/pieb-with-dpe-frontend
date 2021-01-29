/**
 * @file LoadComponentReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    loading: false
};

function loadComponent(state = initialState, action) {
    switch (action.type) {

        case actionTypes.LOAD_COMPONENT_START: {
            return {
                ...state,
                loading: true
            };
        }

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
