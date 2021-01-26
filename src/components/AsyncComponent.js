/**
 * @file AsyncComponent.js
 */

import React, {useState, useCallback, useEffect} from 'react';

import * as actionTypes from 'reduxes/actionTypes';

export default (getComponent, store) => props => {

    const

        /**
         * 用于最终渲染用的 React Component
         */
        [Component, setComponent] = useState(null),

        /**
         * 开始加载组件
         * @type {function(): number}
         */
        startLoadComponent = useCallback(() => setTimeout(() => store.dispatch({
            type: actionTypes.LOAD_COMPONENT_START
        }), 0), [store]),

        /**
         * 加载组件完毕
         * @type {function(): number}
         */
        finishLoadComponent = useCallback(() => setTimeout(() => store.dispatch({
            type: actionTypes.LOAD_COMPONENT_COMPLETE
        }), 0), [store]),

        /**
         * 加载组件
         * @type {Function}
         */
        loadComponent = useCallback(async callback => {

            // 如果在开发环境中如果使用异步加载，每次热更新后，所有异步加载的组件会重新加载，严重影响性能
            // 所以在开发环境中使用 babel-plugin-transform-import-sync 同步加载组件
            // 在这里有别于其他环境，调用 getComponent 后会直接得到 Component
            if (process.env.NODE_ENV === 'development') {
                setComponent(getComponent());
                callback?.();
                return;
            }

            // 非开发环境中组件加载是异步的，所以调用 getComponent 后会得到 Promise 实例
            const component = await getComponent?.();
            setComponent(component?.default || component);
            callback?.();

        }, [getComponent]);

    /**
     * 如果 Component 为空的时候，加载 component
     */
    useEffect(() => {
        if (!Component) {
            startLoadComponent();
            loadComponent(finishLoadComponent);
        }
    }, [
        Component,
        startLoadComponent, loadComponent, finishLoadComponent
    ]);

    return Component ?
        <Component {...props}/>
        :
        null;

};
