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
        path: '/app/patient',
        component: amc(store, () => import('./containers/PatientEditor'), [{
            nameSpace: 'editPatient',
            getReducer: () => import('./reduxes/reducers/EditPatientReducer')
        }]),
        routes: [{
            path: '/app/patient/info/:id',
            component: amc(store, () => import('./containers/patientInfo/PatientInfo'), [{
                nameSpace: 'patientBaseInfo',
                getReducer: () => import('./reduxes/reducers/PatientBaseInfoReducer')
            }, {
                nameSpace: 'patientInfo',
                getReducer: () => import('./reduxes/reducers/PatientInfoReducer')
            }])
        }, {
            path: '/app/patient/analgesia/:patientId',
            component: amc(store, () => import('./containers/analgesia/AnalgesiaData'), [{
                nameSpace: 'analgesia',
                getReducer: () => import('./reduxes/reducers/AnalgesiaReducer')
            }])
        }, {
            path: '/app/patient/observal/:patientId',
            component: amc(store, () => import('./containers/observal/ObservalData'), [{
                nameSpace: 'observal',
                getReducer: () => import('./reduxes/reducers/ObservalReducer')
            }])
        }]
    };
}
