/**
 * @file server.js
 */

// Statics
const config = require('../config.js');
const webpackConfig = require('./webpack.config.dev.js');

// Vendors
const express = require('express');
const opn = require('opn');
const webpack = require('webpack');
const {createProxyMiddleware} = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const

    /**
     * server 端口
     * @type {string|number}
     */
    port = process.env.PORT || config.development.port,

    /**
     * server url
     * @type {string}
     */
    url = 'http://localhost:' + port,

    /**
     * express app
     * @type {*|Express}
     */
    app = express(),

    /**
     * webpack compiler
     */
    compiler = webpack(webpackConfig);

/**
 * dev middleware
 */
const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
});
devMiddleware.waitUntilValid(() =>
    console.log('DONE', `Listening At ${url} `)
);

/**
 * hot middleware
 */
const hotMiddleware = webpackHotMiddleware(compiler, {
    log: false
});

/**
 * webpack compiler
 */
compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () =>
    hotMiddleware.publish({
        action: 'reload'
    })
);

/**
 * 配置代理
 */
const proxyTable = config.development.proxyTable;
Object.entries(proxyTable).forEach(([context, target]) =>
    app.use(
        createProxyMiddleware(context, {
            target,
            changeOrigin: true,
            logLevel: 'error'
        })
    )
);

app.use(history())
   .use(devMiddleware)
   .use(hotMiddleware)
   .use(config.development.assetsVirtualRoot, express.static('./static'));

module.exports = app.listen(port, err => {

    if (err) {
        return console.error(err);
    }

    opn(url);

});
