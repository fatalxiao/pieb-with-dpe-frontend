/**
 * @file FrozenColumns.js
 */

// Vendors
import LSP from './LocalStoragePersistence';

const STORAGE_KEY = 'FROZEN_COLUMNS';

/**
 * 获取配置
 * @param userId
 * @param tableName
 * @returns {*}
 */
export function getConfig(userId, tableName) {
    return LSP.getConfig(STORAGE_KEY, userId, tableName);
}

/**
 * 保存配置
 * @param userId
 * @param tableName
 * @param data
 * @returns {*}
 */
export function setConfig(userId, tableName, data) {
    return LSP.setConfig(STORAGE_KEY, userId, tableName, data);
}

export default {
    getConfig,
    setConfig
};
