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
import {configureRoutes} from './config.route';

// Vivy
import Vivy from 'vivy';
import VivyApi from 'vivy-api';
import VivyRouter from 'vivy-router';
import VivyAsyncComponent from 'vivy-async-component';

// Sync Models
import route from 'models/route';
import fullScreen from 'models/fullScreen';
import notifications from 'models/notifications';
import toasts from 'models/toasts';
import responseMessage from 'models/responseMessage';

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

// Create browser history
const history = createBrowserHistory();

// Create vivy
const vivy = Vivy();

// Apply router plugin
vivy.use(VivyRouter({
    history
}));

// Apply async component plugin
vivy.use(VivyAsyncComponent());

// Apply api plugin
vivy.use(VivyApi({
    checkResponseStatus: response => response?.data?.code === 2000,
    successResponseHandler: ({dispatch, getState}) => next => action => {

        const {
            response,
            resMsgDisabled, successResMsgDisabled,
            successCallback
        } = action;
        const responseData = response.data.data;

        !resMsgDisabled && !successResMsgDisabled && dispatch({
            type: 'responseMessage/addSuccessResMsg'
        });

        next({
            ...action,
            responseData
        });

        successCallback?.(responseData, response);

    },
    failureResponseHandler: ({dispatch, getState}) => next => action => {

        const {
            response,
            resMsgDisabled, failureResMsgDisabled,
            failureCallback
        } = action;
        const responseData = response.data.data;

        if (!resMsgDisabled && !failureResMsgDisabled) {
            dispatch({
                type: 'responseMessage/addFailureResMsg',
                message: responseData
            });
        }

        next({
            ...action,
            responseData,
            error: response ?
                (responseData || response.message)
                :
                'Server or Network failure. Please try again later or contact your account manager.'
        });

        failureCallback?.(responseData, response);

    }
}));

// Create store after configuration
const store = vivy.createStore();

// Register model to store
store.registerModels([
    route,
    fullScreen,
    notifications,
    toasts,
    responseMessage
]);

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
