/**
 * @file webpack.config.dll.js
 */

// Statics
const config = require('../config.js');
const utils = require('../utils.js');

// Vendors
const {IgnorePlugin, DllPlugin} = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const

    // env
    env = process.env.NODE_ENV,

    // DllPlugin library name
    library = '[name]_lib';

/**
 * webpack dll config
 * @type {{}}
 */
module.exports = {

    mode: 'production',

    entry: {
        'polyfill': ['@babel/polyfill'],
        'moment': ['moment'],
        'react': ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-config', 'react-router-dom',
                  'connected-react-router', 'redux', 'redux-thunk', 'react-transition-group'],
        'tools': ['classnames', 'history', 'js-cookie']
    },

    output: {
        publicPath: './',
        path: config.assetsRoot,
        filename: utils.assetsSubPath('vendors/[name].[chunkhash].js'),
        library
    },

    plugins: [

        // 排除 moment 的 locale 文件夹下的语言包
        new IgnorePlugin(/^\.\/locale$/, /moment$/),

        new DllPlugin({
            context: __dirname,
            path: utils.assetsVendorsAbsolutePath('[name]-manifest.json', env),
            name: library
        }),

        new AssetsPlugin({
            path: config.assetsRoot,
            filename: utils.assetsSubPath('vendors/vendors-assets.json')
        }),

        new CompressionPlugin({
            test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
            filename: '[path][base].gz[query]'
        })

    ]

};
