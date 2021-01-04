/**
 * @file index.js
 */

'use strict';

import React from 'react';

// Vendors
import {render} from 'react-dom';
import {createBrowserHistory} from 'history';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import configureStore from 'reduxes/store';
import {configureRoutes} from './config.routes';

// Styles
import 'scss/index.scss';

const history = createBrowserHistory(),
    store = configureStore(history);

/**
 * 渲染应用到dom
 */
function renderAppContainer() {
    render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {renderRoutes(configureRoutes(store))}
            </ConnectedRouter>
        </Provider>,
        document.getElementById('app-container')
    );
}

renderAppContainer();

/**
 * 开发环境时，添加热替换监听
 */
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('src/config.routes.js', renderAppContainer);
    module.hot.accept('reduxes/store', renderAppContainer);
    module.hot.accept('reduxes/reducers', () => {
        store.replaceReducer(require('reduxes/reducers')?.default);
    });
}
