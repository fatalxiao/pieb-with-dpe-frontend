/**
 * @file NotifierReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    notifiers: []
};

function appNotifier(state = initialState, action) {

    switch (action.type) {

        case actionTypes.ADD_NOTIFIER: {

            if (!action.notifier) {
                return state;
            }

            const notifiers = state.notifiers.slice();
            notifiers.push(action.notifier);

            return {
                notifiers
            };

        }

        case actionTypes.UPDATE_NOTIFIERS: {
            return {
                notifiers: action.notifiers
            };
        }

        case actionTypes.CLEAR_NOTIFIER: {
            return {
                notifiers: []
            };
        }

        default:
            return state;

    }
}

export default appNotifier;
