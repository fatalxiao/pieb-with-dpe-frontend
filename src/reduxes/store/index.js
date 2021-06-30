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

/**
 * 默认的 reducer
 * @param value
 * @returns {*}
 */
function identify(value) {
    return value;
}

/**
 * 生成 Reducer
 * @param actionType
 * @param reducer
 * @returns {(function(*=, *=): (*))|*}
 */
function handleReducer(actionType, reducer = identify) {
    return (state, action) => {

        const {type} = action;

        if (actionType === type) {
            return reducer(state, action);
        }

        return state;

    };
}

/**
 * reduce reducers
 * @param reducers
 * @returns {function(*=, *=): *}
 */
function reduceReducers(...reducers) {
    return (previous, current) => reducers.reduce((p, r) => r(p, current), previous);
}

/**
 * 生成 actions
 * @param store
 * @param nameSpace
 * @param defaultState
 * @param actions
 * @param reducers
 * @returns {function(*=, *=): *}
 */
function handleActions(store, nameSpace, defaultState, actions, reducers) {

    const handlers = Object.keys(reducers).map(type =>
        handleReducer(`${nameSpace}/${type}`, reducers[type])
    );

    const reducer = reduceReducers(...handlers);

    return (state = defaultState, action) => reducer(state, action);

}

/**
 * 获取 reducer
 * @param store
 * @param nameSpace
 * @param state
 * @param actions
 * @param reducers
 * @returns {function(*=, *=): *}
 */
function getReducer(store, nameSpace, state, actions, reducers) {
    return handleActions(store, nameSpace, state, actions, reducers || {});
}

/**
 * 注册 model
 * @param store
 * @param model
 */
export function registerModel(store, model) {

    if (!model?.nameSpace) {
        return;
    }

    const {nameSpace, state, actions, reducers} = model;

    store._asyncReducers[nameSpace] = getReducer(store, nameSpace, state, actions, reducers);
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
