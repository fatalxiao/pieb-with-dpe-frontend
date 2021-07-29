/**
 * @file config.route.js
 */

// Routes config
import configureRootRoutes from 'modules/Root/config.route';
import configureAppRoutes from 'modules/App/config.route';
import configurePatientListRoutes from 'modules/PatientList/config.route';
import configurePatientEditorRoutes from 'modules/PatientEditor/config.route';

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

                // PatientList
                configurePatientListRoutes(store),

                // PatientEditor
                configurePatientEditorRoutes(store)

            ]
        }]

    }];
}

export const DEFAULT_ROUTE = '/app/patient-list';
