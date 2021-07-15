/**
 * @file responseMessage.js
 */

export default {
    nameSpace: 'responseMessage',
    state: {

        /**
         * 默认的错误消息
         */
        DEFAULT_ERROR_MSG: 'Server or Network failure. Please try again later or contact your account manager.'

    },
    actions: {

        /**
         * 创建一条返回成功消息
         * @returns {function(*): *}
         */
        addSuccessResMsg: () => dispatch => dispatch({
            type: 'toasts/addSuccessToast',
            message: 'Successfully'
        }),

        /**
         * 创建一条返回失败消息
         * @param message
         * @returns {(function(*): void)|*}
         */
        addFailureResMsg: ({message}) => (dispatch, getState) => {
            dispatch({
                type: 'toasts/addErrorToast',
                message: 'Successfully'
            });
            dispatch({
                type: 'notifications/addWarningNotifier',
                message: message && typeof message === 'string' ?
                    message
                    :
                    getState().responseMessage.DEFAULT_ERROR_MSG
            });
        }

    }
};
