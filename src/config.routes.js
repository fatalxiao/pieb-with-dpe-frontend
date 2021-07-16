/**
 * @file config.routes.js
 */

// Routes config
import configureRootRoutes from 'modules/Root/routes';
import configureAppRoutes from 'modules/App/routes';
import configurePatientListRoutes from 'modules/PatientList/routes';
import configurePatientEditorRoutes from 'modules/PatientEditor/routes';

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
