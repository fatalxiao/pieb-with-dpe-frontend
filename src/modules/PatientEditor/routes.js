/**
 * @file routes.js
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
        path: '/app/patient',
        component: AsyncComponent(() => import('./containers/PatientEditor'), store, [
            () => import('./models/editPatient'),
            () => import('./models/patientInfo')
        ]),
        routes: [{
            path: '/app/patient/info/:id',
            component: AsyncComponent(() => import('./containers/patientInfo/PatientInfo'), store)
        }, {
            path: '/app/patient/analgesia/:patientId',
            component: AsyncComponent(() => import('./containers/analgesia/AnalgesiaData'), store, [
                () => import('./models/analgesia')
            ])
        }, {
            path: '/app/patient/observal/:patientId',
            component: AsyncComponent(() => import('./containers/observal/ObservalData'), store, [
                () => import('./models/observal')
            ])
        }]
    };
}
