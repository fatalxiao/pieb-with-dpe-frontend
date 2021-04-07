/**
 * @file ToasterAction.js
 */

import * as actionTypes from 'reduxes/actionTypes';

// Statics
import MsgType from 'alcedo-ui/_statics/MsgType';

/**
 * 创建一条 Toaste
 * @param toaste
 * @returns {function(*): *}
 */
export const addToaste = toaste => dispatch => dispatch({
    type: actionTypes.ADD_TOASTE,
    toaste
});

/**
 * 创建一条 Success 类型的 Toaste
 * @param message
 * @returns {function(*): *}
 */
export const addSuccessToaste = message => dispatch => dispatch({
    type: actionTypes.ADD_TOASTE,
    toaste: {
        title: '',
        message,
        iconCls: 'icon-check success',
        type: MsgType.SUCCESS
    }
});

/**
 * 创建一条 Error 类型的 Toaste
 * @param message
 * @returns {function(*): *}
 */
export const addErrorToaste = message => dispatch => dispatch({
    type: actionTypes.ADD_TOASTE,
    toaste: {
        title: '',
        message,
        iconCls: 'icon-circle-with-cross error',
        type: MsgType.ERROR
    }
});

/**
 * 更新 Toastes
 * @param toastes
 * @returns {function(*): *}
 */
export const updateToastes = toastes => dispatch => dispatch({
    type: actionTypes.UPDATE_TOASTES,
    toastes
});

/**
 * 清除 Toastes
 * @returns {function(*): *}
 */
export const clearToaste = () => dispatch => dispatch({
    type: actionTypes.CLEAR_TOASTE
});
