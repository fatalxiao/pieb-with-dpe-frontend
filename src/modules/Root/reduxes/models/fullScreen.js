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

        /**
         * 当前是否是全屏状态
         */
        isFullScreen: screenfull ? screenfull.isFullscreen : false,

        /**
         * 请求全屏状态时附带的 className
         */
        fullScreenClassName: null

    },
    actions: {

        /**
         * 切换全屏
         * @param el
         * @param fullScreenClassName
         * @param callback
         * @param state
         * @returns {(function(*): void)|*}
         */
        toggleFullScreen: ({el, fullScreenClassName, callback}, state) => dispatch => {
            if (state.isFullScreen) {
                dispatch({
                    type: 'fullScreen/exitFullScreen',
                    callback
                });
            } else {
                dispatch({
                    type: 'fullScreen/requestFullScreen',
                    el,
                    fullScreenClassName,
                    callback
                });
            }
        }

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