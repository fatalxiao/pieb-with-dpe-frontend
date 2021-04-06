/**
 * @file dll.js
 */

// Statics
const webpackConfig = require('./webpack.config.dll.js');

// Vendors
const webpack = require('webpack');

console.log('WAIT', 'Building DLL...');

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

    console.log('DONE', 'Build DLL Complete');

});
