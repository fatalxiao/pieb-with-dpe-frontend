/**
 * @file webpack.config.base.js
 */

const

    os = require('os'),
    HappyPack = require('happypack'),

    // Statics
    config = require('./config.js'),

    // Vendors
    {resolve, assetsSubPath} = require('./utils.js'),

    /**
     * css loader 配置
     * @type {[]}
     */
    cssLoaderConfig = ['style-loader', {
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

module.exports = {

    entry: {
        app: resolve('src/index.js')
    },

    output: {
        path: config.production.assetsRoot,
        filename: '[name].js',
        publicPath: config.assetsPublicPath
    },

    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            'src': resolve('src'),
            'apis': resolve('src/apis'),
            'assets': resolve('src/assets'),
            'scss': resolve('src/assets/scss'),
            'images': resolve('src/assets/images'),
            'messages': resolve('src/assets/messages'),
            'stylesheets': resolve('src/assets/stylesheets'),
            'containers': resolve('src/containers'),
            'components': resolve('src/components'),
            'customized': resolve('src/customized'),
            'reduxes': resolve('src/reduxes'),
            'statics': resolve('src/statics'),
            'vendors': resolve('src/vendors')
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
                name: assetsSubPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: assetsSubPath('fonts/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.scss$/,
            use: [...cssLoaderConfig, {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        includePaths: [resolve('src/assets')]
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
