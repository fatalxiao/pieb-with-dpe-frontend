const express = require('express'),
    {createProxyMiddleware} = require('http-proxy-middleware'),
    history = require('connect-history-api-fallback'),
    opn = require('opn'),
    compression = require('compression'),

    config = require('../config.js'),
    utils = require('../utils.js'),

    env = process.env.NODE_ENV,
    app = express(),
    port = config[env].port,
    uri = 'http://localhost:' + port,

    proxyTable = config[env].proxyTable;

Object.keys(proxyTable).forEach(context => {

    let options = proxyTable[context];

    if (typeof options === 'string') {
        options = {
            target: options,
            changeOrigin: true,
            logLevel: 'error'
        };
    }

    options.onProxyReq = (proxyReq, req) => {
        if (req.headers && !req.headers.token && req.query && req.query.token) {
            proxyReq.setHeader('token', req.query.token);
        }
    };

    app.use(createProxyMiddleware(options.filter || context, options));

});

app.use(compression())
   .use(history())
   .use(express.static(config.assetsRoot, {
       setHeaders: (res, path) => {
           res.setHeader('Cache-Control', path.endsWith('index.html') ?
               'no-cache, no-store, no_store, max-age=0, must-revalidate' : 'max-age=315360000'
           );
       }
   }))
   .listen(port, err => {

       if (err) {
           console.log(err);
           return;
       }

       console.log('> Listening at ' + uri);

       opn(uri);

   });
