/**
 * @file config.routes.js
 */

// Routes config
import configureRootRoutes from 'modules/Root/config.routes';
import configureAppRoutes from 'modules/App/config.routes';
import configurePatientListRoutes from 'modules/PatientList/config.routes';
import configurePatientEditorRoutes from 'modules/PatientEditor/config.routes';

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
