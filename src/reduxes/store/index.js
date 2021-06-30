/**
 * @file index.js
 */

import {createStore, applyMiddleware} from 'redux';

// Reducers Root
import createRootReducer from 'reduxes/reducers';

// Middlewares
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
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

function identify(value) {
    return value;
}

function handleAction(actionType, reducer = identify) {
    return (state, action) => {
        const {type} = action;
        if (actionType === type) {
            return reducer(state, action);
        }
        return state;
    };
}

function reduceReducers(...reducers) {
    return (previous, current) => reducers.reduce((p, r) => r(p, current), previous);
}

function handleActions(handlers, defaultState, nameSpace) {
    const reducers = Object.keys(handlers).map(type => handleAction(`${nameSpace}/${type}`, handlers[type]));
    const reducer = reduceReducers(...reducers);
    return (state = defaultState, action) => reducer(state, action);
}

function getReducer(reducers, state, nameSpace) {
    return handleActions(reducers || {}, state, nameSpace);
}

/**
 * 注册 model
 * @param store
 * @param model
 */
export function registerModel(store, model) {

    if (!model) {
        return;
    }

    const {nameSpace, state, reducer, reducers} = model;

    // store._asyncReducers[nameSpace] = reducer;
    // console.log('store._asyncReducers[nameSpace]::', store._asyncReducers[nameSpace]);

    store._asyncReducers[nameSpace] = getReducer(reducers, state, nameSpace);
    console.log('store._asyncReducers[nameSpace]::', store._asyncReducers[nameSpace]);

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
