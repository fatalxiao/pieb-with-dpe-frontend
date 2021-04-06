/**
 * @file prod.js
 */

// Statics
const webpackConfig = require('./webpack.config.prod.js');

// Vendors
const webpack = require('webpack');

console.log('WAIT', 'Building Production...');

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

    console.log('DONE', `Build Complete `);

});
