/**
 * @file server.js
 */

// Statics
const config = require('../config.js');

// Vendors
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const opn = require('opn');
const compression = require('compression');
const logger = require('fancy-node-logger');

logger.wait('Starting App...\n');

const

    /**
     * server env
     * @type {string}
     */
    env = process.env.NODE_ENV,

    /**
     * express app
     * @type {*|Express}
     */
    app = express(),

    /**
     * server port
     */
    port = config[env].port,

    /**
     * server url
     * @type {string}
     */
    url = 'http://localhost:' + port;

/**
 * 配置代理
 */
const proxyTable = config[env].proxyTable;
Object.entries(proxyTable).forEach(([context, target]) =>
    app.use(
        createProxyMiddleware(context, {
            target,
            changeOrigin: true,
            logLevel: 'error'
        })
    )
);

app.use(compression())
   .use(history())
   .use(express.static(config.assetsRoot, {
       setHeaders: (res, path) => res.setHeader(
           'Cache-Control',
           path.endsWith('index.html') ?
               'no-cache, no-store, no_store, max-age=0, must-revalidate'
               :
               'max-age=315360000'
       )
   }))
   .listen(port, err => {

       if (err) {
           logger.error(err);
           return;
       }

       logger.done(`> Listening at ${url}`);

       opn(url);

   });
