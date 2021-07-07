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
        path: '/app/patient-list',
        component: ac(() => import('modules/PatientList/containers/PatientList'), store)
    };
}
