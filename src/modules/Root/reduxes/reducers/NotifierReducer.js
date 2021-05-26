/**
 * @file NotifierReducer.js
 */

import * as actionTypes from '../actionTypes';

const initialState = {
    notifiers: []
};

// eslint-disable-next-line complexity,require-jsdoc
function appNotifier(state = initialState, action) {
    switch (action.type) {

        /**
         * 新增一个 Notifier
         */
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

        /**
         * 更新 Notifiers
         */
        case actionTypes.UPDATE_NOTIFIERS: {
            return {
                notifiers: action.notifiers
            };
        }

        /**
         * 清除 Notifiers
         */
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
