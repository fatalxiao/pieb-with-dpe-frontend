/**
 * @file LocalStoragePersistence.js
 */

// Vendors
import isEmpty from 'lodash/isEmpty';

/**
 * 获取 local storage json 数据
 * @param storageKey
 * @returns {null|any}
 * @private
 */
export function _get(storageKey) {
    try {
        const json = localStorage.getItem(storageKey);
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}

/**
 * 保存 local storage json 数据
 * @param storageKey
 * @param data
 * @private
 */
export function _set(storageKey, data) {
    return localStorage.setItem(storageKey, JSON.stringify(data));
}

/**
 * 获取某个用户的数据
 * @param storageKey
 * @param userId
 * @returns {null|any|*|null}
 * @private
 */
export function _getByUser(storageKey, userId) {

    if (!userId) {
        return null;
    }

    const config = _get(storageKey);
    return config && config[userId] || null;

}

/**
 * 保存某个用户的数据
 * @param storageKey
 * @param userId
 * @param data
 * @returns {null}
 * @private
 */
export function _setByUser(storageKey, userId, data) {

    if (!userId) {
        return null;
    }

    const config = _get(storageKey) || {};

    if (!data || isEmpty(data)) {
        delete config[userId];
    } else {
        config[userId] = data;
    }

    _set(storageKey, config);

}

/**
 * 获取某个用户某个列表页的数据
 * @param storageKey
 * @param userId
 * @param tableName
 * @returns {any|*|null|null}
 */
export function getConfig(storageKey, userId, tableName) {

    if (!userId) {
        return null;
    }

    const config = _getByUser(storageKey, userId);
    return config && config[tableName] || null;

}

/**
 * 保存某个用户某个列表页的数据
 * @param storageKey
 * @param userId
 * @param tableName
 * @param data
 * @returns {null}
 */
export function setConfig(storageKey, userId, tableName, data) {

    if (!userId) {
        return null;
    }

    const config = _getByUser(storageKey, userId) || {};

    if (!data || isEmpty(data)) {
        delete config[tableName];
    } else {
        config[tableName] = data;
    }

    _setByUser(storageKey, userId, config);

}

export default {

    _get,
    _set,
    _getByUser,
    _setByUser,

    getConfig,
    setConfig

};
