/**
 * @file ToasterReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    toastes: []
};

function appToaster(state = initialState, action) {

    switch (action.type) {

        case actionTypes.ADD_TOASTE: {

            if (!action.toaste) {
                return state;
            }

            const toastes = state.toastes.slice();
            toastes.push(action.toaste);

            return {
                toastes
            };

        }

        case actionTypes.UPDATE_TOASTES: {
            return {
                toastes: action.toastes
            };
        }

        case actionTypes.CLEAR_TOASTE: {
            return {
                toastes: []
            };
        }

        default:
            return state;

    }
}

export default appToaster;
