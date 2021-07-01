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
            type: 'appToastes/addSuccessToaste',
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
                type: 'appToastes/addErrorToaste',
                message: 'Successfully'
            });
            dispatch({
                type: 'appNotifications/addWarningNotifier',
                message: message && typeof message === 'string' ?
                    message
                    :
                    DEFAULT_ERROR_MSG
            });
        }

    }
};
