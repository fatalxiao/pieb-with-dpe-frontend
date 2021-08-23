/**
 * @file ObservalEndPointApi.js
 */

// Statics
import {appBaseUrl} from 'src/config.urlPrefix';

// Vendors
import Api from 'vendors/api/Api';

/**
 * 获取所有的 Observal End Point
 * @param options
 * @returns {*}
 */
export function getObservalEndPoints(options) {
    return Api.get({
        ...options,
        url: `${appBaseUrl}/observalEndPoint/getObservalEndPoints`
    });
}
