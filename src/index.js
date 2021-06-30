/**
 * @file index.js
 */

'use strict';

import React from 'react';

// Sync Models
import loadComponent from 'reduxes/models/loadComponent';

// Vendors
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import configureStore from 'reduxes/store';
import {configureRoutes} from './config.routes';
import {registerModel} from 'reduxes/store';

// Styles
import 'assets/bootstrap/bootstrap-grid.min.css';
import 'assets/font-awesome/css/all.min.css';
import 'assets/icomoon/style.css';
import 'customized/index.scss';
import 'scss/global.scss';
import 'scss/index.scss';

/**
 * 开发环境时，添加热替换监听
 */
if (process.env.NODE_ENV === 'development' && module?.hot) {
    module.hot.accept();
}

/**
 * 初始化 history / store
 */
const history = createBrowserHistory(),
    store = configureStore(history);
registerModel(store, loadComponent);

/**
 * 渲染应用到dom
 */
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(configureRoutes(store))}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);
