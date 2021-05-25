/**
 * @file index.js
 */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';

// Reducers Root
import createRootReducer from 'reduxes/reducers';

// Middlewares
import ComponentLoading from 'reduxes/middlewares/ComponentLoadingMiddleware';
import Api from 'reduxes/middlewares/ApiMiddleware';

/**
 * 注入异步的 reducer
 * @param store
 * @param nameSpace
 * @param asyncReducer
 */
export function injectAsyncReducer(store, nameSpace, asyncReducer) {
    store._asyncReducers[nameSpace] = asyncReducer;
    store.replaceReducer(createRootReducer(store._history, store._asyncReducers));
}

export default history => {

    const store = createStore(
        createRootReducer(history),
        applyMiddleware(
            thunk,
            ComponentLoading,
            Api,
            routerMiddleware(history)
        )
    );

    store._history = history;
    store._asyncReducers = {};

    return store;

};
