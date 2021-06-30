/**
 * @file config.routes.js
 */

// Components
import amc from 'components/AsyncModuleComponent_old';

/**
 * 返回 routes 配置
 * @param store
 * @returns {*}
 */
export default function configureRoutes(store) {
    return {
        path: '/app',
        component: amc(store, () => import('./containers/App'), [{
            nameSpace: 'epPlacementPoint',
            getReducer: () => import('./reduxes/reducers/EpPlacementPointReducer')
        }, {
            nameSpace: 'observalEndPoint',
            getReducer: () => import('./reduxes/reducers/ObservalEndPointReducer')
        }, {
            nameSpace: 'patientGroup',
            getReducer: () => import('./reduxes/reducers/PatientGroupReducer')
        }, {
            nameSpace: 'patients',
            getReducer: () => import('./reduxes/reducers/PatientsReducer')
        }, {
            nameSpace: 'patientBaseInfo',
            getReducer: () => import('../App/reduxes/reducers/PatientBaseInfoReducer')
        }, {
            nameSpace: 'sensoryBlock',
            getReducer: () => import('./reduxes/reducers/SensoryBlockReducer')
        }])
    };
}
