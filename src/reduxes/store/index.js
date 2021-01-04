/**
 * @file index.js
 */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';

// Reducers Root
import createRootReducer from 'reduxes/reducers';

// Middlewares
import ApiMiddleware from 'reduxes/middlewares/ApiMiddleware';

export default history => createStore(
    createRootReducer(history),
    applyMiddleware(
        thunk,
        ApiMiddleware,
        routerMiddleware(history)
    )
);
