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
        path: '/app',
        component: ac(() => import('./containers/App'), store, [
            () => import('./models/epPlacementPoint'),
            () => import('./models/observalEndPoint'),
            () => import('./models/patientBaseInfo'),
            () => import('./models/patientGroup'),
            () => import('./models/patients'),
            () => import('./models/sensoryBlock')
        ])
    };
}
