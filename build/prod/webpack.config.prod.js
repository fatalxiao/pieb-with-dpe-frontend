/**
 * @file webpack.config.prod.js
 */

// Vendors
const {DefinePlugin, DllReferencePlugin} = require('webpack');
const {merge} = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// Statics
const config = require('../config.js');
const baseWebpackConfig = require('../webpack.config.base.js');
const {resolveRootPath, getAssetsSubPath, getAssetsVendorsAbsolutePath} = require('../utils.js');

// server env
const env = process.env.NODE_ENV;

// HtmlIncludeAssetsPlugin Assets
const vendorsAssets = require(getAssetsVendorsAbsolutePath('vendors-assets.json', env));

/**
 * webpack prod config
 * @type {{}}
 */
module.exports = merge(baseWebpackConfig, {

    mode: 'production',

    devtool: false,

    output: {
        publicPath: config.assetsPublicPath,
        path: config.assetsRoot,
        filename: getAssetsSubPath('js/[name].[chunkhash].js'),
        chunkFilename: getAssetsSubPath('js/[id].[chunkhash].js')
    },

    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                nodeModules: {
                    name: 'nodeModules',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all'
                }
            }
        }
    },

    plugins: [

        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),

        new CopyPlugin({
            patterns: [{
                from: resolveRootPath('static'),
                to: config.assetsSubDirectory,
                globOptions: {
                    ignore: ['.*']
                }
            }]
        }),

        new DllReferencePlugin({
            context: __dirname,
            manifest: require(getAssetsVendorsAbsolutePath('polyfill-manifest.json', env))
        }),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(getAssetsVendorsAbsolutePath('moment-manifest.json', env))
        }),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(getAssetsVendorsAbsolutePath('react-manifest.json', env))
        }),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(getAssetsVendorsAbsolutePath('tools-manifest.json', env))
        }),

        new HtmlPlugin({
            filename: config[env].index,
            template: './src/index.html',
            favicon: './src/assets/images/favicon.ico',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunksSortMode: 'auto'
        }),

        new HtmlIncludeAssetsPlugin({
            assets: [
                vendorsAssets['polyfill'].js,
                vendorsAssets['moment'].js,
                vendorsAssets['react'].js,
                vendorsAssets['tools'].js
            ],
            append: false
        }),

        new CompressionPlugin({
            test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
            filename: '[path][base].gz[query]'
        })

    ]

});
