/**
 * @file config.routes.js
 */

// Components
import ac from 'components/AsyncComponent';

// Routes config
import configureRootRoutes from 'modules/Root/config.routes';
import configureAppRoutes from 'modules/App/config.routes';
import configurePatientListRoutes from 'modules/PatientList/config.routes';

/**
 * 返回 routes 配置
 * @param store
 * @returns {*}
 */
export function configureRoutes(store) {
    return [{

        // Root
        ...configureRootRoutes(store),
        routes: [{

            // App
            ...configureAppRoutes(store),
            routes: [

                configurePatientListRoutes(store),
                {
                    path: '/app/patient',
                    component: ac(() => import(
                        /* webpackChunkName: "EditPatient" */
                        'containers/app/modules/editPatient/EditPatient'), store),
                    routes: [{
                        path: '/app/patient/info/:id',
                        component: ac(() => import(
                            /* webpackChunkName: "PatientInfo" */
                            'containers/app/modules/editPatient/patientInfo/PatientInfo'), store)
                    }, {
                        path: '/app/patient/analgesia/:patientId',
                        component: ac(() => import(
                            /* webpackChunkName: "AnalgesiaData" */
                            'containers/app/modules/editPatient/analgesia/AnalgesiaData'), store)
                    }, {
                        path: '/app/patient/observal/:patientId',
                        component: ac(() => import(
                            /* webpackChunkName: "ObservalData" */
                            'containers/app/modules/editPatient/observal/ObservalData'), store)
                    }]
                }]
        }]
    }];
}

export const DEFAULT_ROUTE = '/app/patient-list';
