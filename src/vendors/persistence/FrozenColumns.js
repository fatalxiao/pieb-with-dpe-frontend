/**
 * @file FrozenColumns.js
 */

// Vendors
import LSP from './LocalStoragePersistence';

const STORAGE_KEY = 'FROZEN_COLUMNS';

/**
 * 获取配置
 * @param tableName
 * @returns {*}
 */
export function getConfig(tableName) {
    return LSP.getConfig(STORAGE_KEY, tableName);
}

/**
 * 保存配置
 * @param tableName
 * @param data
 * @returns {*}
 */
export function setConfig(tableName, data) {
    return LSP.setConfig(STORAGE_KEY, tableName, data);
}

export default {
    getConfig,
    setConfig
};
