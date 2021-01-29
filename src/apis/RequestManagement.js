/**
 * @file RequestManagement.js
 */

/**
 *
 * @type {string}
 */
export const CANCEL_FLAG = 'CANCEL_FLAG';

/**
 * 缓存的所有 request
 * @type {*[]}
 */
let requests = [];

/**
 * 添加 request
 * @param item
 */
export function add(item) {
    item && requests.push(item);
}

/**
 * 取消所有 name 的 request
 * @param name
 */
export function cancelByName(name) {
    requests = requests.filter(item => {
        if (item && item.name && item.name === name) {
            item.xhr && item.xhr.abort();
            return false;
        } else {
            return true;
        }
    });
}

/**
 * 取消所有不是 name 的 request
 * @param name
 */
export function cancelOthersByName(name) {
    requests = requests.filter(item => {
        if (item && item.name !== name) {
            if (item.xhr) {
                item.xhr[CANCEL_FLAG] = true;
                item.xhr.abort();
            }
            return false;
        } else {
            return true;
        }
    });
}

/**
 * 取消所有 request
 */
export function cancelAll() {
    for (let item of requests) {
        item.xhr.abort();
    }
    requests.length = 0;
}

export default {

    CANCEL_FLAG,

    add,
    cancelByName,
    cancelOthersByName,
    cancelAll

};
