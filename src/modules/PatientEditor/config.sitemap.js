/**
 * @file config.sitemap.js
 */

/**
 * Patient Editor sitemap
 * @returns {{route: string, name: string}}
 */
export default function () {
    return {
        name: 'Patient',
        route: '/app/patient',
        children: [{
            name: 'Patient Information',
            route: '/app/patient/info'
        }, {
            name: 'Analgesia Data',
            route: '/app/patient/analgesia'
        }, {
            name: 'Observal Data',
            route: '/app/patient/observal'
        }]
    };
}
