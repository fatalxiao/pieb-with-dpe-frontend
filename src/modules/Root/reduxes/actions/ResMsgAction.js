/**
 * @file ResMsgAction.js
 */

// Actions
import {addSuccessToaste, addErrorToaste} from './ToasterAction';
import {addWarningNotifier} from './NotifierAction';

// 默认的错误消息
const DEFAULT_ERROR_MSG = 'Server or Network failure. Please try again later or contact your account manager.';

/**
 * 创建一条返回成功消息
 * @returns {Function}
 */
export const addSuccessResMsg = () => dispatch => {
    addSuccessToaste('Successfully')(dispatch);
};

/**
 * 创建一条返回失败消息
 * @param msg
 * @returns {Function}
 */
export const addFailureResMsg = msg => dispatch => {
    addErrorToaste('Failure')(dispatch);
    addWarningNotifier(msg && typeof msg === 'string' ? msg : DEFAULT_ERROR_MSG)(dispatch);
};
