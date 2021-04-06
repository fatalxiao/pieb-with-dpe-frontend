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
function rootPath(p) {
    return path.posix.join(__dirname, '..', p);
}

/**
 * 处理 assets ( 默认 "dist" 目录 ) 下的路径
 * @param p
 * @returns {string}
 */
function assetsPath(p) {
    return path.posix.join(config.assetsDirectory, p);
}

/**
 * 处理 sub assets ( 默认 "dist/static" 目录 ) 下的路径
 * @param p
 * @returns {string}
 */
function assetsSubPath(p) {
    return path.posix.join(config.assetsSubDirectory, p);
}

/**
 * 处理存放 DllPlugin manifest.json 的据对路径
 * @param p
 * @param env
 * @returns {string}
 */
function assetsVendorsAbsolutePath(p, env = 'production') {
    return path.posix.join(config.assetsRoot, assetsSubPath(`vendors/${p}`));
}

exports.rootPath = rootPath;
exports.assetsPath = assetsPath;
exports.assetsSubPath = assetsSubPath;
exports.assetsVendorsAbsolutePath = assetsVendorsAbsolutePath;
