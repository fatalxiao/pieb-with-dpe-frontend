/**
 * @file config.route.js
 */

// Components
import {AsyncComponent} from 'vivy-async-component';

/**
 * 返回 routes 配置
 * @param store
 * @returns {*}
 */
export default function configureRoutes(store) {
    return {
        path: '/',
        component: AsyncComponent(() => import('./containers/Root'), store)
    };
}
