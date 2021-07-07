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
        path: '/app/patient',
        component: ac(() => import('./containers/PatientEditor'), store, [
            () => import('./models/editPatient'),
            () => import('./models/patientInfo')
        ]),
        routes: [{
            path: '/app/patient/info/:id',
            component: ac(() => import('./containers/patientInfo/PatientInfo'), store)
        }, {
            path: '/app/patient/analgesia/:patientId',
            component: ac(() => import('./containers/analgesia/AnalgesiaData'), store, [
                () => import('./models/analgesia')
            ])
        }, {
            path: '/app/patient/observal/:patientId',
            component: ac(() => import('./containers/observal/ObservalData'), store, [
                () => import('./models/observal')
            ])
        }]
    };
}
