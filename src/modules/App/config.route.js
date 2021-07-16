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
        path: '/app',
        component: AsyncComponent(() => import('./containers/App'), store, [
            () => import('./models/epPlacementPoint'),
            () => import('./models/observalEndPoint'),
            () => import('./models/patientBaseInfo'),
            () => import('./models/patientGroup'),
            () => import('./models/patients'),
            () => import('./models/sensoryBlock')
        ])
    };
}
