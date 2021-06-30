/**
 * @file fullScreen.js
 */

// Vendors
import screenfull from 'screenfull';

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

export default {
    nameSpace: 'fullScreen',
    state: {
        isFullScreen: screenfull ? screenfull.isFullscreen : false,
        fullScreenClassName: null
    },
    reducers: {

        /**
         * 请求全屏
         */
        requestFullScreen: async (state, action) => {

            await request(action.el, action.callback);

            return {
                ...state,
                isFullScreen: true,
                fullScreenClassName: action.fullScreenClassName
            };

        },

        /**
         * 退出全屏
         */
        exitFullScreen: async (state, action) => {

            await exit(action.callback);

            return {
                ...state,
                isFullScreen: false,
                fullScreenClassName: null
            };

        },

        /**
         * 更新全屏状态
         */
        updateFullScreen: (state, action) => {

            const isFullScreen = action.isFullScreen || (screenfull ? screenfull.isFullscreen : false);

            return {
                ...state,
                isFullScreen,
                fullScreenClassName: isFullScreen ? state.fullScreenClassName : null
            };

        }

    }
};
