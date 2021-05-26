/**
 * @file ToasterReducer.js
 */

import * as actionTypes from '../actionTypes';

const initialState = {
    toastes: []
};

// eslint-disable-next-line complexity,require-jsdoc
function appToaster(state = initialState, action) {
    switch (action.type) {

        /**
         * 创建一条 Toaste
         */
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

        /**
         * 更新 Toastes
         */
        case actionTypes.UPDATE_TOASTES: {
            return {
                toastes: action.toastes
            };
        }

        /**
         * 清除 Toastes
         */
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
