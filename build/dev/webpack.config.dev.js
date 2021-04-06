const {DefinePlugin, HotModuleReplacementPlugin} = require('webpack'),
    {merge} = require('webpack-merge'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),

    baseWebpackConfig = require('../webpack.config.base.js'),

    env = process.env.NODE_ENV;

Object.keys(baseWebpackConfig.entry).forEach(name => {
    baseWebpackConfig.entry[name] = ['./build/dev/client'].concat(baseWebpackConfig.entry[name]);
});

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
