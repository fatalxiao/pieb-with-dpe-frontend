/**
 * @file FullScreenReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Vendors
import screenfull from 'screenfull';

const initialState = {
    isFullScreen: screenfull ? screenfull.isFullscreen : false,
    fullScreenClassName: null
};

/**
 * 请求全屏
 * @param el
 * @param callback
 * @returns {Promise<void>}
 */
async function request(el, callback) {

    if (!screenfull) {
        return;
    }

    await screenfull.request(el || undefined);
    callback && callback(true);

}

/**
 * 退出全屏
 * @param callback
 * @returns {Promise<void>}
 */
async function exit(callback) {

    if (!screenfull) {
        return;
    }

    await screenfull.exit();
    callback && callback(false);

}

function fullScreen(state = initialState, action) {
    switch (action.type) {

        /**
         * 请求全屏
         */
        case actionTypes.REQUEST_FULL_SCREEN: {

            request(action.el, action.callback);

            return {
                ...state,
                isFullScreen: true,
                fullScreenClassName: action.fullScreenClassName
            };

        }

        /**
         * 退出全屏
         */
        case actionTypes.EXIT_FULL_SCREEN: {

            exit(action.callback);

            return {
                ...state,
                isFullScreen: false,
                fullScreenClassName: null
            };

        }

        /**
         * 更新全屏
         */
        case actionTypes.UPDATE_FULL_SCREEN: {

            const isFullScreen = action.isFullScreen || (screenfull ? screenfull.isFullscreen : false);

            return {
                ...state,
                isFullScreen,
                fullScreenClassName: isFullScreen ? state.fullScreenClassName : null
            };

        }

        default:
            return state;

    }
}

export default fullScreen;
