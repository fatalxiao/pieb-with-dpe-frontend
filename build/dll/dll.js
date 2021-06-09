/**
 * @file dll.js
 */

// Statics
const webpackConfig = require('./webpack.config.dll.js');
const logger = require('fancy-node-logger');

// Vendors
const webpack = require('webpack');

logger.wait('Building DLL...');

webpack(webpackConfig, (err, stats) => {

    if (err) {
        throw err;
    }

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');

    logger.done('Build DLL Complete');

});
