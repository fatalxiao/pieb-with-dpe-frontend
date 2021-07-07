/**
 * @file toasts.js
 */

// Statics
import MsgType from 'alcedo-ui/_statics/MsgType';

export default {
    nameSpace: 'toasts',
    state: [],
    actions: {

        /**
         * 创建一条 Success 类型的 Toast
         * @param message
         * @returns {function(*): *}
         */
        addSuccessToast: ({message}) => dispatch => dispatch({
            type: 'toasts/addToast',
            toast: {
                title: '',
                message,
                iconCls: 'icon-check success',
                type: MsgType.SUCCESS
            }
        }),

        /**
         * 创建一条 Error 类型的 Toast
         * @param message
         * @returns {function(*): *}
         */
        addErrorToast: ({message}) => dispatch => dispatch({
            type: 'toasts/addToast',
            toast: {
                title: '',
                message,
                iconCls: 'icon-circle-with-cross error',
                type: MsgType.ERROR
            }
        })

    },
    reducers: {

        /**
         * 创建一条 Toast
         */
        addToast: (state, {toast}) => {

            if (!toast) {
                return state;
            }

            const toasts = [...state];
            toasts.push(toast);

            return toasts;

        },

        /**
         * 更新 Toasts
         */
        updateToasts: (state, {toasts}) => {
            return toasts;
        },

        /**
         * 清除 Toasts
         */
        clearToasts: () => {
            return [];
        }

    }
};
