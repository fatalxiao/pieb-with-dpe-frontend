/**
 * @file RequestManagement.js
 */

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
        if (item?.name === name) {
            item?.source?.cancel?.();
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
        if (item?.name !== name) {
            item?.source?.cancel?.();
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
        item?.source?.cancel?.();
    }
    requests.length = 0;
}

export default {
    add,
    cancelByName,
    cancelOthersByName,
    cancelAll
};
