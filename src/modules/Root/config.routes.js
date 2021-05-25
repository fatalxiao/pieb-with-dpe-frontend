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
        component: amc(
            store,
            () => import('modules/Root/containers/Root'),
            [{
                nameSpace: 'fullScreen',
                getReducer: () => import('./reduxes/reducers/FullScreenReducer')
            }, {
                nameSpace: 'loadComponent',
                getReducer: () => import('./reduxes/reducers/LoadComponentReducer')
            }, {
                nameSpace: 'appNotifier',
                getReducer: () => import('./reduxes/reducers/NotifierReducer')
            }, {
                nameSpace: 'appToaster',
                getReducer: () => import('./reduxes/reducers/ToasterReducer')
            }]
        )
    };
}
