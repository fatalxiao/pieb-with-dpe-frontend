/**
 * @file webpack.config.base.js
 */

const

    os = require('os'),
    HappyPack = require('happypack'),

    // Statics
    config = require('./config.js'),

    // Vendors
    {rootPath, assetsSubPath} = require('./utils.js'),

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
        app: rootPath('src/index.js')
    },

    output: {
        path: config.assetsRoot,
        filename: '[name].js',
        publicPath: config.assetsPublicPath
    },

    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            'src': rootPath('src'),
            'apis': rootPath('src/apis'),
            'assets': rootPath('src/assets'),
            'scss': rootPath('src/assets/scss'),
            'images': rootPath('src/assets/images'),
            'messages': rootPath('src/assets/messages'),
            'stylesheets': rootPath('src/assets/stylesheets'),
            'containers': rootPath('src/containers'),
            'components': rootPath('src/components'),
            'customized': rootPath('src/customized'),
            'reduxes': rootPath('src/reduxes'),
            'statics': rootPath('src/statics'),
            'vendors': rootPath('src/vendors')
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
                        includePaths: [rootPath('src/assets')]
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
