/**
 * @file webpack.config.base.js
 */

// Statics
const config = require('./config.js');

// Vendors
const os = require('os');
const HappyPack = require('happypack');
const {resolveRootPath, getAssetsSubPath} = require('./utils.js');

/**
 * css loader 配置
 * @type {[]}
 */
const cssLoaderConfig = ['style-loader', {
    loader: 'css-loader',
    options: {
        importLoaders: 1
    }
}, {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                'postcss-preset-env'
            ]
        }
    }
}];

/**
 * webpack base config
 * @type {{}}
 */
module.exports = {

    entry: {
        app: resolveRootPath('src/index.js')
    },

    output: {
        publicPath: config.assetsPublicPath,
        path: config.assetsRoot,
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            'src': resolveRootPath('src'),
            'assets': resolveRootPath('src/assets'),
            'scss': resolveRootPath('src/assets/scss'),
            'images': resolveRootPath('src/assets/images'),
            'models': resolveRootPath('src/models'),
            'modules': resolveRootPath('src/modules'),
            'components': resolveRootPath('src/components'),
            'customized': resolveRootPath('src/customized'),
            'statics': resolveRootPath('src/statics'),
            'vendors': resolveRootPath('src/vendors')
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: 'happypack/loader?id=js'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: getAssetsSubPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: getAssetsSubPath('fonts/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.scss$/,
            use: [...cssLoaderConfig, {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        includePaths: [resolveRootPath('src/assets')]
                    }
                }
            }]
        }, {
            test: /\.css$/,
            use: cssLoaderConfig
        }]
    },

    plugins: [
        new HappyPack({
            id: 'js',
            threadPool: HappyPack.ThreadPool({size: os.cpus().length}),
            loaders: ['babel-loader?cacheDirectory=true'],
            verbose: false
        })
    ]

};
