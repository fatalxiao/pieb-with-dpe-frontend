/**
 * @file config.routes.js
 */

// Components
import ac from 'components/AsyncComponent';

export function configureRoutes(store) {
    return [{
        path: '/',
        component: ac(() => import(
            /* webpackChunkName: "AppRoot" */
            'containers/AppRoot'), store),
        routes: [{
            path: '/app',
            component: ac(() => import(
                /* webpackChunkName: "App" */
                'containers/app/App'), store),
            routes: [{
                path: '/app/dashboard',
                component: ac(() => import(
                    /* webpackChunkName: "Dashboard" */
                    'containers/app/modules/dashboard/Dashboard'), store)
            }, {
                path: '/app/patient-list',
                component: ac(() => import(
                    /* webpackChunkName: "PatientList" */
                    'containers/app/modules/patientList/PatientList'), store)
            }, {
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

export const DEFAULT_ROUTE = '/app/dashboard';
