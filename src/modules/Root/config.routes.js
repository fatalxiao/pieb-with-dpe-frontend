/**
 * @file config.routes.js
 */

// Components
import amc from 'components/AsyncModuleComponent';

/**
 * 返回 routes 配置
 * @param store
 * @returns {*}
 */
export default function configureRoutes(store) {
    return {
        path: '/',
        component: amc(store, () => import('./containers/Root'), [
            () => import('./reduxes/models/appNotifications'),
            () => import('./reduxes/models/appToasts'),
            () => import('./reduxes/models/fullScreen')
        ])
    };
}
