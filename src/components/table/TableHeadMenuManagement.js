/**
 * @file TableHeadMenuManagement.js
 *
 * 在一个页面上可能同时存在多个 TableHeadMenu
 * 当一个 TableHeadMenu 打开时，需要关闭之前打开的 TableHeadMenu
 */

/**
 * 暂存的 hidePop 回调
 */
let closeCallback;

/**
 * 设置当前激活的 TableHeadMenu
 * @param cb hidePop 回调
 */
export function setActivated(cb) {
    if (closeCallback && typeof closeCallback === 'function') {
        closeCallback();
    }
    closeCallback = cb;
}

/**
 * 移除当前激活的 TableHeadMenu
 */
export function removeActivated(cb) {
    if (closeCallback === cb) {
        closeCallback = null;
    }
}

export default {
    setActivated,
    removeActivated
};
