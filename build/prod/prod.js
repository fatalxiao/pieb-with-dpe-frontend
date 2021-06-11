/**
 * @file prod.js
 */

// Statics
const webpackConfig = require('./webpack.config.prod.js');

// Vendors
const webpack = require('webpack');
const logger = require('fancy-node-logger');

logger.wait('Building Production...\n');

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

    logger.done('Build Complete ');

});
