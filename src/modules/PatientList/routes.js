/**
 * @file config.routes.js
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
        path: '/app/patient-list',
        component: AsyncComponent(() => import('modules/PatientList/containers/PatientList'), store)
    };
}
