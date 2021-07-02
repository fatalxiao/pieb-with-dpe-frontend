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
 * 生成 Action
 * @param actionType
 * @param action
 * @returns {(function(*=, *=): (*))|*}
 */
// function handleAction(actionType, action) {
//     return (state, payload) => (dispatch, getState) => {
//
//         const {type, ...restPayload} = payload;
//
//         if (actionType === type) {
//             action(restPayload, state)(dispatch, getState);
//         }
//
//     };
// }

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

    const

        // actionHandlers = actions ?
        //     Object.keys(actions).map(type =>
        //         handleAction(`${nameSpace}/${type}`, actions[type])
        //     )
        //     :
        //     [],

        reducerHandlers = reducers ?
            Object.keys(reducers).map(type =>
                handleReducer(`${nameSpace}/${type}`, reducers[type])
            )
            :
            [],

        reducer = reduceReducers(...reducerHandlers);

    return (state = initialState, action) => {
        // setTimeout(() => {
        //     actionHandlers.forEach(actionHandler => actionHandler?.(state, action)(store.dispatch, store.getState));
        // }, 0);
        return reducer(state, action);
    };

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

    store.asyncActions[nameSpace] = actions;

    store.asyncReducers[nameSpace] = getReducer(store, nameSpace, state, reducers || {});
    store.replaceReducer(createRootReducer(store.history, store.asyncReducers));

}

export function createModelActionMiddleware() {
    return ({dispatch, getState}) => next => action => {
        return next(action);
    };
}

export default history => {

    const modelActionMiddleware = createModelActionMiddleware();

    return {
        ...createStore(
            createRootReducer(history),
            applyMiddleware(
                thunk,
                ComponentLoading,
                modelActionMiddleware,
                Api,
                routerMiddleware(history)
            )
        ),
        history,
        asyncActions: {},
        asyncReducers: {},
        registerAction: modelActionMiddleware.register
    };

};
