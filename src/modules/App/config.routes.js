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
        path: '/app',
        component: amc(() => import('./containers/App'), store, [
            () => import('./models/epPlacementPoint'),
            () => import('./models/observalEndPoint'),
            () => import('./models/patientBaseInfo'),
            () => import('./models/patientGroup'),
            () => import('./models/patients'),
            () => import('./models/sensoryBlock')
        ])
    };
}
