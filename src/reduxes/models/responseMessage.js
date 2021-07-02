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
         * @param DEFAULT_ERROR_MSG
         * @returns {(function(*): void)|*}
         */
        addFailureResMsg: ({message}, {DEFAULT_ERROR_MSG}) => dispatch => {
            dispatch({
                type: 'toasts/addErrorToast',
                message: 'Successfully'
            });
            dispatch({
                type: 'notifications/addWarningNotifier',
                message: message && typeof message === 'string' ?
                    message
                    :
                    DEFAULT_ERROR_MSG
            });
        }

    }
};
