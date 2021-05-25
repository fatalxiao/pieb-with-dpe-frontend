/**
 * @file ComponentLoadingMiddleware.js
 */

import * as actionTypes from 'reduxes/actionTypes';

const DURATION = 1000;
let timeoutId = null;

export default ({dispatch, getState}) => next => action => {

    if (!action) {
        return next(action);
    }

    const state = getState();

    if (!state?.loadComponent) {
        return next(action);
    }

    const {loading} = state.loadComponent;

    // loading start
    if (action.type === actionTypes.LOAD_COMPONENT_START) {

        // 如果有 complete 的 timeout，清除 timeout
        timeoutId && clearTimeout(timeoutId);

        // 只有非 loading 时 dispatch start 的 action
        if (!loading) {
            next(action);
        }

    }

    // loading complete
    else if (action.type === actionTypes.LOAD_COMPONENT_COMPLETE) {

        // 清除之前 complete 的 timeout
        timeoutId && clearTimeout(timeoutId);

        // 重新设定新的 timeout
        timeoutId = setTimeout(() => {

            // 成功执行 complete 的 action 之前，先清除 timeout
            timeoutId && clearTimeout(timeoutId);

            // 执行 complete 的 action
            next(action);

        }, DURATION);

    }

    // other actions
    else {
        return next(action);
    }

};
