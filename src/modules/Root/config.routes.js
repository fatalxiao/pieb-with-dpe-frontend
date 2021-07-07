/**
 * @file config.routes.js
 */

// Components
import ac from 'components/AsyncComponent';

/**
 * 返回 routes 配置
 * @param store
 * @returns {*}
 */
export default function configureRoutes(store) {
    return {
        path: '/',
        component: ac(() => import('./containers/Root'), store)
    };
}
