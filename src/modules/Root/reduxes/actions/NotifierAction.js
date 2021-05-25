/**
 * @file NotifierAction.js
 */

import * as actionTypes from '../actionTypes/NotifierActionType';

// Statics
import MsgType from 'alcedo-ui/_statics/MsgType';

/**
 * 新增一个 Notifier
 * @param notifier
 * @returns {Function}
 */
export const addNotifier = notifier => dispatch => dispatch({
    type: actionTypes.ADD_NOTIFIER,
    notifier
});

/**
 * 新增一个 Info 类型的 Notifier
 * @param message
 * @returns {Function}
 */
export const addInfoNotifier = message => dispatch => dispatch({
    type: actionTypes.ADD_NOTIFIER,
    notifier: {
        title: '',
        message,
        iconCls: 'icon-info-with-circle info',
        type: MsgType.INFO
    }
});

/**
 * 新增一个 Warning 类型的 Notifier
 * @param message
 * @returns {Function}
 */
export const addWarningNotifier = message => dispatch => dispatch({
    type: actionTypes.ADD_NOTIFIER,
    notifier: {
        title: '',
        message,
        iconCls: 'icon-warning warning',
        type: MsgType.WARNING
    }
});

/**
 * 更新 Notifiers
 * @param notifiers
 * @returns {Function}
 */
export const updateNotifiers = notifiers => dispatch => dispatch({
    type: actionTypes.UPDATE_NOTIFIERS,
    notifiers
});

/**
 * 清除 Notifiers
 * @returns {Function}
 */
export const clearNotifier = () => dispatch => dispatch({
    type: actionTypes.CLEAR_NOTIFIER
});
