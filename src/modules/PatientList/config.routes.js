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
        path: '/app/patient-list',
        component: amc(
            store,
            () => import('modules/PatientList/containers/PatientList')
        )
    };
}