/**
 * @file utils.js
 */

// Statics
const config = require('./config.js');

// Vendors
const path = require('path');

/**
 * 处理项目根目录下的路径
 * @param p
 * @returns {string}
 */
function resolveRootPath(p) {
    return path.posix.join(__dirname, '..', p);
}

/**
 * 处理 assets ( 默认 "dist" 目录 ) 下的路径
 * @param p
 * @returns {string}
 */
function getAssetsPath(p) {
    return path.posix.join(config.assetsDirectory, p);
}

/**
 * 处理 sub assets ( 默认 "dist/static" 目录 ) 下的路径
 * @param p
 * @returns {string}
 */
function getAssetsSubPath(p) {
    return path.posix.join(config.assetsSubDirectory, p);
}

/**
 * 处理存放 DllPlugin manifest.json 的据对路径
 * @param p
 * @param env
 * @returns {string}
 */
function getAssetsVendorsAbsolutePath(p, env = 'production') {
    return path.posix.join(config.assetsRoot, getAssetsSubPath(`vendors/${p}`));
}

exports.resolveRootPath = resolveRootPath;
exports.getAssetsPath = getAssetsPath;
exports.getAssetsSubPath = getAssetsSubPath;
exports.getAssetsVendorsAbsolutePath = getAssetsVendorsAbsolutePath;
