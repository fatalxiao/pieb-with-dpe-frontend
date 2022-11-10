/**
 * @file webpack.config.base.js
 */

// Statics
const config = require('./config.js');

// Vendors
const {resolveRootPath} = require('./utils.js');

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
            test: /\.m?js$/,
            use: {
                loader: 'babel-loader'
            },
            include: resolveRootPath('src')
        }, {
            test: /\.(png|jpe?g|gif|svg|cur|ico)(\?.*)?$/,
            type: 'asset/resource',
            generator: {
                filename: 'img/[name]-[contenthash:8][ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: 'asset/resource',
            generator: {
                filename: 'font/[name]-[contenthash:8][ext]'
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
    }

};
