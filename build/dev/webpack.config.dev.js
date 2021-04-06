/**
 * @file webpack.config.dev.js
 */

// Vendors
const {DefinePlugin, HotModuleReplacementPlugin} = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('../webpack.config.base.js');

const env = process.env.NODE_ENV;

/**
 * concat entry
 */
Object.keys(baseWebpackConfig.entry).forEach(name =>
    baseWebpackConfig.entry[name] = ['./build/dev/client'].concat(baseWebpackConfig.entry[name])
);

/**
 * webpack dev config
 * @type {{}}
 */
module.exports = merge(baseWebpackConfig, {

    mode: 'development',

    devtool: 'eval-cheap-source-map',

    cache: {
        type: 'filesystem'
    },

    plugins: [

        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),

        new HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            favicon: './src/assets/images/favicon.ico',
            inject: true,
            chunksSortMode: 'auto'
        })

    ]

});
