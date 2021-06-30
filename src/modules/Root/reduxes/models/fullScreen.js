/**
 * @file FullScreenReducer.js
 */

import * as actionTypes from '../actionTypes';

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
    callback?.(true);

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
    callback?.(false);

}

// eslint-disable-next-line complexity,require-jsdoc
async function fullScreen(state = initialState, action) {
    switch (action.type) {

        /**
         * 请求全屏
         */
        case actionTypes.REQUEST_FULL_SCREEN: {

            await request(action.el, action.callback);

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

            await exit(action.callback);

            return {
                ...state,
                isFullScreen: false,
                fullScreenClassName: null
            };

        }

        /**
         * 更新全屏状态
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
