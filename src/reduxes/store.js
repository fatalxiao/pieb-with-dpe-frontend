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
    store.asyncReducers[nameSpace] = asyncReducer;
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));
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
 * @param initialState
 * @param reducers
 * @returns {function(*=, *=): *}
 */
function getReducer(store, nameSpace, initialState, reducers) {

    const reducerHandlers = reducers ?
        Object.keys(reducers).map(type =>
            handleReducer(`${nameSpace}/${type}`, reducers[type])
        )
        :
        [],

        reducer = reduceReducers(...reducerHandlers);

    return (state = initialState, action) => reducer(state, action);

}

/**
 * 创建 ModelActionMiddleware
 * @returns {function({dispatch?: *, getState?: *}): function(*): function(*=): *}
 */
export function createModelActionMiddleware() {

    // 异步 actions
    const asyncActions = {};

    /**
     * ModelActionMiddleware
     * @param dispatch
     * @param getState
     * @returns {function(*): function(*=): *}
     * @constructor
     */
    function ModelActionMiddleware({dispatch, getState}) {
        return next => action => {

            // 调用 asyncActions 匹配的 action
            if (asyncActions?.hasOwnProperty(action?.type)) {
                asyncActions[action.type]?.(action)?.(dispatch, getState);
            }

            return next(action);

        };
    }

    /**
     * 暴露出去的 register 方法，用于注册异步 actions
     * @param nameSpace
     * @param actions
     */
    ModelActionMiddleware.register = function (nameSpace, actions) {
        Object.keys(actions).forEach(type =>
            asyncActions[`${nameSpace}/${type}`] = actions[type]
        );
    };

    return ModelActionMiddleware;

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

    if (store.asyncReducers.hasOwnProperty(nameSpace)) {
        console.error(`nameSpace: ${nameSpace} has been registered.`);
    }

    // 注册 reducers
    store.asyncReducers[nameSpace] = getReducer(store, nameSpace, state, reducers || {});
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));

    // 注册 actions
    if (actions) {
        store.registerActions(nameSpace, actions || {});
    }

}

export default history => {

    // 用于加载和调用异步 actions 的 ModelActionMiddleware
    const ModelActionMiddleware = createModelActionMiddleware();

    return {

        // 创建的默认 store
        ...createStore(
            createRootReducer(history),
            applyMiddleware(
                thunk,
                ComponentLoading,
                ModelActionMiddleware,
                Api,
                routerMiddleware(history)
            )
        ),

        // history 实例
        history,

        // 异步的 reducers
        asyncReducers: {},

        // 暴露给 store 的注册异步 actions 的方法
        registerActions: ModelActionMiddleware.register

    };

};
