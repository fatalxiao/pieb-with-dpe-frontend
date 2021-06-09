/**
 * @file server.js
 */

// Vendors
const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');
const compression = require('compression');
const logger = require('fancy-node-logger');

const

    /**
     * server port
     * @type {string|number}
     */
    port = process.env.port || 4000,

    /**
     * express app
     * @type {*|Express}
     */
    app = express();

app.use(compression())
   .use(history())
   .use(express.static(path.posix.join(__dirname, 'dist'), {
       setHeaders: (res, p) => {
           res.setHeader('Cache-Control', p.endsWith('index.html') ?
               'no-cache, no-store, no_store, max-age=0, must-revalidate' : 'max-age=315360000'
           );
       }
   }))
   .listen(port, err => {

       if (err) {
           logger.error(`${err} `);
           return;
       }

       logger.done(`Listening At ${port} `);

   });
